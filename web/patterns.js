const PATTERNS = [
    {
        "num": 1,
        "examples_ko": [
            "저녁 먹으러 놀러 올래?",
            "오늘 밤에 친구 몇 명이 놀러 올 거야.",
            "갑자기 연락했는데도 와 줘서 고마워."
        ],
        "usage_ko": "come over는 집에 초대할 때 써요.",
        "title": "Come over (놀러 오다).",
        "examples": [
            "Do you want to come over for dinner?",
            "A few friends are coming over tonight.",
            "Thanks for coming over on such short notice."
        ]
    },
    {
        "num": 2,
        "examples_ko": [
            "다음 주로 예약을 잡고 싶습니다.",
            "엘리베이터에서 떨어진 방으로 부탁드립니다.",
            "이걸 다른 사이즈로 교환하고 싶습니다."
        ],
        "usage_ko": "I'd like는 원하는 일을 공손히 말해요.",
        "title": "I'd like + 명사 / to + 동사원형",
        "examples": [
            "I'd like to make an appointment for next week.",
            "I'd like a room away from the elevator.",
            "I'd like to exchange this for a different size."
        ]
    },
    {
        "num": 3,
        "examples_ko": [
            "나 지금 출발해. 20분 뒤에 도착할 거야.",
            "비가 오기 전에 출발하자.",
            "내일 몇 시에 출발할 거야?"
        ],
        "usage_ko": "head out은 출발하며 자리를 뜰 때 써요.",
        "title": "Head out (출발하다 / 나가다).",
        "examples": [
            "I'm heading out now—I'll be there in twenty minutes.",
            "Let's head out before it starts raining.",
            "What time are you heading out tomorrow?"
        ]
    },
    {
        "num": 4,
        "examples_ko": [
            "온라인으로 제 예약을 변경할 방법이 있나요?",
            "택시를 타지 않고 공항에 갈 방법이 있나요?",
            "앱에서 비밀번호를 재설정할 방법이 있나요?"
        ],
        "usage_ko": "a way는 가능한 방법을 물을 때 써요.",
        "title": "Is there a way to + 동사원형?",
        "examples": [
            "Is there a way to change my appointment online?",
            "Is there a way to get to the airport without taking a taxi?",
            "Is there a way to reset my password from the app?"
        ]
    },
    {
        "num": 5,
        "examples_ko": [
            "집주인이 여전히 우리 요청을 검토 중이라는 느낌이 들어.",
            "이 줄이 줄어들지 않는다는 느낌이 들어.",
            "그녀는 전화보다 문자를 더 좋아한다는 느낌이 들어."
        ],
        "usage_ko": "get the feeling은 느낌에 따른 추측이에요.",
        "title": "I get the feeling (that) + 문장.",
        "examples": [
            "I get the feeling that the landlord is still considering our request.",
            "I get the feeling that this line is not moving.",
            "I get the feeling that she prefers to text rather than call."
        ]
    },
    {
        "num": 6,
        "examples_ko": [
            "집에 가는 길에 가게에 잠깐 들를게.",
            "언제든 부담 없이 잠깐 들러.",
            "그녀는 서류 몇 개를 전해 주러 잠깐 들렀어."
        ],
        "usage_ko": "stop by는 가는 길에 잠깐 들를 때 써요.",
        "title": "Stop by (잠깐 들르다).",
        "examples": [
            "I'll stop by the store on my way home.",
            "Feel free to stop by anytime.",
            "She stopped by to drop off some documents."
        ]
    },
    {
        "num": 7,
        "examples_ko": [
            "나는 일요일에 장을 보는 편이야.",
            "나는 차를 오래 타면 멀미를 하는 편이야.",
            "나는 주말에도 일찍 일어나는 편이야."
        ],
        "usage_ko": "tend to는 평소 반복되는 습관을 말해요.",
        "title": "I tend to + 동사원형.",
        "examples": [
            "I tend to do my grocery shopping on Sundays.",
            "I tend to get carsick on long rides.",
            "I tend to wake up early even on weekends."
        ]
    },
    {
        "num": 8,
        "examples_ko": [
            "이번 주말에 같이 시간 보낼래?",
            "우리는 보통 수업이 끝나면 같이 어울려.",
            "그냥 사촌이랑 시간을 보내고 있었어."
        ],
        "usage_ko": "hang out은 함께 편하게 시간을 보내요.",
        "title": "Hang out (함께 어울리다).",
        "examples": [
            "Do you want to hang out this weekend?",
            "We usually hang out after class.",
            "I was just hanging out with my cousin."
        ]
    },
    {
        "num": 9,
        "examples_ko": [
            "전채 요리로 무엇을 추천하시나요?",
            "후식으로 무엇을 추천하시나요?",
            "채식하는 사람에게 무엇을 추천하시나요?"
        ],
        "usage_ko": "recommend는 좋은 선택을 추천받을 때 써요.",
        "title": "What do you recommend for + 명사?",
        "examples": [
            "What do you recommend for a starter?",
            "What do you recommend for dessert?",
            "What do you recommend for a vegetarian?"
        ]
    },
    {
        "num": 10,
        "examples_ko": [
            "오늘 저녁 먹으러 나갈래?",
            "이런 날씨에는 밖에 나가고 싶지 않아.",
            "너희 둘 사귀고 있어?"
        ],
        "usage_ko": "go out은 식사하러 밖에 나갈 때 써요.",
        "title": "Go out (외출하다 / 데이트하다).",
        "examples": [
            "Do you want to go out for dinner tonight?",
            "I don't feel like going out in this weather.",
            "Are you two going out?"
        ]
    },
    {
        "num": 11,
        "examples_ko": [
            "마침 여분의 휴대폰 충전기가 있어.",
            "마침 근처에 괜찮은 치과 의사를 알아.",
            "마침 오늘 오후에 시내에 갈 예정이야."
        ],
        "usage_ko": "happen to는 우연히 그런 상태일 때 써요.",
        "title": "I happen to + 동사원형.",
        "examples": [
            "I happen to have an extra phone charger.",
            "I happen to know a good dentist nearby.",
            "I happen to be going downtown this afternoon."
        ]
    },
    {
        "num": 12,
        "examples_ko": [
            "우리는 외식을 그리 자주 하지는 않아.",
            "오늘 저녁은 요리하지 말고 외식하자.",
            "이 근처에서는 보통 어디서 외식해?"
        ],
        "usage_ko": "eat out은 집 밖에서 사 먹는다는 뜻이에요.",
        "title": "Eat out (외식하다).",
        "examples": [
            "We don't eat out very often.",
            "Let's eat out tonight instead of cooking.",
            "Where do you usually eat out around here?"
        ]
    },
    {
        "num": 13,
        "examples_ko": [
            "오늘 저녁 식사에는 참석할 수 없어.",
            "기차가 연착해서 6시까지 도착할 수 없어.",
            "예약 시간에 갈 수 없어서 일정을 다시 잡아야 해."
        ],
        "usage_ko": "make it은 약속에 참석할 수 있단 뜻이에요.",
        "title": "I can't make it + 시간 / 행사.",
        "examples": [
            "I can't make it to dinner tonight.",
            "I can't make it by six because my train is delayed.",
            "I can't make it to the appointment, so I need to reschedule."
        ]
    },
    {
        "num": 14,
        "examples_ko": [
            "또 하루 일을 빠질 여유가 없어.",
            "지금은 휴대폰을 새것으로 바꿀 경제적 여유가 없어.",
            "수리를 훨씬 더 오래 기다릴 여유는 없어."
        ],
        "usage_ko": "afford는 감당할 여유를 말해요.",
        "title": "I can't afford to + 동사원형.",
        "examples": [
            "I can't afford to miss another day of work.",
            "I can't afford to replace my phone right now.",
            "I can't afford to wait much longer for the repair."
        ]
    },
    {
        "num": 15,
        "examples_ko": [
            "역으로 나를 데리러 와 줄 수 있어?",
            "집에 오는 길에 우유를 좀 사 올게.",
            "그녀는 직장에서 영어를 빨리 익혔어."
        ],
        "usage_ko": "pick up은 차로 데리러 갈 때 써요.",
        "title": "Pick up (태우러 가다 / 사 오다 / 익히다).",
        "examples": [
            "Can you pick me up from the station?",
            "I'll pick up some milk on the way home.",
            "She picked up English quickly at work."
        ]
    },
    {
        "num": 16,
        "examples_ko": [
            "이런 날씨에 버스가 제시간에 올 거라고 기대하진 않겠어.",
            "경기장 근처에 주차할 곳이 있을 거라고 기대하진 않겠어.",
            "소포가 오늘 도착할 거라고 기대하진 않겠어."
        ],
        "usage_ko": "count on은 믿고 기대한다는 뜻이에요.",
        "title": "I wouldn't count on + 명사 / -ing.",
        "examples": [
            "I wouldn't count on the bus being on time in this weather.",
            "I wouldn't count on finding parking near the stadium.",
            "I wouldn't count on the package arriving today."
        ]
    },
    {
        "num": 17,
        "examples_ko": [
            "입구 근처에 나를 내려 줄 수 있어?",
            "점심 먹고 소포를 맡기고 올게.",
            "네 집에 내 열쇠를 갖다 놓고 갈게."
        ],
        "usage_ko": "drop off는 차에서 내려 줄 때 써요.",
        "title": "Drop off (내려주다 / 잠깐 두고 가다).",
        "examples": [
            "Can you drop me off near the entrance?",
            "I'll drop the package off after lunch.",
            "I'll drop my keys off at your place."
        ]
    },
    {
        "num": 18,
        "examples_ko": [
            "이 요리에 대해 좀 더 자세히 알려 주시겠어요?",
            "특별 메뉴에 대해 좀 더 자세히 알려 주시겠어요?",
            "재료에 대해 좀 더 자세히 알려 주시겠어요?"
        ],
        "usage_ko": "more about은 더 자세한 설명을 요청해요.",
        "title": "Could you tell me more about + 명사?",
        "examples": [
            "Could you tell me more about this dish?",
            "Could you tell me more about the specials?",
            "Could you tell me more about the ingredients?"
        ]
    },
    {
        "num": 19,
        "examples_ko": [
            "그는 저녁 식사에 나타나지 않았어.",
            "도와주려고 일찍 와 줘서 고마워.",
            "소포가 오늘 도착했으면 좋겠어."
        ],
        "usage_ko": "show up은 약속 장소에 나타날 때 써요.",
        "title": "Show up (나타나다 / 참석하다).",
        "examples": [
            "He didn't show up for dinner.",
            "Thanks for showing up early to help.",
            "I hope the package shows up today."
        ]
    },
    {
        "num": 20,
        "examples_ko": [
            "여기서 공항까지 가는 데 얼마나 걸리나요?",
            "재발급 카드를 받는 데 얼마나 걸리나요?",
            "신청을 처리하는 데 얼마나 걸리나요?"
        ],
        "usage_ko": "how long은 걸리는 시간을 물을 때 써요.",
        "title": "How long does it take to + 동사원형?",
        "examples": [
            "How long does it take to get to the airport from here?",
            "How long does it take to get a replacement card?",
            "How long does it take to process the application?"
        ]
    },
    {
        "num": 21,
        "examples_ko": [
            "가기 전에 미리 전화해 볼 만해.",
            "여행이 길다면 여행자 보험에 가입할 만한 가치가 있어.",
            "그 식당은 적어도 한 번은 가 볼 만해."
        ],
        "usage_ko": "worth는 해 볼 가치가 있다는 뜻이에요.",
        "title": "It's worth + -ing.",
        "examples": [
            "It's worth calling ahead before you go.",
            "It's worth getting travel insurance for a longer trip.",
            "That restaurant is worth trying at least once."
        ]
    },
    {
        "num": 22,
        "examples_ko": [
            "할인을 요청해 봐서 나쁠 건 없어.",
            "영수증 사본을 보관해 둬서 나쁠 건 없어.",
            "조금 일찍 도착해서 나쁠 건 없어."
        ],
        "usage_ko": "doesn't hurt는 해 봐도 손해 없단 뜻이에요.",
        "title": "It doesn't hurt to + 동사원형.",
        "examples": [
            "It doesn't hurt to ask for a discount.",
            "It doesn't hurt to keep a copy of the receipt.",
            "It doesn't hurt to arrive a little early."
        ]
    },
    {
        "num": 23,
        "examples_ko": [
            "어젯밤에 몇 시에 돌아왔어?",
            "일요일에 여행에서 돌아올 거야.",
            "드디어 내 돈을 돌려받았어."
        ],
        "usage_ko": "get back은 갔다가 돌아올 때 써요.",
        "title": "Get back (돌아오다 / 되돌려받다).",
        "examples": [
            "What time did you get back last night?",
            "I'll get back from my trip on Sunday.",
            "I finally got my money back."
        ]
    },
    {
        "num": 24,
        "examples_ko": [
            "오늘 소포를 받기로 되어 있었는데 끝내 오지 않았어.",
            "2시에 매니저를 만나기로 되어 있었는데 회의가 취소됐어.",
            "확인 이메일을 받기로 되어 있었는데 아직 받지 못했어."
        ],
        "usage_ko": "supposed to는 어긋난 예정을 말할 때 써요.",
        "title": "I was supposed to + 동사원형, but + 문장.",
        "examples": [
            "I was supposed to receive the package today, but it never arrived.",
            "I was supposed to meet my manager at two, but the meeting was canceled.",
            "I was supposed to get a confirmation email, but I haven't received one."
        ]
    },
    {
        "num": 25,
        "examples_ko": [
            "저는 견과류 알레르기가 있어요.",
            "저는 해산물 알레르기가 있어요.",
            "저는 유제품 알레르기가 있어요."
        ],
        "usage_ko": "allergic to는 알레르기 대상을 말해요.",
        "title": "I'm allergic to + 명사",
        "examples": [
            "I'm allergic to nuts.",
            "I'm allergic to seafood.",
            "I'm allergic to dairy."
        ]
    },
    {
        "num": 26,
        "examples_ko": [
            "잠깐만, 열쇠를 챙겨야 해.",
            "잠깐만 기다려 줄 수 있어?",
            "잠깐만, 나 답을 아는 것 같아."
        ],
        "usage_ko": "hold on은 잠시 기다려 달라고 말해요.",
        "title": "Hold on (잠깐 기다리다).",
        "examples": [
            "Hold on—I need to grab my keys.",
            "Can you hold on for just a second?",
            "Hold on, I think I know the answer."
        ]
    },
    {
        "num": 27,
        "examples_ko": [
            "그 수리 비용은 보장된다고 들었어요.",
            "예약 방문 때 신분증을 가져오라는 안내를 받았어요.",
            "사무실이 4시에 문을 닫는다고 들었어요."
        ],
        "usage_ko": "was told는 다른 사람에게 들은 말이에요.",
        "title": "I was told (that) + 문장.",
        "examples": [
            "I was told that the repair would be covered.",
            "I was told to bring my ID to the appointment.",
            "I was told that the office closes at four."
        ]
    },
    {
        "num": 28,
        "examples_ko": [
            "나 없이 먼저 시작해.",
            "뭐 하나 물어봐도 돼? — 응, 물어봐.",
            "준비됐으면 먼저 주문해."
        ],
        "usage_ko": "go ahead는 먼저 시작해도 된다는 말이에요.",
        "title": "Go ahead (계속하다 / 먼저 하다).",
        "examples": [
            "Go ahead and start without me.",
            "Can I ask you something? — Go ahead.",
            "If you're ready, go ahead and order."
        ]
    },
    {
        "num": 29,
        "examples_ko": [
            "그러니까 아침 식사가 포함되어 있다는 거죠?",
            "그러니까 미리 예약해야 한다는 거죠?",
            "그러니까 10시 이후에는 건물이 잠겨 있다는 거죠?"
        ],
        "usage_ko": "take it은 추측한 내용이 맞는지 확인해요.",
        "title": "I take it (that) + 문장?",
        "examples": [
            "I take it that breakfast is included?",
            "I take it that I need to book in advance?",
            "I take it that the building is locked after ten?"
        ]
    },
    {
        "num": 30,
        "examples_ko": [
            "체크인하려고 하는데 무인 기기가 제 여권을 읽지 못해요.",
            "어느 버스가 병원에 가는지 알아보려고 하고 있어요.",
            "자동 납부를 설정하려고 하고 있어요."
        ],
        "usage_ko": "trying to는 하려고 시도 중이라는 뜻이에요.",
        "title": "I'm trying to + 동사원형",
        "examples": [
            "I'm trying to check in, but the kiosk isn't reading my passport.",
            "I'm trying to find out which bus goes to the hospital.",
            "I'm trying to set up automatic payments."
        ]
    },
    {
        "num": 31,
        "examples_ko": [
            "조금 천천히 걸어 줘. 따라갈 수가 없어.",
            "이 모든 변화를 따라가기가 어려워.",
            "지금처럼 계속 잘해 줘."
        ],
        "usage_ko": "keep up은 상대 속도를 따라갈 때 써요.",
        "title": "Keep up (따라가다 / 계속 유지하다).",
        "examples": [
            "Walk a little slower—I can't keep up.",
            "It's hard to keep up with all the changes.",
            "Keep up the good work."
        ]
    },
    {
        "num": 32,
        "examples_ko": [
            "제가 말하려던 뜻과는 조금 달라요. 하루만 필요해요.",
            "제가 말하려던 뜻과는 조금 달라요. 수수료를 여쭤본 거였어요.",
            "제가 말하려던 뜻과는 조금 달라요. 다시 설명해도 될까요?"
        ],
        "usage_ko": "meant는 내가 전하려던 뜻을 가리켜요.",
        "title": "That's not quite what I meant.",
        "examples": [
            "That's not quite what I meant—I only need it for one day.",
            "That's not quite what I meant. I was asking about the fee.",
            "That's not quite what I meant. Could I explain again?"
        ]
    },
    {
        "num": 33,
        "examples_ko": [
            "이 요리를 덜 맵게 해 주실 수 있나요?",
            "이 요리를 아주 맵게 해 주실 수 있나요?",
            "이 요리를 채식 요리로 만들어 주실 수 있나요?"
        ],
        "usage_ko": "less spicy는 덜 맵게 해 달란 뜻이에요.",
        "title": "Can you make this dish + 형용사?",
        "examples": [
            "Can you make this dish less spicy?",
            "Can you make this dish extra hot?",
            "Can you make this dish vegetarian?"
        ]
    },
    {
        "num": 34,
        "examples_ko": [
            "시내에서 옛 친구를 우연히 만났어.",
            "결제 과정에서 문제가 생겼어.",
            "거기 가는 길에 교통 체증을 만날 수도 있어."
        ],
        "usage_ko": "run into는 뜻밖에 마주쳤을 때 써요.",
        "title": "Run into + 사람/문제 (우연히 마주치다 / 문제에 부딪히다).",
        "examples": [
            "I ran into an old friend downtown.",
            "We ran into a problem with the payment.",
            "You might run into traffic on the way there."
        ]
    },
    {
        "num": 35,
        "examples_ko": [
            "예약이 제 이름으로 되어 있는지 확실히 확인하고 싶어요.",
            "제가 취소 규정을 제대로 이해했는지 확인하고 싶어요.",
            "이 주소가 정확한 배송지인지 확인하고 싶어요."
        ],
        "usage_ko": "make sure는 틀림없는지 확인할 때 써요.",
        "title": "I want to make sure (that) + 문장",
        "examples": [
            "I want to make sure the reservation is under my name.",
            "I want to make sure I understand the cancellation policy.",
            "I want to make sure this is the correct address for delivery."
        ]
    },
    {
        "num": 36,
        "examples_ko": [
            "그 문제가 완전히 해결됐다는 확신은 들지 않아.",
            "이게 우리에게 최선의 선택이라는 확신은 들지 않아.",
            "견적에 모든 수수료가 포함됐다는 확신은 들지 않아."
        ],
        "usage_ko": "convinced는 확신이 있는지를 나타내요.",
        "title": "I'm not convinced (that) + 문장.",
        "examples": [
            "I'm not convinced that the problem is completely fixed.",
            "I'm not convinced that this is the best option for us.",
            "I'm not convinced that the estimate includes all the fees."
        ]
    },
    {
        "num": 37,
        "examples_ko": [
            "제가 버스 시간표를 확인해 드릴게요.",
            "내가 재킷을 챙길게. 그다음에 우리 갈 수 있어.",
            "제가 생각해 보고 내일 다시 답해 드릴게요."
        ],
        "usage_ko": "let me는 내가 해 주겠다고 나설 때 써요.",
        "title": "Let me + 동사원형",
        "examples": [
            "Let me check the bus schedule for you.",
            "Let me grab my jacket, and then we can go.",
            "Let me think about it and get back to you tomorrow."
        ]
    },
    {
        "num": 38,
        "examples_ko": [
            "일할 수 있는 조용한 곳을 찾고 있어요.",
            "무엇을 찾고 계세요?",
            "찾으시는 것을 발견하면 알려 드릴게요."
        ],
        "usage_ko": "look for는 원하는 것을 찾는 중이에요.",
        "title": "Look for + 명사 (찾다).",
        "examples": [
            "I'm looking for a quiet place to work.",
            "What are you looking for?",
            "I'll let you know if I find what you're looking for."
        ]
    },
    {
        "num": 39,
        "examples_ko": [
            "더 이른 항공편을 타는 쪽으로 마음이 기울고 있어.",
            "더 작은 아파트 쪽으로 마음이 기울고 있어.",
            "다음 달까지 기다리는 쪽으로 마음이 기울고 있어."
        ],
        "usage_ko": "leaning toward는 더 끌리는 선택을 말해요.",
        "title": "I'm leaning toward + 명사 / -ing.",
        "examples": [
            "I'm leaning toward taking the earlier flight.",
            "I'm leaning toward the smaller apartment.",
            "I'm leaning toward waiting until next month."
        ]
    },
    {
        "num": 40,
        "examples_ko": [
            "계산서를 주시겠어요?",
            "계산서를 주시겠어요?",
            "영수증을 주시겠어요?"
        ],
        "usage_ko": "bill은 식사 후 계산서를 요청할 때 써요.",
        "title": "Could we have the bill, please?",
        "examples": [
            "Could we have the bill, please?",
            "Could we have the check, please?",
            "Could we have the receipt, please?"
        ]
    },
    {
        "num": 41,
        "examples_ko": [
            "우리 사무실 근처에 새로 생긴 이 커피숍 한번 가 봐.",
            "한번 확인해 보고 알려 줄게.",
            "그 영화 한번 봐 봐."
        ],
        "usage_ko": "check out은 관심을 갖고 살펴보란 뜻이에요.",
        "title": "Check out + 명사 (확인해 보다 / 가 보다).",
        "examples": [
            "Check out this new coffee shop near my office.",
            "I'll check it out and let you know.",
            "You should check out that movie."
        ]
    },
    {
        "num": 42,
        "examples_ko": [
            "자리가 있다면 야외 테이블이 더 좋겠습니다.",
            "저는 더 이른 기차를 타는 게 좋겠습니다.",
            "저는 월 단위로 갱신하는 임대 계약이 더 좋겠습니다."
        ],
        "usage_ko": "prefer는 다른 것보다 더 원하는 선택이에요.",
        "title": "I'd prefer + 명사 / to + 동사원형",
        "examples": [
            "I'd prefer a table outside if one is available.",
            "I'd prefer to take the earlier train.",
            "I'd prefer a month-to-month lease."
        ]
    },
    {
        "num": 43,
        "examples_ko": [
            "직장 동료들과 잘 지내?",
            "우리는 정말 잘 지내.",
            "너희 둘이 서로 잘 지내는 법을 배웠으면 좋겠어."
        ],
        "usage_ko": "get along은 사람과 사이좋게 지낼 때 써요.",
        "title": "Get along with + 사람 (잘 지내다).",
        "examples": [
            "Do you get along with your coworkers?",
            "We get along really well.",
            "I hope you two can learn to get along."
        ]
    },
    {
        "num": 44,
        "examples_ko": [
            "다음 버스를 기다리느니 차라리 걸을래.",
            "내 전화번호는 알려 주지 않는 게 좋겠어.",
            "조용한 곳에서 만나는 게 더 좋겠어."
        ],
        "usage_ko": "rather는 두 행동 중 더 원하는 쪽을 말해요.",
        "title": "I'd rather + 동사원형",
        "examples": [
            "I'd rather walk than wait for another bus.",
            "I'd rather not share my phone number.",
            "I'd rather meet somewhere quiet."
        ]
    },
    {
        "num": 45,
        "examples_ko": [
            "확인 내용을 이메일로 보내 주시면 마음이 더 놓일 것 같아요.",
            "어두워지기 전에 출발하면 마음이 더 놓일 것 같아.",
            "수리 기사님이 도착 전에 전화해 주시면 마음이 더 놓일 것 같아요."
        ],
        "usage_ko": "better if는 안심될 조건을 부탁할 때 써요.",
        "title": "I'd feel better if + 문장.",
        "examples": [
            "I'd feel better if you could send me the confirmation by email.",
            "I'd feel better if we left before it gets dark.",
            "I'd feel better if the repair person called before arriving."
        ]
    },
    {
        "num": 46,
        "examples_ko": [
            "신용카드로 결제할게요.",
            "현금으로 결제할게요.",
            "애플 페이로 결제할게요."
        ],
        "usage_ko": "with는 카드처럼 결제 수단을 나타내요.",
        "title": "I'll pay with + 결제수단",
        "examples": [
            "I'll pay with my credit card.",
            "I'll pay with cash.",
            "I'll pay with Apple Pay."
        ]
    },
    {
        "num": 47,
        "examples_ko": [
            "오늘 저녁 식사에 함께하시겠어요?",
            "들어와서 안에서 기다리시겠어요?",
            "다른 사이즈도 한번 착용해 보시겠어요?"
        ],
        "usage_ko": "would like는 상대를 공손히 초대할 때 써요.",
        "title": "Would you like to + 동사원형?",
        "examples": [
            "Would you like to join us for dinner tonight?",
            "Would you like to come in and wait inside?",
            "Would you like to try a different size?"
        ]
    },
    {
        "num": 48,
        "examples_ko": [
            "청구서에 추가된 요금이 걱정돼요.",
            "이런 날씨에 운전하는 게 걱정돼.",
            "수리가 얼마나 오래 걸릴지 걱정돼요."
        ],
        "usage_ko": "concerned는 마음에 걸리는 걱정을 말해요.",
        "title": "I'm concerned about + 명사 / -ing.",
        "examples": [
            "I'm concerned about the extra charge on my bill.",
            "I'm concerned about driving in this weather.",
            "I'm concerned about how long the repair will take."
        ]
    },
    {
        "num": 49,
        "examples_ko": [
            "나는 그 초대를 거절해야 했어.",
            "그녀는 입사 제안을 거절했어.",
            "사람들의 요청을 정중하게 거절해도 괜찮아."
        ],
        "usage_ko": "turn down은 초대나 제안을 거절할 때 써요.",
        "title": "Turn down + 제안/요청 (거절하다).",
        "examples": [
            "I had to turn down the invitation.",
            "She turned down the job offer.",
            "It's okay to turn people down politely."
        ]
    },
    {
        "num": 50,
        "examples_ko": [
            "제가 걱정하는 건 잠금장치가 제대로 작동하지 않는다는 점이에요.",
            "제가 걱정하는 건 청구 금액이 계속 바뀐다는 점이에요.",
            "제가 걱정하는 건 비상 연락처가 명확하지 않다는 점이에요."
        ],
        "usage_ko": "concerns me는 무엇이 걱정인지 짚어요.",
        "title": "What concerns me is (that) + 문장.",
        "examples": [
            "What concerns me is that the lock doesn't work properly.",
            "What concerns me is that the bill keeps changing.",
            "What concerns me is that there isn't a clear emergency contact."
        ]
    },
    {
        "num": 51,
        "examples_ko": [
            "숨을 한번 쉬고 진정해.",
            "아기가 마침내 진정했어.",
            "진정하려면 몇 분이 필요해."
        ],
        "usage_ko": "calm down은 흥분을 가라앉히란 뜻이에요.",
        "title": "Calm down (진정하다).",
        "examples": [
            "Take a breath and calm down.",
            "The baby finally calmed down.",
            "I need a few minutes to calm down."
        ]
    },
    {
        "num": 52,
        "examples_ko": [
            "잔금을 내일 아침에 내도 괜찮을까요?",
            "제 친구가 하룻밤 묵어도 괜찮을까요?",
            "회의를 금요일로 옮겨도 괜찮을까요?"
        ],
        "usage_ko": "okay if는 해도 괜찮을지 허락을 구해요.",
        "title": "Would it be okay if + 문장?",
        "examples": [
            "Would it be okay if I paid the balance tomorrow morning?",
            "Would it be okay if my friend stayed over for one night?",
            "Would it be okay if we moved the meeting to Friday?"
        ]
    },
    {
        "num": 53,
        "examples_ko": [
            "기운 내. 상황이 나아질 거야.",
            "기운 내라고 커피를 가져왔어.",
            "그 노래를 들으면 나는 항상 기운이 나."
        ],
        "usage_ko": "cheer up은 힘내라고 위로할 때 써요.",
        "title": "Cheer up (기운 내다 / 기운을 북돋우다).",
        "examples": [
            "Cheer up—things will get better.",
            "I brought you coffee to cheer you up.",
            "That song always cheers me up."
        ]
    },
    {
        "num": 54,
        "examples_ko": [
            "그냥 둘러보고 있어요. 고맙습니다.",
            "그냥 이리저리 둘러보고 있어요. 고맙습니다.",
            "지금은 그냥 둘러보고 있어요. 고맙습니다."
        ],
        "usage_ko": "browsing은 사지 않고 둘러본단 뜻이에요.",
        "title": "I'm just browsing, thanks",
        "examples": [
            "I'm just browsing, thanks.",
            "I'm just browsing around, thanks.",
            "I'm just browsing for now, thanks."
        ]
    },
    {
        "num": 55,
        "examples_ko": [
            "전화 끊지 마세요. 질문이 하나 더 있어요.",
            "내가 미처 설명하기도 전에 그녀가 전화를 끊었어.",
            "통화가 끊긴 것 같으니 일단 끊고 다시 전화할게."
        ],
        "usage_ko": "hang up은 통화를 끝낼 때 써요.",
        "title": "Hang up (전화를 끊다).",
        "examples": [
            "Don't hang up—I have one more question.",
            "She hung up before I could explain.",
            "I think the call dropped, so I'll hang up and call back."
        ]
    },
    {
        "num": 56,
        "examples_ko": [
            "10분 뒤에 다시 전화해도 될까요?",
            "의사 선생님이 오늘 오후에 다시 전화하겠다고 했어요.",
            "시간 되실 때 다시 전화해 주세요."
        ],
        "usage_ko": "call back은 나중에 다시 전화할 때 써요.",
        "title": "Call back (다시 전화하다).",
        "examples": [
            "Can I call you back in ten minutes?",
            "The doctor said she'd call back this afternoon.",
            "Please call me back when you're free."
        ]
    },
    {
        "num": 57,
        "examples_ko": [
            "음악 소리를 조금 줄여 주시겠어요?",
            "저희 사진을 찍어 주시겠어요?",
            "그걸 좀 적어 주시겠어요?"
        ],
        "usage_ko": "mind는 꺼리는지 물으며 공손히 부탁해요.",
        "title": "Would you mind + -ing?",
        "examples": [
            "Would you mind lowering the music a little?",
            "Would you mind taking a picture of us?",
            "Would you mind writing that down for me?"
        ]
    },
    {
        "num": 58,
        "examples_ko": [
            "통화 도중에 연결이 끊겼어.",
            "내 말 끊지 마. 아직 안 끝났어.",
            "눈 때문에 길이 끊겼어."
        ],
        "usage_ko": "cut off는 통화가 갑자기 끊겼을 때 써요.",
        "title": "Cut off (끊다 / 차단하다).",
        "examples": [
            "We got cut off in the middle of the call.",
            "Don't cut me off—I'm not finished.",
            "The road was cut off by snow."
        ]
    },
    {
        "num": 59,
        "examples_ko": [
            "세탁실이 어디 있는지 기꺼이 안내해 드릴게요.",
            "안 계시는 동안 우편물을 기꺼이 안으로 들여다 드릴게요.",
            "그 양식을 기꺼이 함께 검토해 드릴게요."
        ],
        "usage_ko": "happy to는 기꺼이 돕겠다는 뜻이에요.",
        "title": "I'd be happy to + 동사원형.",
        "examples": [
            "I'd be happy to show you where the laundry room is.",
            "I'd be happy to bring in your mail while you're away.",
            "I'd be happy to review the form with you."
        ]
    },
    {
        "num": 60,
        "examples_ko": [
            "조금 더 크게 말씀해 주시겠어요?",
            "뭔가 잘못됐다는 느낌이 들면 목소리를 내야 해.",
            "그녀는 회의 중에 의견을 말했어."
        ],
        "usage_ko": "speak up은 더 크게 말해 달랄 때 써요.",
        "title": "Speak up (더 크게 말하다 / 의견을 말하다).",
        "examples": [
            "Could you speak up a little?",
            "You should speak up if something feels wrong.",
            "She spoke up during the meeting."
        ]
    },
    {
        "num": 61,
        "examples_ko": [
            "이 울 재킷 L 사이즈 있나요?",
            "이거 M 사이즈 있나요?",
            "이거 10 사이즈 있나요?"
        ],
        "usage_ko": "in size는 원하는 옷의 치수를 말해요.",
        "title": "Do you have this in size + [치수]?",
        "examples": [
            "Do you have this wool jacket in size large?",
            "Do you have this in size medium?",
            "Do you have this in size 10?"
        ]
    },
    {
        "num": 62,
        "examples_ko": [
            "오늘 밤에는 돈 얘기를 꺼내고 싶지 않았어.",
            "그 얘기를 꺼내 줘서 고마워.",
            "그는 좋은 질문을 꺼냈어."
        ],
        "usage_ko": "bring up은 대화에서 화제를 꺼낼 때 써요.",
        "title": "Bring up + 주제 (화제를 꺼내다).",
        "examples": [
            "I didn't want to bring up money tonight.",
            "Thanks for bringing that up.",
            "He brought up a good question."
        ]
    },
    {
        "num": 63,
        "examples_ko": [
            "그 점을 짚어 줘서 고마워.",
            "그녀가 내 메시지에서 틀린 부분을 짚어 줬어.",
            "중요한 세부 사항 하나를 짚어 드릴게요."
        ],
        "usage_ko": "point out은 놓친 점을 짚어 줄 때 써요.",
        "title": "Point out + 내용 (지적하다 / 알려 주다).",
        "examples": [
            "Thanks for pointing that out.",
            "She pointed out a mistake in my message.",
            "Let me point out one important detail."
        ]
    },
    {
        "num": 64,
        "examples_ko": [
            "지연되는 게 걱정되지 않을 수가 없어.",
            "그 개를 보면 미소를 짓지 않을 수가 없어.",
            "내가 주소를 잘못 입력한 건 아닌가 하는 생각이 자꾸 들어."
        ],
        "usage_ko": "can't help는 걱정을 멈출 수 없단 뜻이에요.",
        "title": "I can't help + -ing.",
        "examples": [
            "I can't help worrying about the delay.",
            "I can't help smiling when I see that dog.",
            "I can't help wondering whether I entered the wrong address."
        ]
    },
    {
        "num": 65,
        "examples_ko": [
            "알아보고 다시 연락드릴게요.",
            "그 행사에 대해 어떻게 알게 됐어?",
            "뭐가 잘못됐는지 알아내야 해."
        ],
        "usage_ko": "find out은 몰랐던 사실을 알아낼 때 써요.",
        "title": "Find out + 의문사절 (알아내다).",
        "examples": [
            "I'll find out and get back to you.",
            "How did you find out about the event?",
            "We need to find out what went wrong."
        ]
    },
    {
        "num": 66,
        "examples_ko": [
            "‘처리 수수료’라는 게 무슨 뜻이에요?",
            "공과금을 나눠 낸다는 게 무슨 뜻이에요?",
            "일정이 유연하다는 게 무슨 뜻이에요?"
        ],
        "usage_ko": "mean by는 그 말의 뜻을 확인할 때 써요.",
        "title": "What do you mean by + 명사 / -ing?",
        "examples": [
            "What do you mean by “processing fee”?",
            "What do you mean by sharing the utilities?",
            "What do you mean by a flexible schedule?"
        ]
    },
    {
        "num": 67,
        "examples_ko": [
            "이 앱이 어떻게 작동하는지 도무지 모르겠어.",
            "우리가 어떻게든 방법을 찾아낼 거야.",
            "뭘 하고 싶은지 이제 생각이 정리됐어?"
        ],
        "usage_ko": "figure out은 방법을 이해해 낼 때 써요.",
        "title": "Figure out + 의문사절 (이해하다 / 해결 방법을 찾다).",
        "examples": [
            "I can't figure out how this app works.",
            "We'll figure something out.",
            "Have you figured out what you want to do?"
        ]
    },
    {
        "num": 68,
        "examples_ko": [
            "전부터 집세에 관해 너에게 전화하려고 했어.",
            "전부터 그 카페에 가 보려고 했어.",
            "전부터 도와줘서 고맙다는 말을 하려고 했어."
        ],
        "usage_ko": "been meaning은 전부터 하려던 일이에요.",
        "title": "I've been meaning to + 동사원형.",
        "examples": [
            "I've been meaning to call you about the rent.",
            "I've been meaning to try that café.",
            "I've been meaning to thank you for your help."
        ]
    },
    {
        "num": 69,
        "examples_ko": [
            "분명 모든 일이 잘 풀릴 거야.",
            "우리는 함께 해결책을 찾아냈어.",
            "그 시간이 너에게 잘 맞았으면 좋겠어."
        ],
        "usage_ko": "work out은 일이 잘 풀린다는 뜻이에요.",
        "title": "Work out (잘 풀리다 / 해결하다).",
        "examples": [
            "I'm sure everything will work out.",
            "We worked out a solution together.",
            "I hope the timing works out for you."
        ]
    },
    {
        "num": 70,
        "examples_ko": [
            "탈의실에서 이걸 입어 봐도 되나요?",
            "여기서 이걸 입어 봐도 되나요?",
            "사기 전에 이걸 입어 봐도 되나요?"
        ],
        "usage_ko": "try on은 옷이 맞는지 입어 볼 때 써요.",
        "title": "Can I try this on?",
        "examples": [
            "Can I try this on in the fitting room?",
            "Can I try this on here?",
            "Can I try this on before I buy it?"
        ]
    },
    {
        "num": 71,
        "examples_ko": [
            "3시에 치과 예약이 있어.",
            "10분 뒤에는 나가야 해.",
            "계약서에 관해 질문이 몇 가지 있어요."
        ],
        "usage_ko": "got은 잡혀 있는 약속이 있다는 뜻이에요.",
        "title": "I've got + 명사 / to + 동사원형.",
        "examples": [
            "I've got a dentist appointment at three.",
            "I've got to leave in ten minutes.",
            "I've got a few questions about the contract."
        ]
    },
    {
        "num": 72,
        "examples_ko": [
            "그건 나중에 처리할게.",
            "스트레스에는 어떻게 대처해?",
            "더 심해지기 전에 이 일을 처리해야 해."
        ],
        "usage_ko": "deal with는 문제를 처리할 때 써요.",
        "title": "Deal with + 문제/사람 (처리하다 / 대처하다).",
        "examples": [
            "I'll deal with that later.",
            "How do you deal with stress?",
            "We need to deal with this before it gets worse."
        ]
    },
    {
        "num": 73,
        "examples_ko": [
            "성함을 잘 못 들었어요.",
            "아파트 호수를 잘 못 들었어요.",
            "죄송하지만 화요일이라고 하신 뒤의 말을 잘 못 들었어요."
        ],
        "usage_ko": "catch는 말을 듣고 알아듣는다는 뜻이에요.",
        "title": "I didn't catch + 단어 / that.",
        "examples": [
            "I didn't catch your name.",
            "I didn't catch the apartment number.",
            "Sorry, I didn't catch what you said after Tuesday."
        ]
    },
    {
        "num": 74,
        "examples_ko": [
            "차가 막혀서 여기까지 오는 데 한 시간이 걸렸어.",
            "새 시스템에 익숙해지는 데 몇 주가 걸렸어.",
            "주차할 곳을 찾는 데 한참 걸렸어."
        ],
        "usage_ko": "took은 어떤 일에 시간이 들었단 뜻이에요.",
        "title": "It took me + 시간 + to + 동사원형.",
        "examples": [
            "It took me an hour to get here in traffic.",
            "It took me a few weeks to get used to the new system.",
            "It took me forever to find a parking spot."
        ]
    },
    {
        "num": 75,
        "examples_ko": [
            "이 소음은 더 이상 못 참겠어.",
            "그렇게 긴 출퇴근을 어떻게 견뎌?",
            "그런 대우를 받는 걸 네가 참아야 하는 건 아니야."
        ],
        "usage_ko": "put up with는 불편한 일을 참을 때 써요.",
        "title": "Put up with + 명사/-ing (참다 / 감수하다).",
        "examples": [
            "I can't put up with this noise anymore.",
            "How do you put up with such a long commute?",
            "You shouldn't have to put up with being treated that way."
        ]
    },
    {
        "num": 76,
        "examples_ko": [
            "그러니까 집세에 수도 요금은 포함되지만 전기 요금은 아니라는 말이죠?",
            "그러니까 신분증과 서류 원본을 가져와야 한다는 말이죠?",
            "그러니까 소포가 금요일이 아니라 월요일에 도착한다는 말이죠?"
        ],
        "usage_ko": "you mean은 상대 뜻이 맞는지 확인해요.",
        "title": "So, you mean (that) + 문장?",
        "examples": [
            "So, you mean the rent includes water but not electricity?",
            "So, you mean I need to bring my ID and the original document?",
            "So, you mean the package will arrive on Monday, not Friday?"
        ]
    },
    {
        "num": 77,
        "examples_ko": [
            "이거 다른 색상도 있나요?",
            "이거 검은색도 있나요?",
            "이 디자인으로 더 밝은 색상도 있나요?"
        ],
        "usage_ko": "different color는 다른 색상을 요청해요.",
        "title": "Do you have this in a different color?",
        "examples": [
            "Do you have this in a different color?",
            "Do you have this in black?",
            "Do you have this style in a lighter color?"
        ]
    },
    {
        "num": 78,
        "examples_ko": [
            "도로의 이쪽 편에서 운전하는 데 점점 익숙해지고 있어.",
            "더 추운 날씨에 점점 익숙해지고 있어.",
            "직장에서 영어로 말하는 데 점점 익숙해지고 있어."
        ],
        "usage_ko": "get used to는 점점 익숙해질 때 써요.",
        "title": "I'm getting used to + 명사 / -ing.",
        "examples": [
            "I'm getting used to driving on this side of the road.",
            "I'm getting used to the colder weather.",
            "I'm getting used to speaking English at work."
        ]
    },
    {
        "num": 79,
        "examples_ko": [
            "6시까지 도착할 수 있을지 잘 모르겠어.",
            "이 약을 빈속에 먹어도 안전한지 잘 모르겠어요.",
            "결제가 제대로 됐는지 잘 모르겠어요."
        ],
        "usage_ko": "not sure는 확실히 알지 못한단 뜻이에요.",
        "title": "I'm not sure if + 문장",
        "examples": [
            "I'm not sure if I can make it by six.",
            "I'm not sure if this medicine is safe on an empty stomach.",
            "I'm not sure if the payment went through."
        ]
    },
    {
        "num": 80,
        "examples_ko": [
            "대중교통을 이용하는 데 익숙해.",
            "가끔 늦게까지 일하는 데 익숙해.",
            "거리에서 나는 소음에 익숙해."
        ],
        "usage_ko": "be used to는 이미 익숙한 상태를 말해요.",
        "title": "I'm used to + 명사 / -ing.",
        "examples": [
            "I'm used to taking public transportation.",
            "I'm used to working late once in a while.",
            "I'm used to the noise from the street."
        ]
    },
    {
        "num": 81,
        "examples_ko": [
            "그 이야기를 더 이상 미루지 마.",
            "나는 치과에 가는 걸 계속 미루고 있어.",
            "그들은 여행을 다음 달로 미뤘어."
        ],
        "usage_ko": "put off는 해야 할 일을 미룰 때 써요.",
        "title": "Put off + 명사/-ing (미루다).",
        "examples": [
            "Don't put off the conversation any longer.",
            "I keep putting off going to the dentist.",
            "They put the trip off until next month."
        ]
    },
    {
        "num": 82,
        "examples_ko": [
            "버스가 늦으니 차라리 걷는 게 낫겠어.",
            "이왕 여기 왔으니 장도 보는 게 낫겠어.",
            "이왕이면 지금 요금을 내는 게 낫겠어."
        ],
        "usage_ko": "might as well은 차라리 하자는 뜻이에요.",
        "title": "I might as well + 동사원형.",
        "examples": [
            "The bus is late, so I might as well walk.",
            "Since we're here, we might as well get groceries.",
            "I might as well pay the bill now."
        ]
    },
    {
        "num": 83,
        "examples_ko": [
            "그는 내가 떠난 후에도 계속 말했어.",
            "계속 시도해 봐. 점점 나아지고 있어.",
            "하루 종일 비가 계속 내렸어."
        ],
        "usage_ko": "keep on은 멈추지 않고 계속할 때 써요.",
        "title": "Keep on + -ing (계속 ~하다).",
        "examples": [
            "He kept on talking even after I left.",
            "Keep on trying—you're getting better.",
            "It kept on raining all day."
        ]
    },
    {
        "num": 84,
        "examples_ko": [
            "아쉽게도 이건 어깨 부분이 너무 헐렁해요.",
            "이건 너무 꽉 껴요.",
            "이건 너무 비싸요."
        ],
        "usage_ko": "too는 알맞은 정도를 넘어섰다는 뜻이에요.",
        "title": "This is too + 형용사",
        "examples": [
            "This is unfortunately too loose around the shoulders.",
            "This is too tight.",
            "This is too expensive."
        ]
    },
    {
        "num": 85,
        "examples_ko": [
            "비가 오기 전에 집에 가야겠어.",
            "은행이 문을 닫기 전에 전화해야겠어.",
            "기차를 타려면 이제 출발해야겠어."
        ],
        "usage_ko": "better는 안 하면 곤란해질 일을 권해요.",
        "title": "I'd better + 동사원형.",
        "examples": [
            "I'd better head home before it starts raining.",
            "I'd better call the bank before it closes.",
            "I'd better get going if I want to catch the train."
        ]
    },
    {
        "num": 86,
        "examples_ko": [
            "전화했을 텐데 네 번호를 잃어버렸어.",
            "더 일찍 왔을 텐데 기차가 연착됐어.",
            "도와줬을 텐데 네게 필요한 게 있는 줄 몰랐어."
        ],
        "usage_ko": "would have는 사정상 못 한 일을 말해요.",
        "title": "I would have + 과거분사, but + 문장.",
        "examples": [
            "I would have called, but I lost your number.",
            "I would have come earlier, but the train was delayed.",
            "I would have helped, but I didn't know you needed anything."
        ]
    },
    {
        "num": 87,
        "examples_ko": [
            "결과는 내가 예상했던 것보다 더 좋았어.",
            "그 소문은 사실로 드러났어.",
            "면접 결과는 어떻게 됐어?"
        ],
        "usage_ko": "turn out은 실제로 나온 결과를 말해요.",
        "title": "Turn out (결과적으로 ~이다 / 밝혀지다).",
        "examples": [
            "It turned out better than I expected.",
            "The rumor turned out to be true.",
            "How did the interview turn out?"
        ]
    },
    {
        "num": 88,
        "examples_ko": [
            "이게 가장 저렴한 선택이라는 데 동의하는지는 잘 모르겠어.",
            "막판에 일정을 바꾸는 데 동의하는지는 잘 모르겠어.",
            "그 문제가 완전히 해결됐다는 데 동의하는지는 잘 모르겠어."
        ],
        "usage_ko": "not sure는 반대 의견을 부드럽게 말해요.",
        "title": "I'm not sure I agree (with / that) + ...",
        "examples": [
            "I'm not sure I agree that this is the cheapest option.",
            "I'm not sure I agree with changing the schedule at the last minute.",
            "I'm not sure I agree that the issue is completely fixed."
        ]
    },
    {
        "num": 89,
        "examples_ko": [
            "그녀는 힘든 시기를 겪고 있어.",
            "세부 사항을 다시 한번 검토하자.",
            "나도 작년에 비슷한 일을 겪었어."
        ],
        "usage_ko": "go through는 힘든 시기를 겪을 때 써요.",
        "title": "Go through + 경험/과정 (겪다 / 검토하다).",
        "examples": [
            "She's going through a difficult time.",
            "Let's go through the details one more time.",
            "I went through something similar last year."
        ]
    },
    {
        "num": 90,
        "examples_ko": [
            "더 이른 기차를 탈 수도 있었어.",
            "식당에 카드를 두고 왔을 수도 있어.",
            "온라인으로 샀다면 돈을 아낄 수도 있었어."
        ],
        "usage_ko": "could have는 가능했지만 안 한 일이에요.",
        "title": "I could have + 과거분사.",
        "examples": [
            "I could have taken the earlier train.",
            "I could have left my card at the restaurant.",
            "I could have saved money by buying it online."
        ]
    },
    {
        "num": 91,
        "examples_ko": [
            "나중에 영수증을 가져오면 이걸 반품할 수 있나요?",
            "이걸 다른 사이즈로 교환할 수 있나요?",
            "일주일 안에 이걸 반품할 수 있나요?"
        ],
        "usage_ko": "return은 산 물건을 반품할 때 써요.",
        "title": "Can I return or exchange this + 기간 / 조건?",
        "examples": [
            "Can I return this later with the receipt?",
            "Can I exchange this for a different size?",
            "Can I return this within a week?"
        ]
    },
    {
        "num": 92,
        "examples_ko": [
            "교통 상황에 달려 있어.",
            "몇 명이 오느냐에 달려 있어.",
            "집주인이 그 요청을 승인하느냐에 달려 있어."
        ],
        "usage_ko": "depends on은 조건에 따라 달라진단 뜻이에요.",
        "title": "It depends on + 명사 / 의문사절",
        "examples": [
            "It depends on the traffic.",
            "It depends on how many people are coming.",
            "It depends on whether the landlord approves the request."
        ]
    },
    {
        "num": 93,
        "examples_ko": [
            "우산을 가져왔어야 했어.",
            "떠나기 전에 주소를 확인했어야 했어.",
            "예약을 더 일찍 잡았어야 했어."
        ],
        "usage_ko": "should have는 하지 않은 일을 후회해요.",
        "title": "I should have + 과거분사.",
        "examples": [
            "I should have brought an umbrella.",
            "I should have checked the address before leaving.",
            "I should have made the appointment sooner."
        ]
    },
    {
        "num": 94,
        "examples_ko": [
            "막 떠나려던 참에 배송물이 도착했어.",
            "막 너에게 전화하려던 참에 네 메시지를 받았어.",
            "막 잠자리에 들려던 참에 화재경보가 울렸어."
        ],
        "usage_ko": "about to는 막 하려던 순간을 말해요.",
        "title": "I was about to + 동사원형 when + 문장.",
        "examples": [
            "I was about to leave when the delivery arrived.",
            "I was about to call you when I got your message.",
            "I was about to go to bed when the fire alarm went off."
        ]
    },
    {
        "num": 95,
        "examples_ko": [
            "이번에는 내가 정말 실수했어.",
            "걱정 마. 네가 망친 건 아무것도 없어.",
            "내가 날짜를 잘못 알아서 예약 시간에 가지 못했어."
        ],
        "usage_ko": "mess up은 일을 잘못해 망쳤을 때 써요.",
        "title": "Mess up (망치다 / 실수하다).",
        "examples": [
            "I really messed up this time.",
            "Don't worry—you didn't mess anything up.",
            "I messed up the date and missed the appointment."
        ]
    },
    {
        "num": 96,
        "examples_ko": [
            "가장 가까운 지하철역은 어디인가요?",
            "가장 가까운 버스 정류장은 어디인가요?",
            "가장 가까운 택시 승강장은 어디인가요?"
        ],
        "usage_ko": "nearest는 가장 가까운 장소를 찾을 때 써요.",
        "title": "Where is the nearest [transit stop]?",
        "examples": [
            "Where is the nearest subway station?",
            "Where is the nearest bus stop?",
            "Where is the nearest taxi stand?"
        ]
    },
    {
        "num": 97,
        "examples_ko": [
            "우리가 빨리 보고할수록 더 좋아.",
            "네가 빨리 예약할수록 더 좋아.",
            "수리가 빨리 끝날수록 더 좋아."
        ],
        "usage_ko": "sooner는 더 빨리 할수록 좋단 뜻이에요.",
        "title": "The sooner + 문장, the better.",
        "examples": [
            "The sooner we report it, the better.",
            "The sooner you book, the better.",
            "The sooner the repair is finished, the better."
        ]
    },
    {
        "num": 98,
        "examples_ko": [
            "3시 괜찮으세요?",
            "화요일 저녁 괜찮으세요?",
            "사무실 근처 카페에서 만나는 건 괜찮으세요?"
        ],
        "usage_ko": "work는 그 시간이 괜찮은지 물을 때 써요.",
        "title": "Does + 시간 + work for you?",
        "examples": [
            "Does three o'clock work for you?",
            "Does Tuesday evening work for you?",
            "Does meeting at the café near your office work for you?"
        ]
    },
    {
        "num": 99,
        "examples_ko": [
            "퇴근 후 긴장을 풀려면 한 시간이 필요해.",
            "우리가 긴장을 풀며 쉬고 있을 때 그녀가 전화했어.",
            "밤에는 보통 어떻게 긴장을 풀어?"
        ],
        "usage_ko": "wind down은 쉬면서 긴장을 풀 때 써요.",
        "title": "Wind down (긴장을 풀며 마무리하다).",
        "examples": [
            "I need an hour to wind down after work.",
            "We were winding down when she called.",
            "How do you usually wind down at night?"
        ]
    },
    {
        "num": 100,
        "examples_ko": [
            "운송장 번호를 보내 주시면 도움이 될 것 같아요.",
            "안내 사항이 서면으로 되어 있으면 도움이 될 것 같아요.",
            "모두가 요리 후에 치워 주면 도움이 될 것 같아."
        ],
        "usage_ko": "help if는 도움이 될 행동을 부탁해요.",
        "title": "It would help if + 문장.",
        "examples": [
            "It would help if you could send the tracking number.",
            "It would help if the instructions were in writing.",
            "It would help if everyone cleaned up after cooking."
        ]
    },
    {
        "num": 101,
        "examples_ko": [
            "너무 많은 일을 맡아서 완전히 지치고 싶지는 않아.",
            "그녀는 몇 달 동안 야근하다가 완전히 지쳤어.",
            "완전히 지치기 전에 틈틈이 쉬어."
        ],
        "usage_ko": "burn out은 무리해서 지칠 때 써요.",
        "title": "Burn out (지쳐서 소진되다).",
        "examples": [
            "I don't want to burn out by taking on too much.",
            "She burned out after months of overtime.",
            "Take breaks before you burn out."
        ]
    },
    {
        "num": 102,
        "examples_ko": [
            "조금 더 일찍 만나 주실 수 있을까요?",
            "제 소포를 내일까지 보관해 주실 수 있을까요?",
            "자세한 내용을 이메일로 보내 주실 수 있을까요?"
        ],
        "usage_ko": "able to는 해 줄 수 있는지 공손히 물어요.",
        "title": "Would you be able to + 동사원형?",
        "examples": [
            "Would you be able to meet a little earlier?",
            "Would you be able to hold my package until tomorrow?",
            "Would you be able to send me the details by email?"
        ]
    },
    {
        "num": 103,
        "examples_ko": [
            "집에 오는 길에 차가 고장 났어.",
            "그녀는 그 소식을 듣고 감정적으로 무너졌어.",
            "문제를 더 작은 단계로 나눠 보자."
        ],
        "usage_ko": "break down은 기계가 고장 났을 때 써요.",
        "title": "Break down (고장 나다 / 감정이 무너지다).",
        "examples": [
            "My car broke down on the way home.",
            "She broke down when she heard the news.",
            "Let's break the problem down into smaller steps."
        ]
    },
    {
        "num": 104,
        "examples_ko": [
            "어느 버스가 박물관에 가나요?",
            "어느 기차가 공항에 가나요?",
            "어느 버스가 시내에 가나요?"
        ],
        "usage_ko": "goes to는 목적지로 가는 노선을 물어요.",
        "title": "Which bus/train goes to + 명사?",
        "examples": [
            "Which bus goes to the museum?",
            "Which train goes to the airport?",
            "Which bus goes downtown?"
        ]
    },
    {
        "num": 105,
        "examples_ko": [
            "나 감기에 걸리려는 것 같아.",
            "그녀는 지난주에 독감에 걸렸어.",
            "여행 전에 아무 병에도 걸리지 않았으면 좋겠어."
        ],
        "usage_ko": "come down with는 병의 초기 증상에 써요.",
        "title": "Come down with + 병 (병에 걸리다).",
        "examples": [
            "I think I'm coming down with a cold.",
            "She came down with the flu last week.",
            "I hope I don't come down with anything before the trip."
        ]
    },
    {
        "num": 106,
        "examples_ko": [
            "변경을 승인할지는 집주인이 결정할 일이야.",
            "어느 식당을 고를지는 네가 결정해.",
            "검사가 필요한지 판단하는 건 의사 선생님이 결정할 일이야."
        ],
        "usage_ko": "up to는 결정할 사람이 누구인지 말해요.",
        "title": "It's up to + 사람.",
        "examples": [
            "It's up to the landlord to approve the change.",
            "It's up to you which restaurant we choose.",
            "It's up to the doctor to decide whether I need a test."
        ]
    },
    {
        "num": 107,
        "examples_ko": [
            "이번 달 전기 요금은 내가 맡아서 낼게.",
            "배관공에게 전화하는 건 내가 맡을게.",
            "예약은 내가 맡아서 할게."
        ],
        "usage_ko": "take care는 맡아서 처리하겠다는 말이에요.",
        "title": "I'll take care of + 명사.",
        "examples": [
            "I'll take care of the electricity bill this month.",
            "I'll take care of calling the plumber.",
            "I'll take care of the reservation."
        ]
    },
    {
        "num": 108,
        "examples_ko": [
            "갑자기 일이 생겨서 오늘 밤 약속을 취소해야 해.",
            "미안하지만 직장에서 갑자기 일이 생겼어.",
            "오늘 아침에 내 차에 무슨 일이 생겼어."
        ],
        "usage_ko": "came up은 갑자기 일이 생겼단 뜻이에요.",
        "title": "Something came up.",
        "examples": [
            "Something came up, so I need to cancel tonight.",
            "I'm sorry, but something came up at work.",
            "Something came up with my car this morning."
        ]
    },
    {
        "num": 109,
        "examples_ko": [
            "시청에서 갈아타야 하나요?",
            "다른 노선으로 갈아타야 하나요?",
            "다음 정류장에서 갈아타야 하나요?"
        ],
        "usage_ko": "transfer는 다른 교통편으로 갈아타요.",
        "title": "Do I need to transfer at + 명사?",
        "examples": [
            "Do I need to transfer at City Hall?",
            "Do I need to transfer to another line?",
            "Do I need to transfer at the next stop?"
        ]
    },
    {
        "num": 110,
        "examples_ko": [
            "저녁 먹고 치우는 것 좀 도와줄래?",
            "어질러진 건 내가 나중에 치울게.",
            "손님들이 오기 전에 치워야 해."
        ],
        "usage_ko": "clean up은 어질러진 곳을 치울 때 써요.",
        "title": "Clean up (치우다 / 정리하다).",
        "examples": [
            "Can you help me clean up after dinner?",
            "I'll clean up the mess later.",
            "We need to clean up before the guests arrive."
        ]
    },
    {
        "num": 111,
        "examples_ko": [
            "나 10분 정도 늦고 있어.",
            "버스가 끝내 오지 않아서 늦고 있어.",
            "죄송하지만 약속 시간에 조금 늦고 있어요."
        ],
        "usage_ko": "running late는 예정보다 늦는 중이에요.",
        "title": "I'm running + 시간 + late.",
        "examples": [
            "I'm running about ten minutes late.",
            "I'm running late because the bus never came.",
            "I'm sorry, but I'm running a little late for our appointment."
        ]
    },
    {
        "num": 112,
        "examples_ko": [
            "장 봐 온 물건을 제자리에 넣어 줄래?",
            "저녁 먹을 때는 휴대폰을 치워 주세요.",
            "오늘 아침에 식기를 제자리에 넣었어."
        ],
        "usage_ko": "put away는 물건을 제자리에 넣을 때 써요.",
        "title": "Put away + 물건 (제자리에 넣다).",
        "examples": [
            "Can you put away the groceries?",
            "Please put your phone away during dinner.",
            "I put the dishes away this morning."
        ]
    },
    {
        "num": 113,
        "examples_ko": [
            "목요일 4시는 나도 괜찮아.",
            "온라인으로 만나는 건 나도 괜찮아.",
            "5시까지 떠날 수만 있다면 그렇게 해도 괜찮아."
        ],
        "usage_ko": "works for me는 그 일정이 괜찮단 뜻이에요.",
        "title": "That works for me.",
        "examples": [
            "Thursday at four works for me.",
            "Meeting online works for me.",
            "That works for me as long as I can leave by five."
        ]
    },
    {
        "num": 114,
        "examples_ko": [
            "쓰레기를 밖에 내다 줄래?",
            "오늘 밤에는 피자를 포장해 오자.",
            "재활용품을 밖에 내놓는 걸 깜빡했어."
        ],
        "usage_ko": "take out은 쓰레기를 밖으로 내갈 때 써요.",
        "title": "Take out + 쓰레기/음식 (밖으로 내다 / 포장해 가다).",
        "examples": [
            "Can you take out the trash?",
            "Let's take out pizza tonight.",
            "I forgot to take the recycling out."
        ]
    },
    {
        "num": 115,
        "examples_ko": [
            "아마 7시까지는 거기에 도착할 거야.",
            "아마 가게가 문을 열 때까지는 거기에 도착할 거야.",
            "교통 상황이 평소와 같다면 아마 정오까지는 거기에 도착할 거야."
        ],
        "usage_ko": "should는 도착할 것으로 예상할 때 써요.",
        "title": "I should be there by + 시간.",
        "examples": [
            "I should be there by seven.",
            "I should be there by the time the store opens.",
            "I should be there by noon if traffic is normal."
        ]
    },
    {
        "num": 116,
        "examples_ko": [
            "영수증 버리지 마.",
            "우리는 낡은 옷을 많이 버렸어.",
            "이거 아직 괜찮은가요, 아니면 버려야 하나요?"
        ],
        "usage_ko": "throw out은 필요 없는 것을 버릴 때 써요.",
        "title": "Throw out + 물건 (버리다).",
        "examples": [
            "Don't throw out the receipt.",
            "We threw out a lot of old clothes.",
            "Is this still good, or should I throw it out?"
        ]
    },
    {
        "num": 117,
        "examples_ko": [
            "공항까지 갈 택시를 불러 주실 수 있나요?",
            "호텔까지 갈 택시를 불러 주실 수 있나요?",
            "역까지 갈 택시를 불러 주실 수 있나요?"
        ],
        "usage_ko": "get me는 택시를 잡아 달라고 부탁해요.",
        "title": "Can you get me a cab to + 명사?",
        "examples": [
            "Can you get me a cab to the airport?",
            "Can you get me a cab to the hotel?",
            "Can you get me a cab to the station?"
        ]
    },
    {
        "num": 118,
        "examples_ko": [
            "우리 시간이 다 됐어.",
            "할 말이 다 떨어졌어.",
            "휴대폰 배터리가 다 닳게 두지 마."
        ],
        "usage_ko": "run out은 남은 것을 다 써 버렸단 뜻이에요.",
        "title": "Run out of + 명사 (다 써 버리다).",
        "examples": [
            "We've run out of time.",
            "I ran out of things to say.",
            "Don't let your phone run out of battery."
        ]
    },
    {
        "num": 119,
        "examples_ko": [
            "네가 창문을 열어도 나는 상관없어.",
            "너에게 더 가까운 곳에서 만나도 나는 상관없어.",
            "네가 내 충전기를 빌려 써도 나는 상관없어."
        ],
        "usage_ko": "don't mind는 상대가 해도 괜찮다는 말이에요.",
        "title": "I don't mind if + 문장.",
        "examples": [
            "I don't mind if you open the window.",
            "I don't mind if we meet somewhere closer to you.",
            "I don't mind if you borrow my charger."
        ]
    },
    {
        "num": 120,
        "examples_ko": [
            "지금 역으로 가는 중이야.",
            "가고 있는 중인데 차가 많이 막혀.",
            "의원에 가는 중이에요. 곧 도착할게요."
        ],
        "usage_ko": "on my way는 그곳으로 가는 중이에요.",
        "title": "I'm on my way (to + 장소).",
        "examples": [
            "I'm on my way to the station now.",
            "I'm on my way, but traffic is heavy.",
            "I'm on my way to the clinic. I'll be there soon."
        ]
    },
    {
        "num": 121,
        "examples_ko": [
            "커피를 줄이려고 하고 있어.",
            "불필요한 지출을 줄여야 해.",
            "의사 선생님이 그에게 설탕 섭취를 줄이라고 했어."
        ],
        "usage_ko": "cut back은 소비량을 줄일 때 써요.",
        "title": "Cut back on + 소비/행동 (줄이다).",
        "examples": [
            "I'm trying to cut back on coffee.",
            "We need to cut back on unnecessary spending.",
            "The doctor told him to cut back on sugar."
        ]
    },
    {
        "num": 122,
        "examples_ko": [
            "몇 분 더 기다려도 나는 괜찮아.",
            "네가 설거지를 한다면 내가 요리해도 괜찮아.",
            "대신 버스를 타도 나는 괜찮아."
        ],
        "usage_ko": "don't mind는 직접 해도 괜찮다는 말이에요.",
        "title": "I don't mind + -ing.",
        "examples": [
            "I don't mind waiting a few more minutes.",
            "I don't mind cooking if you do the dishes.",
            "I don't mind taking the bus instead."
        ]
    },
    {
        "num": 123,
        "examples_ko": [
            "내년 여행을 위해 돈을 모으고 있어.",
            "그녀가 새 노트북을 사려고 돈을 모으는 데 몇 달이 걸렸어.",
            "무엇을 위해 돈을 모으고 있어?"
        ],
        "usage_ko": "save up은 목표를 위해 돈을 모을 때 써요.",
        "title": "Save up for + 목표 (돈을 모으다).",
        "examples": [
            "I'm saving up for a trip next year.",
            "It took her months to save up for a new laptop.",
            "What are you saving up for?"
        ]
    },
    {
        "num": 124,
        "examples_ko": [
            "막 집에서 나가려는 참이야.",
            "막 저녁 요리를 시작하려는 참이야.",
            "막 기차에 타려는 참이야."
        ],
        "usage_ko": "about to는 바로 시작하기 직전이에요.",
        "title": "I'm about to + 동사원형.",
        "examples": [
            "I'm about to leave the house.",
            "I'm about to start cooking dinner.",
            "I'm about to get on the train."
        ]
    },
    {
        "num": 125,
        "examples_ko": [
            "다음 주에 네게 돈을 갚을게.",
            "점심 고마워. 식사값은 내가 갚을게.",
            "네가 도와준 은혜에는 결코 다 보답하지 못할 거야."
        ],
        "usage_ko": "pay back은 빌린 돈을 갚을 때 써요.",
        "title": "Pay + 사람 + back (돈을 갚다 / 보답하다).",
        "examples": [
            "I'll pay you back next week.",
            "Thanks for lunch—let me pay you back.",
            "I'll never be able to pay you back for your help."
        ]
    },
    {
        "num": 126,
        "examples_ko": [
            "커피숍 근처에 내려 주세요.",
            "입구 근처에 내려 주세요.",
            "여기에 내려 주세요."
        ],
        "usage_ko": "drop off는 차에서 내려 달라고 부탁해요.",
        "title": "Please drop me off near + 명사",
        "examples": [
            "Please drop me off near the coffee shop.",
            "Please drop me off near the entrance.",
            "Please drop me off here."
        ]
    },
    {
        "num": 127,
        "examples_ko": [
            "그 많은 연습이 정말 성과를 냈어.",
            "그녀의 인내는 결국 결실을 맺었어.",
            "그들은 마침내 대출금을 다 갚았어."
        ],
        "usage_ko": "pay off는 노력이 결실을 맺을 때 써요.",
        "title": "Pay off (성과를 내다 / 빚을 다 갚다).",
        "examples": [
            "All that practice really paid off.",
            "Her patience paid off in the end.",
            "They finally paid off their loan."
        ]
    },
    {
        "num": 128,
        "examples_ko": [
            "이달 말에 이사할 계획이야.",
            "이번 주말에 가족을 방문할 계획이야.",
            "임대 계약을 갱신할 계획이야."
        ],
        "usage_ko": "planning to는 실행할 계획을 말해요.",
        "title": "I'm planning to + 동사원형.",
        "examples": [
            "I'm planning to move at the end of the month.",
            "I'm planning to visit my family this weekend.",
            "I'm planning to renew my lease."
        ]
    },
    {
        "num": 129,
        "examples_ko": [
            "커피는 편하게 가져다 드세요.",
            "길을 잃으면 부담 없이 문자해.",
            "내가 없는 동안 내 책상을 편하게 써도 돼."
        ],
        "usage_ko": "feel free는 부담 없이 해도 된단 뜻이에요.",
        "title": "Feel free to + 동사원형.",
        "examples": [
            "Feel free to help yourself to coffee.",
            "Feel free to text me if you get lost.",
            "Feel free to use my desk while I'm away."
        ]
    },
    {
        "num": 130,
        "examples_ko": [
            "아까 내가 한 말은 취소할게.",
            "그는 자신의 발언을 즉시 철회했어.",
            "사이즈가 맞지 않으면 이걸 반품할 수 있나요?"
        ],
        "usage_ko": "take back은 전에 한 말을 취소할 때 써요.",
        "title": "Take back + 말/물건 (말을 철회하다 / 반품하다).",
        "examples": [
            "I take back what I said earlier.",
            "He immediately took back his comment.",
            "Can I take this back if it doesn't fit?"
        ]
    },
    {
        "num": 131,
        "examples_ko": [
            "야간 수업을 들을까 생각 중이야.",
            "출퇴근용 자전거를 마련할까 생각 중이야.",
            "다른 방을 요청할까 생각 중이야."
        ],
        "usage_ko": "thinking of는 아직 고려 중인 계획이에요.",
        "title": "I'm thinking of + -ing.",
        "examples": [
            "I'm thinking of taking a night class.",
            "I'm thinking of getting a bike for commuting.",
            "I'm thinking of asking for a different room."
        ]
    },
    {
        "num": 132,
        "examples_ko": [
            "얘기할 시간을 잡자.",
            "그녀는 금요일 저녁에 식사 자리를 마련했어.",
            "새 프린터 설정하는 것 좀 도와줄래?"
        ],
        "usage_ko": "set up은 만날 시간을 정할 때 써요.",
        "title": "Set up + 약속/기기 (마련하다 / 설정하다).",
        "examples": [
            "Let's set up a time to talk.",
            "She set up dinner for Friday night.",
            "Can you help me set up the new printer?"
        ]
    },
    {
        "num": 133,
        "examples_ko": [
            "뉴욕행 항공편 체크인을 하고 싶습니다.",
            "파리행 항공편 체크인을 하고 싶습니다.",
            "다음 항공편 체크인을 하고 싶습니다."
        ],
        "usage_ko": "check in은 항공편 탑승 수속을 할 때 써요.",
        "title": "I'd like to check in for my flight to + 명사",
        "examples": [
            "I'd like to check in for my flight to New York.",
            "I'd like to check in for my flight to Paris.",
            "I'd like to check in for the next flight."
        ]
    },
    {
        "num": 134,
        "examples_ko": [
            "요리 수업을 신청했어.",
            "미리 신청해야 하나요?",
            "온라인으로 신청할 수 있어요."
        ],
        "usage_ko": "sign up은 수업이나 활동을 신청할 때 써요.",
        "title": "Sign up for + 활동 (신청하다 / 등록하다).",
        "examples": [
            "I signed up for a cooking class.",
            "Do I need to sign up in advance?",
            "You can sign up online."
        ]
    },
    {
        "num": 135,
        "examples_ko": [
            "수리 진행 상황은 계속 알려 드릴게요.",
            "도착 시간이 바뀌면 계속 알려 줄게.",
            "집주인에게 답을 받는 대로 계속 알려 줄게."
        ],
        "usage_ko": "keep posted는 진행 상황을 계속 알려 줘요.",
        "title": "I'll keep you posted.",
        "examples": [
            "I'll keep you posted on the repair.",
            "I'll keep you posted if my arrival time changes.",
            "I'll keep you posted once I hear back from the landlord."
        ]
    },
    {
        "num": 136,
        "examples_ko": [
            "떠나시기 전에 이 양식을 작성해 주세요.",
            "신청서를 온라인으로 작성했어.",
            "이거 작성하는 것 좀 도와주시겠어요?"
        ],
        "usage_ko": "fill out은 양식의 빈칸을 작성할 때 써요.",
        "title": "Fill out + 양식 (양식을 작성하다).",
        "examples": [
            "Please fill out this form before you leave.",
            "I filled out the application online.",
            "Could you help me fill this out?"
        ]
    },
    {
        "num": 137,
        "examples_ko": [
            "직장에서 더 가까운 곳을 구할 수 있기를 바라고 있어.",
            "이번 주로 예약을 잡을 수 있기를 바라고 있어요.",
            "이번 여름 여행에 필요한 돈을 충분히 모으길 바라고 있어."
        ],
        "usage_ko": "hoping to는 이루고 싶은 바람을 말해요.",
        "title": "I'm hoping to + 동사원형.",
        "examples": [
            "I'm hoping to find a place closer to work.",
            "I'm hoping to get an appointment this week.",
            "I'm hoping to save enough for a trip this summer."
        ]
    },
    {
        "num": 138,
        "examples_ko": [
            "제 계정에 로그인할 수 없어요.",
            "로그인해서 메시지를 확인해.",
            "이메일 주소로 로그인해 봐."
        ],
        "usage_ko": "log in은 계정에 접속할 때 써요.",
        "title": "Log in (로그인하다).",
        "examples": [
            "I can't log in to my account.",
            "Log in and check your messages.",
            "Try logging in with your email address."
        ]
    },
    {
        "num": 139,
        "examples_ko": [
            "일정을 확인한 뒤에 다시 답해 드릴게요.",
            "가격에 대해서는 다시 답해 드릴게요.",
            "내일 아침까지 다시 답해 드릴게요."
        ],
        "usage_ko": "get back은 확인한 뒤 답하겠다는 말이에요.",
        "title": "Let me get back to you.",
        "examples": [
            "Let me get back to you after I check my schedule.",
            "Let me get back to you about the price.",
            "Let me get back to you by tomorrow morning."
        ]
    },
    {
        "num": 140,
        "examples_ko": [
            "비 때문에 그들은 경기를 취소했어.",
            "오늘 밤 저녁 약속을 취소해야 할지도 몰라.",
            "막판에 취소하기는 정말 싫어."
        ],
        "usage_ko": "call off는 예정된 행사를 취소할 때 써요.",
        "title": "Call off + 약속/행사 (취소하다).",
        "examples": [
            "They called off the game because of the rain.",
            "We may have to call off dinner tonight.",
            "I hate to call it off at the last minute."
        ]
    },
    {
        "num": 141,
        "examples_ko": [
            "2시에서 4시 사이에 기사님을 만나기로 되어 있어요.",
            "금요일까지 이 양식을 제출하도록 되어 있어요.",
            "이 약은 음식과 함께 먹도록 되어 있어요."
        ],
        "usage_ko": "supposed to는 정해진 약속이나 의무예요.",
        "title": "I'm supposed to + 동사원형.",
        "examples": [
            "I'm supposed to meet the technician between two and four.",
            "I'm supposed to submit this form by Friday.",
            "I'm supposed to take this medicine with food."
        ]
    },
    {
        "num": 142,
        "examples_ko": [
            "통로 쪽 좌석으로 주실 수 있나요?",
            "창가 쪽 좌석으로 주실 수 있나요?",
            "앞쪽에 가까운 좌석으로 주실 수 있나요?"
        ],
        "usage_ko": "aisle은 비행기 통로 쪽 좌석을 말해요.",
        "title": "Can I get a window/aisle seat?",
        "examples": [
            "Can I get an aisle seat, please?",
            "Can I get a window seat, please?",
            "Can I get a seat near the front?"
        ]
    },
    {
        "num": 143,
        "examples_ko": [
            "예약 시간을 바꿀 수 있을지 알아볼게요.",
            "제 근무를 대신해 줄 사람을 찾을 수 있을지 알아볼게요.",
            "6시 전에 도착할 수 있을지 알아볼게요."
        ],
        "usage_ko": "see if는 가능한지 알아보겠다는 말이에요.",
        "title": "I'll see if I can + 동사원형.",
        "examples": [
            "I'll see if I can move the appointment.",
            "I'll see if I can find someone to cover my shift.",
            "I'll see if I can get there before six."
        ]
    },
    {
        "num": 144,
        "examples_ko": [
            "나는 요리하려고 했는데 우리는 대신 포장 음식을 주문했어.",
            "너에게 전화하려고 했는데 시간이 너무 늦어졌어.",
            "버스를 타려고 했는데 비가 오기 시작했어."
        ],
        "usage_ko": "going to는 하려다가 바뀐 계획을 말해요.",
        "title": "I was going to + 동사원형, but ...",
        "examples": [
            "I was going to cook, but we ordered takeout instead.",
            "I was going to call you, but it got too late.",
            "I was going to take the bus, but it started raining."
        ]
    },
    {
        "num": 145,
        "examples_ko": [
            "계산을 나눠서 하는 게 합리적일까요?",
            "가기 전에 전화하는 게 합리적일까요?",
            "예약된 만남을 온라인으로 바꾸는 게 합리적일까요?"
        ],
        "usage_ko": "make sense는 합리적인 방법인지 물어요.",
        "title": "Would it make sense to + 동사원형?",
        "examples": [
            "Would it make sense to split the bill?",
            "Would it make sense to call before we go?",
            "Would it make sense to move the appointment online?"
        ]
    },
    {
        "num": 146,
        "examples_ko": [
            "기차 운행이 취소돼서 결국 택시를 타게 됐어.",
            "결국 더 작은 것을 사게 됐어.",
            "몸이 좋지 않아서 결국 집에 머물게 됐어."
        ],
        "usage_ko": "ended up은 결국 하게 된 일을 말해요.",
        "title": "I ended up + -ing.",
        "examples": [
            "I ended up taking a taxi because the train was canceled.",
            "I ended up buying the smaller one.",
            "I ended up staying home because I wasn't feeling well."
        ]
    },
    {
        "num": 147,
        "examples_ko": [
            "너를 실망시키고 싶지 않아.",
            "그 영화는 나를 정말 실망시켰어.",
            "팀을 실망시켜서 미안해."
        ],
        "usage_ko": "let down은 기대를 저버려 실망시켜요.",
        "title": "Let + 사람 + down (실망시키다).",
        "examples": [
            "I don't want to let you down.",
            "The movie really let me down.",
            "I'm sorry I let the team down."
        ]
    },
    {
        "num": 148,
        "examples_ko": [
            "김민우라는 이름으로 예약되어 있어요.",
            "제 회사 이름으로 예약되어 있어요.",
            "존 스미스라는 이름으로 예약되어 있어요."
        ],
        "usage_ko": "under는 누구의 이름으로 예약했는지 말해요.",
        "title": "I have a reservation under + [이름]",
        "examples": [
            "I have a reservation under the name Minwoo Kim.",
            "I have a reservation under my company's name.",
            "I have a reservation under John Smith."
        ]
    },
    {
        "num": 149,
        "examples_ko": [
            "전에는 바닷가 근처에 살았어.",
            "전에는 매일 이 길로 출근했어.",
            "전에는 영어로 말하는 게 긴장됐어."
        ],
        "usage_ko": "used to는 지금은 아닌 과거의 상태예요.",
        "title": "I used to + 동사원형.",
        "examples": [
            "I used to live near the beach.",
            "I used to take this route to work every day.",
            "I used to be nervous about speaking English."
        ]
    },
    {
        "num": 150,
        "examples_ko": [
            "대신 역에서 만나면 어떨까?",
            "금요일까지 소포가 도착하지 않으면 어떡하지?",
            "더 이른 버스를 타면 어떨까?"
        ],
        "usage_ko": "what if는 다른 방법을 제안할 때 써요.",
        "title": "What if + 문장?",
        "examples": [
            "What if we meet at the station instead?",
            "What if the package doesn't arrive by Friday?",
            "What if we take the earlier bus?"
        ]
    },
    {
        "num": 151,
        "examples_ko": [
            "새 아파트를 계속 찾아보고 있어.",
            "최근 계속 잠을 자는 데 어려움을 겪고 있어.",
            "전부터 너에게 그것에 대해 물어보려고 했어."
        ],
        "usage_ko": "been -ing는 전부터 계속한 일을 말해요.",
        "title": "I've been + -ing.",
        "examples": [
            "I've been looking for a new apartment.",
            "I've been having trouble sleeping lately.",
            "I've been meaning to ask you about that."
        ]
    },
    {
        "num": 152,
        "examples_ko": [
            "6시에 만나는 건 어때?",
            "저녁으로 피자 어때?",
            "먼저 좀 쉬는 건 어때?"
        ],
        "usage_ko": "how about은 함께 할 일을 제안해요.",
        "title": "How about + 명사 / -ing?",
        "examples": [
            "How about meeting at six?",
            "How about pizza for dinner?",
            "How about taking a break first?"
        ]
    },
    {
        "num": 153,
        "examples_ko": [
            "조금 더 일찍 만나는 것도 고려해 보시겠어요?",
            "인터넷 요금을 나눠 내는 것도 고려해 보시겠어요?",
            "다른 납부 방식을 시도하는 것도 고려해 보시겠어요?"
        ],
        "usage_ko": "open to는 제안을 받아들일 의향을 물어요.",
        "title": "Would you be open to + -ing?",
        "examples": [
            "Would you be open to meeting a little earlier?",
            "Would you be open to sharing the internet bill?",
            "Would you be open to trying a different payment plan?"
        ]
    },
    {
        "num": 154,
        "examples_ko": [
            "지난번에 이 버스를 탔을 때는 연착됐어.",
            "지난번에 그곳에서 주문했을 때는 배송이 빨랐어.",
            "지난번에 이사했을 때는 이사 업체를 고용했어."
        ],
        "usage_ko": "last time은 지난번의 경험을 꺼낼 때 써요.",
        "title": "The last time I + 과거동사, ...",
        "examples": [
            "The last time I took this bus, it was delayed.",
            "The last time I ordered from them, the delivery was fast.",
            "The last time I moved, I hired a moving company."
        ]
    },
    {
        "num": 155,
        "examples_ko": [
            "아직 이메일을 받지 못했어.",
            "아직 그 식당 음식은 먹어 보지 않았어.",
            "아직 신청서를 다 작성하지 못했어."
        ],
        "usage_ko": "yet은 기대한 일이 아직 안 끝났단 뜻이에요.",
        "title": "I haven't + 과거분사 + yet.",
        "examples": [
            "I haven't received the email yet.",
            "I haven't tried that restaurant yet.",
            "I haven't finished the application yet."
        ]
    },
    {
        "num": 156,
        "examples_ko": [
            "입주 날짜는 어느 정도 조정이 가능한가요?",
            "월세는 어느 정도 조정이 가능한가요?",
            "예약 시간은 어느 정도 조정이 가능한가요?"
        ],
        "usage_ko": "flexibility는 일정 조정의 여지를 물어요.",
        "title": "Is there any flexibility on + 명사?",
        "examples": [
            "Is there any flexibility on the move-in date?",
            "Is there any flexibility on the monthly rent?",
            "Is there any flexibility on the appointment time?"
        ]
    },
    {
        "num": 157,
        "examples_ko": [
            "방금 집에 도착했어.",
            "방금 건물 관리인과 이야기했어.",
            "방금 너에게 대금을 보냈어."
        ],
        "usage_ko": "just는 방금 끝낸 일을 말할 때 써요.",
        "title": "I just + 과거동사.",
        "examples": [
            "I just got home.",
            "I just spoke with the building manager.",
            "I just sent you the payment."
        ]
    },
    {
        "num": 158,
        "examples_ko": [
            "요금은 이미 냈어.",
            "의사 선생님께 이미 전화했어.",
            "이미 공유기를 재시작해 봤어."
        ],
        "usage_ko": "already는 벌써 끝낸 일을 말해요.",
        "title": "I've already + 과거분사.",
        "examples": [
            "I've already paid the bill.",
            "I've already called the doctor.",
            "I've already tried restarting the router."
        ]
    },
    {
        "num": 159,
        "examples_ko": [
            "따뜻한 것을 좀 먹고 싶어.",
            "저녁 먹고 산책하고 싶어.",
            "오늘 밤에는 별로 영화를 보고 싶지 않아."
        ],
        "usage_ko": "feel like는 지금 하고 싶은 일을 말해요.",
        "title": "I feel like + -ing / 명사.",
        "examples": [
            "I feel like getting something warm to eat.",
            "I feel like a walk after dinner.",
            "I don't really feel like watching a movie tonight."
        ]
    },
    {
        "num": 160,
        "examples_ko": [
            "네 말의 요지는 알겠어. 특히 비용에 관한 부분 말이야.",
            "네 말의 요지는 알겠지만 그래도 우리가 먼저 물어봐야 한다고 생각해.",
            "시간이 더 필요하다는 네 말의 요지는 알겠어."
        ],
        "usage_ko": "point는 상대 의견의 요점을 이해했단 말이에요.",
        "title": "I see your point.",
        "examples": [
            "I see your point, especially about the cost.",
            "I see your point, but I still think we should ask first.",
            "I see your point about needing more time."
        ]
    },
    {
        "num": 161,
        "examples_ko": [
            "새로운 곳을 보게 돼서 기대돼.",
            "긴 연휴가 기대돼.",
            "모두를 만나게 될 게 기대돼."
        ],
        "usage_ko": "forward to는 앞으로 할 일을 기대해요.",
        "title": "I'm looking forward to + 명사 / -ing.",
        "examples": [
            "I'm looking forward to seeing the new place.",
            "I'm looking forward to the long weekend.",
            "I'm looking forward to meeting everyone."
        ]
    },
    {
        "num": 162,
        "examples_ko": [
            "네가 무사히 집에 도착해서 다행이야.",
            "오늘 의사 선생님이 너를 진료할 수 있었다니 다행이야.",
            "우리가 그 일을 명확히 정리해서 다행이야."
        ],
        "usage_ko": "glad는 다행이고 기쁘다는 마음이에요.",
        "title": "I'm glad (that) + 문장.",
        "examples": [
            "I'm glad you made it home safely.",
            "I'm glad the doctor could see you today.",
            "I'm glad we cleared that up."
        ]
    },
    {
        "num": 163,
        "examples_ko": [
            "몸이 안 좋으시다니 안타까워요.",
            "항공편이 취소됐다니 안타까워요.",
            "아파트에 문제가 있다는 소식을 들으니 안타까워요."
        ],
        "usage_ko": "sorry to hear는 안타까운 소식에 공감해요.",
        "title": "I'm sorry to hear (that) + 문장.",
        "examples": [
            "I'm sorry to hear that you're not feeling well.",
            "I'm sorry to hear that your flight was canceled.",
            "I'm sorry to hear about the problem with your apartment."
        ]
    },
    {
        "num": 164,
        "examples_ko": [
            "분명 답답하시겠어요.",
            "너에게는 분명 신나는 일이겠네.",
            "그걸 감당하기는 분명 힘들겠네."
        ],
        "usage_ko": "must는 상대가 그럴 거라 생각하며 공감해요.",
        "title": "That must be + 형용사.",
        "examples": [
            "That must be frustrating.",
            "That must be exciting for you.",
            "That must be hard to deal with."
        ]
    },
    {
        "num": 165,
        "examples_ko": [
            "네가 왜 이 동네를 좋아하는지 이해가 돼.",
            "그 규칙이 왜 헷갈리는지 이해가 돼.",
            "네가 왜 기다리고 싶어 하는지 이해가 돼."
        ],
        "usage_ko": "see why는 상대가 그러는 이유를 이해해요.",
        "title": "I can see why + 문장.",
        "examples": [
            "I can see why you like this neighborhood.",
            "I can see why that rule is confusing.",
            "I can see why you want to wait."
        ]
    },
    {
        "num": 166,
        "examples_ko": [
            "커피 얘기가 나와서 말인데, 근처에 괜찮은 곳 알아?",
            "주말 얘기가 나와서 말인데, 토요일에 무슨 일정 있어?",
            "집주인 얘기가 나와서 말인데, 너에게 다시 전화했어?"
        ],
        "usage_ko": "speaking of는 관련된 화제로 옮길 때 써요.",
        "title": "Speaking of + 명사 / -ing, ...",
        "examples": [
            "Speaking of coffee, do you know a good place nearby?",
            "Speaking of weekends, are you doing anything on Saturday?",
            "Speaking of the landlord, did they call you back?"
        ]
    },
    {
        "num": 167,
        "examples_ko": [
            "네 말을 끊으려던 건 아니었어.",
            "무례하게 들리게 하려던 건 아니었어.",
            "그 메시지를 모두에게 보내려던 건 아니었어."
        ],
        "usage_ko": "didn't mean은 그럴 의도가 아니었단 말이에요.",
        "title": "I didn't mean to + 동사원형.",
        "examples": [
            "I didn't mean to interrupt you.",
            "I didn't mean to sound rude.",
            "I didn't mean to send that message to everyone."
        ]
    },
    {
        "num": 168,
        "examples_ko": [
            "불평하려는 건 아닌데 방이 아주 추워요.",
            "재촉하려는 건 아닌데 곧 나가야 해요.",
            "까다롭게 굴려는 건 아닌데 다시 확인해 주시겠어요?"
        ],
        "usage_ko": "don't mean은 불만을 말하기 전 뜻을 완화해요.",
        "title": "I don't mean to + 동사원형, but ...",
        "examples": [
            "I don't mean to complain, but the room is very cold.",
            "I don't mean to rush you, but I need to leave soon.",
            "I don't mean to be difficult, but could you check that again?"
        ]
    },
    {
        "num": 169,
        "examples_ko": [
            "요즘 뭐 하며 지냈어?",
            "여기로 이사 온 뒤로 뭐 하며 지냈어?",
            "안녕, 이번 주말에는 뭐 하며 지냈어?"
        ],
        "usage_ko": "up to는 요즘 어떻게 지내는지 물어요.",
        "title": "What have you been up to?",
        "examples": [
            "What have you been up to lately?",
            "What have you been up to since you moved here?",
            "Hey, what have you been up to this weekend?"
        ]
    },
    {
        "num": 170,
        "examples_ko": [
            "여쭤봐도 괜찮다면 월세가 얼마인가요?",
            "여쭤봐도 괜찮다면 어느 인터넷 업체를 이용하시나요?",
            "여쭤봐도 괜찮다면 이 지역은 보통 밤에 조용한가요?"
        ],
        "usage_ko": "don't mind는 질문에 앞서 양해를 구해요.",
        "title": "If you don't mind me asking, + 질문",
        "examples": [
            "If you don't mind me asking, how much is the monthly rent?",
            "If you don't mind me asking, which internet provider do you use?",
            "If you don't mind me asking, is this area usually quiet at night?"
        ]
    },
    {
        "num": 171,
        "examples_ko": [
            "취업 면접은 어떻게 됐어?",
            "진료는 어떻게 됐어?",
            "이사는 어떻게 됐어?"
        ],
        "usage_ko": "go는 면접 같은 일이 어떻게 됐는지 물어요.",
        "title": "How did + 일/행사 + go?",
        "examples": [
            "How did your job interview go?",
            "How did the doctor's appointment go?",
            "How did your move go?"
        ]
    },
    {
        "num": 172,
        "examples_ko": [
            "영수증을 보내 주시면 감사하겠습니다.",
            "제 번호를 공유하지 않아 주시면 감사하겠습니다.",
            "이번 주에 수리를 끝낼 수 있다면 감사하겠습니다."
        ],
        "usage_ko": "appreciate는 감사의 뜻을 담아 부탁해요.",
        "title": "I'd appreciate it if + 문장.",
        "examples": [
            "I'd appreciate it if you could send me the receipt.",
            "I'd appreciate it if you didn't share my number.",
            "I'd appreciate it if the repair could be done this week."
        ]
    },
    {
        "num": 173,
        "examples_ko": [
            "그 동네는 어땠어?",
            "직장에서의 첫날은 어땠어?",
            "거기서 사는 건 어땠어?"
        ],
        "usage_ko": "like는 장소가 어떤 느낌이었는지 물어요.",
        "title": "What was + it/that + like?",
        "examples": [
            "What was the neighborhood like?",
            "What was your first day at work like?",
            "What was it like living there?"
        ]
    },
    {
        "num": 174,
        "examples_ko": [
            "대신 기차를 타는 것에 대해 어떻게 생각해?",
            "이 동네에 대해 어떻게 생각해?",
            "중간 지점에서 만나는 것에 대해 어떻게 생각해?"
        ],
        "usage_ko": "think about은 제안에 대한 의견을 물어요.",
        "title": "What do you think about + 명사 / -ing?",
        "examples": [
            "What do you think about taking the train instead?",
            "What do you think about this neighborhood?",
            "What do you think about meeting halfway?"
        ]
    },
    {
        "num": 175,
        "examples_ko": [
            "혹시 이번 주말에 빈방이 있는지 궁금해서요.",
            "혹시 제 예약을 변경할 수 있을지 궁금해서요.",
            "혹시 그 수수료를 면제받을 수 있을지 궁금해서요."
        ],
        "usage_ko": "wondering if는 궁금한 점을 공손히 물어요.",
        "title": "I was wondering if + 문장.",
        "examples": [
            "I was wondering if you have any rooms available this weekend.",
            "I was wondering if I could change my appointment.",
            "I was wondering if the fee can be waived."
        ]
    },
    {
        "num": 176,
        "examples_ko": [
            "제 청구서에 문제가 있는 것 같아요.",
            "제 방 난방에 문제가 있는 것 같아요.",
            "결제 단말기에 문제가 있는 것 같아요."
        ],
        "usage_ko": "seems는 문제가 있다고 조심스레 말해요.",
        "title": "There seems to be a problem with + 명사.",
        "examples": [
            "There seems to be a problem with my bill.",
            "There seems to be a problem with the heating in my room.",
            "There seems to be a problem with the payment terminal."
        ]
    },
    {
        "num": 177,
        "examples_ko": [
            "혹시 가장 가까운 우체국이 어디 있는지 아세요?",
            "혹시 이 버스가 시청에 정차하는지 아세요?",
            "혹시 소음 문제는 누구에게 연락해야 하는지 아세요?"
        ],
        "usage_ko": "happen to know는 혹시 아는지 물어요.",
        "title": "Do you happen to know + 의문사절?",
        "examples": [
            "Do you happen to know where the nearest post office is?",
            "Do you happen to know if this bus stops at City Hall?",
            "Do you happen to know who I should contact about the noise?"
        ]
    },
    {
        "num": 178,
        "examples_ko": [
            "제 계정에 로그인하는 데 어려움을 겪고 있어요.",
            "세탁기 때문에 어려움을 겪고 있어요.",
            "이 양식을 이해하는 데 어려움을 겪고 있어요."
        ],
        "usage_ko": "trouble은 어떤 일을 하는 데 겪는 어려움이에요.",
        "title": "I'm having trouble + -ing / with + 명사.",
        "examples": [
            "I'm having trouble logging into my account.",
            "I'm having trouble with the washing machine.",
            "I'm having trouble understanding this form."
        ]
    },
    {
        "num": 179,
        "examples_ko": [
            "문이 도무지 잠기지 않아요.",
            "휴대폰이 도무지 와이파이에 연결되지 않아요.",
            "기계가 도무지 제 카드를 받아들이지 않아요."
        ],
        "usage_ko": "won't는 해 보아도 작동하지 않는단 뜻이에요.",
        "title": "It won't + 동사원형.",
        "examples": [
            "The door won't lock.",
            "My phone won't connect to the Wi-Fi.",
            "The machine won't take my card."
        ]
    },
    {
        "num": 180,
        "examples_ko": [
            "가게가 9시에 문을 닫는 줄 알았는데 8시에 닫네요.",
            "이미 돈을 낸 줄 알았는데 제가 잘못 알았어요.",
            "이게 급행버스인 줄 알았는데 아니네요."
        ],
        "usage_ko": "thought는 전에 잘못 알고 있던 내용을 말해요.",
        "title": "I thought + 과거동사, but ...",
        "examples": [
            "I thought the store closed at nine, but it closes at eight.",
            "I thought I had already paid, but I was wrong.",
            "I thought this was the express bus, but it isn't."
        ]
    },
    {
        "num": 181,
        "examples_ko": [
            "앱이 자꾸 비정상 종료돼요.",
            "연기 감지기가 자꾸 삐 소리를 내요.",
            "이웃집 개가 밤에 계속 짖어요."
        ],
        "usage_ko": "keeps는 문제가 계속 반복된다는 뜻이에요.",
        "title": "It keeps + -ing.",
        "examples": [
            "The app keeps crashing.",
            "The smoke alarm keeps beeping.",
            "My neighbor's dog keeps barking at night."
        ]
    },
    {
        "num": 182,
        "examples_ko": [
            "주차비가 별도인 줄 몰랐어요.",
            "도서관이 월요일에 문을 닫는 줄 몰랐어요.",
            "예약을 해야 하는 줄 몰랐어요."
        ],
        "usage_ko": "realize는 모르던 사실을 뒤늦게 알았어요.",
        "title": "I didn't realize (that) + 문장.",
        "examples": [
            "I didn't realize that parking costs extra.",
            "I didn't realize the library was closed on Mondays.",
            "I didn't realize I needed to make a reservation."
        ]
    },
    {
        "num": 183,
        "examples_ko": [
            "어디에 주차했는지 기억이 안 나.",
            "문을 잠갔는지 기억이 안 나.",
            "복용량에 대해 의사 선생님이 뭐라고 하셨는지 기억이 안 나."
        ],
        "usage_ko": "remember는 떠오르지 않는 기억을 말해요.",
        "title": "I can't remember + 의문사절 / if절.",
        "examples": [
            "I can't remember where I parked.",
            "I can't remember if I locked the door.",
            "I can't remember what the doctor said about the dosage."
        ]
    },
    {
        "num": 184,
        "examples_ko": [
            "안타깝지만 그 상품은 품절이에요.",
            "안타깝지만 오늘 밤에는 참석할 수 없겠어요.",
            "안타깝지만 다음 예약은 목요일에나 있어요."
        ],
        "usage_ko": "afraid는 안 좋은 소식을 공손히 전해요.",
        "title": "I'm afraid + 문장.",
        "examples": [
            "I'm afraid the item is out of stock.",
            "I'm afraid I won't be able to make it tonight.",
            "I'm afraid the next appointment isn't until Thursday."
        ]
    },
    {
        "num": 185,
        "examples_ko": [
            "내 열쇠가 어디 있는지 전혀 모르겠어.",
            "결제가 왜 실패했는지 전혀 모르겠어.",
            "이 기계가 어떻게 작동하는지 전혀 모르겠어."
        ],
        "usage_ko": "no idea는 전혀 모르겠다는 뜻이에요.",
        "title": "I have no idea + 의문사절.",
        "examples": [
            "I have no idea where my keys are.",
            "I have no idea why the payment failed.",
            "I have no idea how this machine works."
        ]
    },
    {
        "num": 186,
        "examples_ko": [
            "여기가 맞는 승강장이라는 건 거의 확실해.",
            "집세 납부일이 1일이라는 건 거의 확실해.",
            "카페에 우산을 두고 왔다는 건 거의 확실해."
        ],
        "usage_ko": "pretty sure는 꽤 확신하지만 단정은 안 해요.",
        "title": "I'm pretty sure (that) + 문장.",
        "examples": [
            "I'm pretty sure this is the right platform.",
            "I'm pretty sure the rent is due on the first.",
            "I'm pretty sure I left my umbrella at the café."
        ]
    },
    {
        "num": 187,
        "examples_ko": [
            "정말 그러고 싶지만 오늘 밤에는 이미 약속이 있어.",
            "정말 도와주고 싶지만 이번 주말에는 일해야 해.",
            "정말 함께하고 싶지만 몸이 좋지 않아."
        ],
        "usage_ko": "love to는 원하지만 못 한다며 거절해요.",
        "title": "I'd love to, but + 문장.",
        "examples": [
            "I'd love to, but I already have plans tonight.",
            "I'd love to help, but I have to work this weekend.",
            "I'd love to join you, but I'm not feeling well."
        ]
    },
    {
        "num": 188,
        "examples_ko": [
            "택시에 지갑을 두고 왔을지도 몰라.",
            "비밀번호를 잘못 입력했을지도 몰라.",
            "버스를 잘못 탔을지도 몰라."
        ],
        "usage_ko": "may have는 과거에 그랬을 가능성이에요.",
        "title": "I may have + 과거분사.",
        "examples": [
            "I may have left my wallet in the taxi.",
            "I may have typed the wrong password.",
            "I may have taken the wrong bus."
        ]
    },
    {
        "num": 189,
        "examples_ko": [
            "몇 분 늦을지도 몰라.",
            "다음 학기에 수업을 하나 들을지도 몰라.",
            "비가 계속 오면 집에 머물지도 몰라."
        ],
        "usage_ko": "might는 앞으로 그럴 수도 있다는 말이에요.",
        "title": "I might + 동사원형.",
        "examples": [
            "I might be a few minutes late.",
            "I might take a class next semester.",
            "I might stay home if it keeps raining."
        ]
    },
    {
        "num": 190,
        "examples_ko": [
            "내 은행 계좌 정보를 알려 주는 건 마음이 편치 않아.",
            "누군가 예고 없이 내 방에 들어오는 건 마음이 편치 않아.",
            "더 자세한 정보 없이 여기에 서명하는 건 마음이 편치 않아."
        ],
        "usage_ko": "not comfortable은 꺼리는 행동을 말해요.",
        "title": "I don't feel comfortable + -ing / with ...",
        "examples": [
            "I don't feel comfortable sharing my bank details.",
            "I don't feel comfortable with someone entering my room without notice.",
            "I don't feel comfortable signing this without more information."
        ]
    }
];
