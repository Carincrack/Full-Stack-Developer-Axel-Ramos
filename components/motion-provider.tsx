"use client"

import { MotionConfig } from "framer-motion"

// Respeta "reducir movimiento" del sistema: framer-motion quita desplazamientos y deja solo opacidad.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
