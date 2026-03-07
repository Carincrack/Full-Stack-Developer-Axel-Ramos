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