# -*- coding: utf-8 -*-
"""PWA 아이콘 생성 - 브랜드 컬러 배경 + 책 글리프 (책갈피 리본)"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "web"

BG = (79, 110, 247)      # #4f6ef7 (앱 강조색)
FG = (255, 255, 255)     # 흰색 책
SIZE = 512


def draw_icon():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 배경: 둥근 사각형
    d.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=110, fill=BG)

    # 책 표지
    book_box = [140, 120, 372, 392]
    d.rounded_rectangle(book_box, radius=22, fill=FG)

    # 책등(spine) 라인
    d.line([196, 132, 196, 380], fill=BG, width=8)

    # 페이지 텍스트 라인 (책갈피 영역 피해서 짧게)
    for y in (168, 200, 232, 264):
        d.line([222, y, 296, y], fill=BG, width=10)

    # 책갈피 리본 (오른쪽에서 내려오다 V자로 접힘)
    ribbon = [(314, 120), (352, 120), (352, 244), (333, 214), (314, 244)]
    d.polygon(ribbon, fill=BG)

    return img


icon = draw_icon()
for s in (192, 512):
    resized = icon.resize((s, s), Image.LANCZOS)
    resized.save(ROOT / f"icon-{s}.png")
    print(f"icon-{s}.png OK")
