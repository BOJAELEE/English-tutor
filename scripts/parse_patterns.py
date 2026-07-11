# -*- coding: utf-8 -*-
"""patterns_raw.txt -> web/patterns.js 변환 및 검증"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
raw = (ROOT / "data" / "patterns_raw.txt").read_text(encoding="utf-8")

# Unit 헤더 제거
raw = re.sub(r"Unit \d+:.*?(?=Pattern \d)", "", raw)

chunks = [c for c in re.split(r"(?=Pattern \d+)", raw) if c.strip()]
patterns = []
anomalies = []

for chunk in chunks:
    m = re.match(r"Pattern (\d+)(?: \((\d+)\))?:\s*(.*)", chunk, re.S)
    if not m:
        anomalies.append(f"헤더 매칭 실패: {chunk[:60]!r}")
        continue
    num = int(m.group(2)) if m.group(2) else int(m.group(1))
    body = m.group(3).strip()
    segments = [s.strip() for s in re.findall(r"[^.?!]+[.?!]", body)]

    if len(segments) == 4:
        title, examples = segments[0], segments[1:4]
    elif len(segments) == 3:
        parts = re.split(r"\s{2,}", segments[0], maxsplit=1)
        if len(parts) == 2:
            title, first = parts
            examples = [first.strip()] + segments[1:3]
        else:
            anomalies.append(f"#{num}: 제목/예문 분리 실패: {segments[0][:60]!r}")
            continue
    else:
        anomalies.append(f"#{num}: 문장 수 이상({len(segments)}개): {body[:60]!r}")
        continue
    patterns.append({"num": num, "title": title.strip(), "examples": examples})

patterns.sort(key=lambda p: p["num"])

# 검증
nums = [p["num"] for p in patterns]
ok = True
if len(patterns) != 200:
    print(f"FAIL: 패턴 수 {len(patterns)} != 200"); ok = False
if nums != list(range(1, 201)):
    missing = sorted(set(range(1, 201)) - set(nums))
    dupes = sorted({n for n in nums if nums.count(n) > 1})
    print(f"FAIL: 누락={missing} 중복={dupes}"); ok = False
for p in patterns:
    if len(p["examples"]) != 3:
        print(f"FAIL: #{p['num']} 예문 {len(p['examples'])}개"); ok = False
    if not p["title"]:
        print(f"FAIL: #{p['num']} 제목 없음"); ok = False
for a in anomalies:
    print("ANOMALY:", a); ok = False

if not ok:
    sys.exit(1)

out = ROOT / "web" / "patterns.js"
out.parent.mkdir(exist_ok=True)
js = "const PATTERNS = " + json.dumps(patterns, ensure_ascii=False, indent=1) + ";\n"
out.write_text(js, encoding="utf-8")
print(f"OK: 200 patterns, 50 days -> {out}")
print("샘플 #1:", json.dumps(patterns[0], ensure_ascii=False))
print("샘플 #120:", json.dumps(patterns[119], ensure_ascii=False))
print("샘플 #200:", json.dumps(patterns[199], ensure_ascii=False))
