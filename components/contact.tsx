"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, Clock, Mail, ArrowUpRight, Download } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { site } from "@/lib/site"

/* ─── Types ─── */
interface InfoRow {
  icon: React.ElementType
  label: string
  value: string
  marqueeText: string
}

const rows: InfoRow[] = [
  {
    icon: Mail,
    label: "Correo",
    value: site.email,
    marqueeText: `${site.email} · escríbame ·`,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: site.location,
    marqueeText: `${site.location} · GMT-6 ·`,
  },
  {
    icon: Clock,
    label: "Respuesta",
    value: "En menos de 24 horas",
    marqueeText: "En menos de 24 horas · siempre atento ·",
  },
].filter((r) => r.value)

// shortcut: el formulario abre el correo del visitante (mailto); si algún día hace falta enviar sin salir de la página, conectar Resend o Formspree.
function sendByMail(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  if (!site.email) return
  const f = new FormData(e.currentTarget)
  const subject = `Contacto desde el portafolio — ${f.get("name")}`
  const body = `${f.get("message")}\n\n${f.get("name")} · ${f.get("email")}`
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* ─── Flowing info row ─── */
function FlowRow({ row }: { row: InfoRow }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const xRef = useRef(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    const half = inner.scrollWidth / 2

    const tick = () => {
      if (hovering) {
        xRef.current -= 0.8
        if (Math.abs(xRef.current) >= half) xRef.current = 0
        inner.style.transform = `translateX(${xRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovering])

  const getEdge = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current!.getBoundingClientRect()
    const y = e.clientY - r.top
    return y < r.height / 2 ? "top" : "bottom"
  }

  const enter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovering(true)
    const marquee = marqueeRef.current!
    const edge = getEdge(e)
    marquee.style.transition = "none"
    marquee.style.transform = `translateY(${edge === "top" ? "-100%" : "100%"})`
    requestAnimationFrame(() => {
      marquee.style.transition = "transform 0.52s cubic-bezier(0.16,1,0.3,1)"
      marquee.style.transform = "translateY(0%)"
    })
  }

  const leave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovering(false)
    const marquee = marqueeRef.current!
    const edge = getEdge(e)
    marquee.style.transition = "transform 0.52s cubic-bezier(0.16,1,0.3,1)"
    marquee.style.transform = `translateY(${edge === "top" ? "-100%" : "100%"})`
  }

  const { icon: Icon } = row

  return (
    <div
      ref={wrapRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative flex cursor-default items-center justify-between overflow-hidden border-b border-border/30 py-5 px-2 select-none transition-colors duration-200 hover:border-accent/50"
    >
      <div className="flex items-center gap-4 transition-opacity duration-300 group-hover:opacity-0">
        <Icon size={14} className="text-muted-foreground shrink-0" />
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground w-20 shrink-0">
          {row.label}
        </span>
        <span className="text-sm font-medium text-foreground">{row.value}</span>
      </div>
      <ArrowUpRight
        size={14}
        className="text-muted-foreground/40 shrink-0 transition-opacity duration-300 group-hover:opacity-0"
      />

      <div
        ref={marqueeRef}
        className="pointer-events-none absolute inset-0 flex items-center bg-accent"
        style={{ transform: "translateY(100%)" }}
      >
        <div ref={innerRef} className="flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="mr-8 text-sm font-semibold uppercase tracking-widest text-accent-foreground"
            >
              {row.marqueeText}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main section ─── */
export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_oklch(0.5_0.15_250_/_0.05)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// contact"
          title="Hablemos"
          description="¿Tiene un proyecto en mente o una vacante? Escríbame y le respondo pronto."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr]">

          {/* ── Left: flowing rows ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Disponible para trabajar
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Abierto a proyectos freelance y a puestos de tiempo completo.
              </p>

              {/* ── CV Download Button ── */}
              <a
                href="/cv/Axel Ramos Villegas.pdf"
                download="Axel Ramos Villegas.pdf"
                className="group mt-6 inline-flex items-center gap-3 rounded-full border border-border/40 bg-card/40 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-sm transition-[transform,border-color,background-color,color] duration-200 ease-[var(--ease-out)] hover:border-accent/50 hover:bg-accent/10 hover:text-foreground active:scale-[0.97]"
              >
                <Download
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Descargar CV
              </a>
            </div>

            <div className="border-t border-border/30">
              {rows.map((row) => (
                <FlowRow key={row.label} row={row} />
              ))}
            </div>
          </motion.div>

          {/* ── Right: editorial form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={sendByMail}
              className="gradient-border flex flex-col gap-0 rounded-2xl bg-card/50 p-8"
            >
              <FieldRow label="01 — Nombre">
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Su nombre"
                  className="w-full bg-transparent py-4 text-sm text-foreground placeholder-muted-foreground/40 outline-none"
                />
              </FieldRow>

              <FieldRow label="02 — Correo">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="su@correo.com"
                  className="w-full bg-transparent py-4 text-sm text-foreground placeholder-muted-foreground/40 outline-none"
                />
              </FieldRow>

              <FieldRow label="03 — Mensaje" tall>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Cuénteme sobre su proyecto…"
                  className="w-full resize-none bg-transparent py-4 text-sm text-foreground placeholder-muted-foreground/40 outline-none"
                />
              </FieldRow>

              <div className="pt-8">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 bg-foreground px-8 py-4 text-sm font-semibold text-background transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out)] active:scale-[0.97] hover:border-accent/60 hover:shadow-[0_0_40px_theme(colors.accent.DEFAULT/0.35)]"
                >
                  <span className="relative z-10">Enviar mensaje</span>
                  <Send
                    size={14}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─── Field row helper ─── */
function FieldRow({
  label,
  children,
  tall,
}: {
  label: string
  children: React.ReactNode
  tall?: boolean
}) {
  return (
    <label className="group block">
      <div className="flex items-start">
        <span className="w-28 shrink-0 pt-[18px] pb-2 text-[10px] uppercase tracking-widest text-foreground/70 transition-colors duration-200 group-hover:text-foreground">
          {label}
        </span>
        <div className="flex-1">{children}</div>
      </div>
      <div className="h-px w-full bg-border/30 transition-colors duration-200 group-hover:bg-accent/50 group-focus-within:bg-accent/70" />
    </label>
  )
}