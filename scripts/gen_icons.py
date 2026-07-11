# -*- coding: utf-8 -*-
"""PWA 아이콘(단색 PNG) 생성 - 외부 라이브러리 불필요"""
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "web"


def make_png(size, rgb):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c))

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)
    row = b"\x00" + bytes(rgb) * size
    idat = zlib.compress(row * size)
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", idat) + chunk(b"IEND", b""))


for s in (192, 512):
    (ROOT / f"icon-{s}.png").write_bytes(make_png(s, (79, 110, 247)))
    print(f"icon-{s}.png OK")
