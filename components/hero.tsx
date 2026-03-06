"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Youtube } from "lucide-react"
import { LaserFlow } from "./laser-flow"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* LaserFlow WebGL Background */}
      <div className="absolute inset-0 z-0">
        <LaserFlow
          color="#7abaff"
          wispDensity={0.9}
          flowSpeed={0.1}
          verticalSizing={3}
          horizontalSizing={0.5}
          fogIntensity={0.45}
          fogScale={0.1}
          wispSpeed={15}
          wispIntensity={5.7}
          flowStrength={0.15}
          decay={6}
          horizontalBeamOffset={0}
          verticalBeamOffset={-0.5}
        />
      </div>

      {/* Top fade for navbar blending */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[1] h-32 bg-gradient-to-b from-background/80 to-transparent" />

      {/* Bottom fade for section blending */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-32 sm:h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{
            textShadow:
              "0 0 60px oklch(0.07 0 0 / 0.8), 0 2px 8px oklch(0.07 0 0 / 0.6)",
          }}
        >
          Axel Ramos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-md sm:max-w-xl text-cyan-50 text-pretty text-base sm:text-lg md:text-xl"
        >
          Full Stack Developer building scalable systems and modern web
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            View Projects
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>

          <a
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-background/70"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-10 flex items-center gap-3"
      >
        {[
          { icon: Github, href: "https://github.com", label: "GitHub" },
          { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
          { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
          { icon: Youtube, href: "https://twitter.com", label: "Twitter" },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="rounded-full border border-border/50 bg-background/40 p-3 text-muted-foreground backdrop-blur-md transition-all hover:border-accent/50 hover:text-foreground hover:shadow-lg hover:shadow-accent/10"
          >
            <social.icon size={18} />
          </a>
        ))}
      </motion.div>
    </section>
  )
}