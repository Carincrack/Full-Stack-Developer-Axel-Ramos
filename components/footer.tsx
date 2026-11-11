"use client"

import Grainient from "./Grainient"
import { socials } from "@/lib/site"

export function Footer() {
  return (
    <footer className="relative  py-10 overflow-hidden">

      {/* Top fade to blend with section above */}
      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      {/* Grainient background */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#0091df"
          color2="#005c84"
          color3="#006d9b"
          timeSpeed={0.4}
          colorBalance={-0.39}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          {"Diseñado y desarrollado por "}
          <span className="text-foreground">Axel Ramos Villegas</span>
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}