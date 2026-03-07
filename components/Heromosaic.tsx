"use client"

import { projects } from "./projects"

const images = projects.map((p) => p.image)

// ── Ajusta estos valores para cambiar el tono del mosaico ──
const TINT_COLOR = "rgba(5, 31, 73, 0.35)"  // azul — cambia este color a gusto
const BRIGHTNESS = 0.42
const SATURATION = 0                           // 0 = blanco/negro, 1 = color original

// 8 columns × 7 rows = 56 tiles — small and dense
const COLS = 8
const ROWS = 7
const COL_W = 13
const ROW_H = 17
const GAP_X = 0.8
const GAP_Y = 0.8
const OFFSET_Y = 9

const rots = Array.from({ length: COLS * ROWS }, (_, i) => {
  const pattern = [-1.5, 1, -2, 1.5, -1, 2, -1.5, 1]
  return pattern[i % pattern.length]
})

const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const isOdd = col % 2 === 1
  return {
    img: i % images.length,
    left: col * (COL_W + GAP_X) - 2,
    top: row * (ROW_H + GAP_Y) - 5 + (isOdd ? OFFSET_Y : 0),
    w: COL_W,
    h: ROW_H,
    rot: rots[i] ?? 0,
    z: (row + col) % 3 + 1,
  }
})

export function HeroMosaic() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden">
      {/* Global tilt container, scaled up to avoid edge gaps */}
      <div
        className="absolute"
        style={{
          inset: "-20%",
          transform: "rotate(-6deg)",
          transformOrigin: "center center",
        }}
      >
        {tiles.map((tile, i) => (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              top: `${tile.top}%`,
              left: `${tile.left}%`,
              width: `${tile.w}%`,
              height: `${tile.h}%`,
              transform: `rotate(${tile.rot}deg)`,
              borderRadius: "12px",
              zIndex: tile.z,
              boxShadow: "0 6px 28px rgba(0,0,0,0.6)",
            }}
          >
            <img
              src={images[tile.img]}
              alt=""
              aria-hidden
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{
                filter: `grayscale(${(1 - SATURATION) * 100}%) brightness(${BRIGHTNESS}) contrast(1.1)`,
              }}
            />
            {/* Color tint overlay — change TINT_COLOR above */}
            <div
              className="absolute inset-0"
              style={{
                background: TINT_COLOR,
                mixBlendMode: "color",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}