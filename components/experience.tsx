"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { SectionHeading } from "./section-heading"

const experiences = [
  {
    role: "Desarrollador full stack",
    company: "Sistema de gestión de recursos humanos — Proyecto final de ingeniería",
    period: "2026 - Actualidad",
    description:
      "Desarrollo un sistema full stack para el área de recursos humanos de una organización en Puntarenas: expedientes del personal, procesos internos y trámites administrativos.",
    tech: ["Vite", "React", "MySQL", "TypeORM"],
  },
  {
    role: "Desarrollador frontend",
    company: "Tienda de suplementos y fitness",
    period: "2024 - 2025",
    description:
      "Diseñé y desarrollé el sitio de una tienda de suplementos y fitness: adaptable a cualquier pantalla y fácil de usar desde el primer clic.",
    tech: ["Vite", "React", "TailwindCSS", "MySQL"],
  },
  {
    role: "Estudiante de Ingeniería en Sistemas de Información",
    company: "Estudios universitarios — Costa Rica",
    period: "2021 - Actualidad",
    description:
      "Curso la carrera mientras desarrollo proyectos propios y para clientes. Ahí reforcé algoritmos, sistemas backend y desarrollo web.",
    tech: ["C++", "C#", ".NET", "SQL Server", "HTML/CSS"],
  },
]
export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  })

  // Glow line grows top → bottom
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1])

  // Orb travels the full height of the line
  const orbY = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={sectionRef} id="experience" className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// experience"
          title="Trayectoria"
          description="Los proyectos y estudios que me han formado como desarrollador."
        />

        <div className="relative mx-auto max-w-3xl">

          {/* Base track — always visible, very dim */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-border via-border to-transparent md:left-1/2 md:-translate-x-px" />

          {/* Scroll-driven glow line */}
          <motion.div
            className="absolute left-[19px] top-0 w-px origin-top md:left-1/2 md:-translate-x-px"
            style={{
              scaleY: lineScaleY,
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, #38bdf8 15%, #7dd3fc 55%, #38bdf8 85%, transparent)",
              filter: "blur(0.6px)",
              boxShadow: "0 0 6px 1px #38bdf850",
            }}
          />

          {/* Travelling orb */}
          <motion.div
            className="pointer-events-none absolute left-[19px] z-10 md:left-1/2"
            style={{ top: 0, y: orbY, x: "-50%" }}
          >
            {/* Soft outer halo */}
            <div
              style={{
                position: "absolute",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "radial-gradient(circle, #38bdf840 0%, transparent 70%)",
                filter: "blur(6px)",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Bright core */}
            <div
              style={{
                position: "absolute",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#f0f9ff",
                boxShadow: "0 0 8px 3px #38bdf8, 0 0 20px 6px #38bdf845",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Cards — original structure preserved */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative mb-12 flex flex-col gap-4 pl-14 md:w-1/2 md:pl-0 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12 md:text-left"
              }`}
            >
              {/* Card — 100% original */}
              <div className="gradient-border rounded-xl bg-card/50 p-6 text-left transition-all hover:bg-card">
                <span className="mb-2 inline-block font-mono text-xs text-accent">
                  {exp.period}
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {exp.role}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {exp.company}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border/40 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}