# -*- coding: utf-8 -*-
"""PWA 아이콘 생성 - 브랜드 컬러 배경 + 마이크 글리프"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "web"

BG = (79, 110, 247)      # #4f6ef7 (앱 강조색)
FG = (255, 255, 255)     # 흰색 마이크
SIZE = 512


def draw_icon():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 배경: 둥근 사각형
    d.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=110, fill=BG)

    cx = SIZE // 2
    lw = 16

    # 마이크 머리 (캡슐)
    cap_w, cap_h, cap_top = 110, 170, 118
    cap_box = [cx - cap_w // 2, cap_top, cx + cap_w // 2, cap_top + cap_h]
    d.rounded_rectangle(cap_box, radius=cap_w // 2, fill=FG)

    # 마이크 스탠드 (아래쪽 반원 호)
    stand_r = 100
    stand_cy = 300
    stand_box = [cx - stand_r, stand_cy - stand_r, cx + stand_r, stand_cy + stand_r]
    d.arc(stand_box, start=0, end=180, fill=FG, width=lw)
    # 호 끝을 둥글게 마감
    d.ellipse([cx - stand_r - lw // 2, stand_cy - lw // 2, cx - stand_r + lw // 2, stand_cy + lw // 2], fill=FG)
    d.ellipse([cx + stand_r - lw // 2, stand_cy - lw // 2, cx + stand_r + lw // 2, stand_cy + lw // 2], fill=FG)

    # 스탠드 기둥
    pole_top, pole_bottom = stand_cy, 450
    d.line([cx, pole_top, cx, pole_bottom], fill=FG, width=lw)
    d.ellipse([cx - lw // 2, pole_bottom - lw // 2, cx + lw // 2, pole_bottom + lw // 2], fill=FG)

    # 받침대
    base_y = pole_bottom
    base_half = 56
    d.line([cx - base_half, base_y, cx + base_half, base_y], fill=FG, width=lw)
    d.ellipse([cx - base_half - lw // 2, base_y - lw // 2, cx - base_half + lw // 2, base_y + lw // 2], fill=FG)
    d.ellipse([cx + base_half - lw // 2, base_y - lw // 2, cx + base_half + lw // 2, base_y + lw // 2], fill=FG)

    return img


icon = draw_icon()
for s in (192, 512):
    resized = icon.resize((s, s), Image.LANCZOS)
    resized.save(ROOT / f"icon-{s}.png")
    print(f"icon-{s}.png OK")
