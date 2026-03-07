"use client"

const images = [
  "/resources/vivero.png",
  "/resources/Gym.png",
  "/resources/House.png",
  "/resources/azuliverde.png",
  "/resources/Hansen.png",
]

// 4 columns × 4 rows = 16 tiles
// Each column is offset vertically by ~half a tile to interleave
// Individual rotations are tiny (±2deg max) so it stays clean
const COLS = 4
const ROWS = 4
const COL_W = 26   // % width per tile
const ROW_H = 30   // % height per tile
const GAP_X = 2    // % horizontal gap
const GAP_Y = 2    // % vertical gap
const OFFSET_Y = 15 // % vertical offset for odd columns (interleave)

const rots = [-2, 1.5, -1, 2, 1, -1.5, 2, -2, 1, -1, 1.5, -2, 2, -1.5, 1, -1]

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
                filter: "grayscale(100%) brightness(0.42) contrast(1.1) sepia(15%) hue-rotate(190deg)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}