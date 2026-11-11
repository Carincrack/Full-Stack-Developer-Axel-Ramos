"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Stack", href: "#tech" },
  { label: "Proyectos", href: "#projects" },
  { label: "Sobre mí", href: "#about" },
  { label: "Trayectoria", href: "#experience" },
  { label: "Contacto", href: "#contact" },
]

const EASE = [0.23, 1, 0.32, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Sección activa: la que cruza una franja en el centro de la pantalla
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Escape cierra el menú del celular
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Velo suave detrás del navbar al bajar, para que se lea sobre cualquier sección */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="relative mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-4 pt-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* Marca */}
        <a href="#home" className="group flex items-center gap-3 justify-self-start" aria-label="Axel Ramos, inicio">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sm font-bold tracking-tight text-foreground backdrop-blur-xl transition-colors duration-200 group-hover:border-accent/40">
            <span className="text-accent">A</span>R
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-foreground/90 sm:inline">Axel Ramos</span>
        </a>

        {/* Escritorio: cápsula de vidrio con los enlaces */}
        <ul
          className={`hidden items-center gap-0.5 rounded-full border border-white/10 p-1 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-500 lg:flex ${
            scrolled ? "bg-black/60" : "bg-black/30"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                  />
                )}
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-1.5 text-[13px] transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-foreground py-2 pl-4 pr-3 text-[13px] font-medium text-background transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.97] sm:inline-flex"
          >
            Hablemos
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>

          {/* Celular y tablet: botón redondo */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-foreground backdrop-blur-xl transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.95] lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Panel flotante del celular */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ transformOrigin: "top right" }}
            className="absolute inset-x-3 top-[68px] rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:left-auto sm:right-6 sm:w-72 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => {
                const isActive = active === link.href.slice(1)
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.03 + i * 0.035, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                        isActive ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background active:scale-[0.98]"
            >
              Hablemos
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
