"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, Play, X, Volume2, VolumeX, Maximize2 } from "lucide-react"

export interface VideoModalProject {
  name: string
  video?: string
  demo?: string
  github?: string
}

interface VideoModalProps {
  project: VideoModalProject | null
  onClose: () => void
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Lock scroll
  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [project])

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Autoplay on open
  useEffect(() => {
    const v = modalVideoRef.current
    if (!v || !project) return
    v.src = project.video ?? ""
    v.muted = false
    v.play().catch(() => {})
  }, [project])

  function handleTimeUpdate() {
    const v = modalVideoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
  }

  function handleLoadedMetadata() {
    const v = modalVideoRef.current
    if (v) setDuration(v.duration)
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const bar = progressBarRef.current
    const v = modalVideoRef.current
    if (!bar || !v) return
    const rect = bar.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  function togglePlay() {
    const v = modalVideoRef.current
    if (!v) return
    v.paused ? v.play() : v.pause()
  }

  function toggleMute() {
    const v = modalVideoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function handleFullscreen() {
    modalVideoRef.current?.requestFullscreen?.()
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Video de ${project.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="gradient-border relative z-10 w-full overflow-hidden rounded-2xl bg-background shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_60px_-20px_oklch(0.6_0.15_250/0.35)]"
            // Lo más grande que quepa: el video 16:9 usa toda la altura libre (≈190px son el encabezado, los controles y el margen)
            style={{ maxWidth: "min(1600px, calc((100svh - 190px) * 16 / 9))" }}
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3.5 sm:px-6">
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Demo en video</span>
                <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">{project.name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar video"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-[transform,color,border-color] duration-150 ease-[var(--ease-out)] hover:border-accent/50 hover:text-foreground active:scale-[0.95]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Video */}
            <div className="relative bg-black">
              <video
                ref={modalVideoRef}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="aspect-video w-full object-cover"
              />

              {/* Click overlay — pause/play */}
              <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                        <Play size={24} fill="white" className="ml-1 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2 px-5 pb-4 pt-3">
              {/* Progress bar */}
              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="group/bar relative h-1 w-full cursor-pointer rounded-full bg-white/10 transition-[height] duration-150 hover:h-1.5"
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-accent shadow-[0_0_10px_oklch(0.7_0.15_250/0.6)] transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-foreground opacity-0 shadow-md transition-opacity group-hover/bar:opacity-100"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>

              {/* Buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  {/* Mute */}
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? "Activar sonido" : "Silenciar"}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Time */}
                  <span className="font-mono text-[11px] tabular-nums text-white/30">
                    {fmt(currentTime)} / {fmt(duration)}
                  </span>
                </div>

                {/* Right: links + fullscreen */}
                <div className="flex items-center gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/60 transition-all hover:border-white/20 hover:text-white"
                    >
                      <ArrowUpRight size={12} />
                      Ver sitio
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/60 transition-all hover:border-white/20 hover:text-white"
                    >
                      <Github size={12} />
                      Código
                    </a>
                  )}
                  <button
                    onClick={handleFullscreen}
                    aria-label="Pantalla completa"
                    className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}