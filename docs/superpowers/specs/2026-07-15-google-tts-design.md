# Google Cloud TTS 도입 설계

날짜: 2026-07-15
대상: `web/app.js`, `web/index.html`

## 배경

앱이 운전 중 영어회화 연습용으로 쓰이는데, 현재 한국어/영어 음성 모두 브라우저 내장 Web Speech API(`speechSynthesis`)를 쓰고 있어 특히 한국어 음성이 로봇처럼 부자연스럽다. 안드로이드 크롬은 고품질 네트워크 음성을 이 API에 노출하지 않아 코드로 해결이 불가능하다는 게 이전 세션에서 이미 확인됐다(`docs/superpowers/specs/2026-07-11-nav-tts-ui-improvements-design.md` 참고, 당시엔 "네트워크 음성 우선 선택 + 수동 선택 UI"로 임시 대응했음).

이번엔 Google Cloud Text-to-Speech(Chirp3-HD 음성)를 별도 API로 붙여서 훨씬 자연스러운 음성을 쓰기로 함.

명확화 결과:
- 적용 범위: 한국어 + 영어 둘 다 (원래 문제는 한국어였지만 일관성을 위해 확대)
- 보안: 지금은 API 키 노출을 감수 (기존 Claude/Gemini 키와 동일한 트레이드오프). 백엔드 프록시(Cloudflare Workers 등)는 만들지 않음. 대신 GCP 콘솔에서 키를 Text-to-Speech API로만 제한 + 예산 알림 설정으로 완화.
- 응답 속도(Gemini thinking 관련) 개선은 이번 범위에서 제외 — TTS에만 집중.

## 1. 아키텍처

`web/app.js`의 `speak(text, lang)`을 dispatcher로 재구성한다:
- 기존 구현은 이름만 `speakBrowser(text, lang)`로 바꿔서 그대로 유지 (동작 변경 없음).
- 신규 `speakGoogle(text, lang)`이 Google Cloud TTS REST API(`https://texttospeech.googleapis.com/v1/text:synthesize?key=...`)를 호출 — 기존 `callGemini`의 `?key=` 쿼리 파라미터 패턴을 그대로 재사용.
- `LS.ttsEngine`이 `"google"`이고 키가 설정되어 있을 때만 `speakGoogle`을 먼저 시도하고, **어떤 이유로든 실패하면(네트워크 오류, 잘못된 키, HTTP 오류, 재생 오류) 자동으로 `speakBrowser`로 대체**한다. 운전 중 무음이 되는 걸 막기 위한 안전장치이며, 기존 `speak()`의 "절대 throw하지 않고 항상 resolve" 계약을 그대로 유지한다.
- 기존 호출부 13곳(`runPatternTask`, `runSituationTask`, `shadow`, `runDay` 등)은 전혀 수정하지 않는다.
- `web/sw.js`는 이미 동일 출처 요청만 가로채므로(`if (url.origin !== location.origin) return;`) 수정 불필요.

## 2. 재생 방식 및 컨트롤 연동

Google TTS 응답(`audioContent`, base64 MP3)은 `new Audio("data:audio/mp3;base64,...")`로 재생한다. 학습 중 "건너뛰기"/"이전"/"일시정지"/"종료" 버튼을 누르면 지금 재생 중인(또는 다운로드 중인) Google 음성도 함께 멈춰야 한다 — 다운로드가 아직 끝나지 않은 요청은 `AbortController`로 취소하고, 이미 재생 중인 오디오는 `pause()`한다. 의도적인 중단은 실패로 취급하지 않고(폴백 트리거 안 함) 정상 resolve로 처리한다.

## 3. 설정 화면

- "TTS 음성 소스" 선택: 브라우저 내장(기본값, 무료) / Google Cloud TTS
- Google API 키 입력칸 (기존 Claude/Gemini 키 입력과 동일한 password 타입)
- Google 선택 시에만 보이는 한국어/영어 음성 선택 드롭다운 — Chirp3-HD 공유 음성 8종(Aoede, Charon, Fenrir, Kore, Leda, Orus, Puck, Zephyr) 하드코딩 목록, 각각 "미리듣기" 버튼
- 미리듣기 버튼은 실패 시 브라우저 음성으로 조용히 대체하지 않고 `alert()`로 오류를 보여준다 — 이 버튼의 목적 자체가 "설정이 제대로 됐는지 확인"이라 조용한 대체는 오히려 혼란을 줌.

## 4. 비용 및 설정 난이도

- Chirp3-HD 기준 매달 100만 자까지 무료, 이후 100만 자당 $30. 이 앱의 실제 사용량(하루 20~30개 짧은 문장)은 한 달에 5~9만 자 수준으로 무료 한도의 10분의 1도 안 됨.
- 단, Gemini API 키(구글 AI 스튜디오, 결제 정보 불필요)와 달리 Google Cloud Text-to-Speech API는 **결제 계정이 연결된 GCP 프로젝트에서만 활성화 가능**(신용카드 등록 필요, 무료 한도 내에서는 과금 안 됨). 이전 기능들보다 초기 설정이 조금 더 필요함 — 마지막 태스크에서 단계별로 안내.

## 범위 밖

- 백엔드 프록시로 API 키 숨기기
- LLM(Gemini) 응답 속도 개선(thinking budget, 스트리밍)
- Google TTS 문자 사용량 제한/과금 방지 코드 (무료 한도 대비 실사용량이 충분히 적어서 불필요 판단)
- 여러 기기/사용자 지원 (기존과 동일하게 단일 사용자 기준)

## 검증 계획

- 저장소 필드/음성 목록/요청 바디 생성은 순수 함수 단위 테스트로 자동 검증
- `speak()` dispatcher의 폴백 로직은 `fetch`를 모킹해 헤드리스로 검증 (실패 시 브라우저 음성 호출 확인, 성공 경로는 실제 키 없이는 불가)
- 설정 화면 UI(요소 존재, 엔진 전환 시 필드 표시/숨김)는 헤드리스 검증
- 실제 Google API 키를 이용한 실제 음성 재생, 미리듣기, 학습 중 정지 버튼과의 연동은 마지막 태스크에서 사용자가 직접 실사용 검증
