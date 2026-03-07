"use client"

import { Github, Linkedin, Mail, Youtube } from "lucide-react"
import LaserFlow from "./laser-flow"

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 py-10 overflow-hidden">

      {/* LaserFlow limitado */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-32 -translate-y-1/2 opacity-80 z-0">
        <LaserFlow
          color="#7abaff"
          wispDensity={0.6}
          flowSpeed={0.08}
          verticalSizing={1.5}
          horizontalSizing={1}
          fogIntensity={0.1}
          fogScale={3}
          wispSpeed={10}
          wispIntensity={4}
          flowStrength={0.12}
          decay={5}
          horizontalBeamOffset={-0.2}
          verticalBeamOffset={0}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          {"Designed & built by "}
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