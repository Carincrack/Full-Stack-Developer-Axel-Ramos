"use client"

import { useRef, useCallback, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Github, Play } from "lucide-react"
import { SectionHeading } from "./section-heading"
import LightRays from "./LightRays"
import { VideoModal } from "./videomodal"

const projects = [
  {
    name: "Vivero Paraíso del Cactus",
    description:
      "Interactive carousel with GSAP animations, responsive design, and touch swipe support. Built to showcase a nursery's plant catalog with cinematic slide transitions.",
    tech: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Lucide React"],
    image: "/resources/vivero.png",
    video: "/resources/videos/video1.mp4",
    demo: "https://viveroparaiso.vercel.app/",
    github: undefined,
  },
  {
    name: "Gym LIFTUP Suplementos",
    description:
      "Gym system for managing supplement sales, inventory, and daily operations with admin and reception roles.",
    tech: ["React", "TypeScript", "MySQL", "TailwindCSS", "NestJS"],
    image: "/resources/Gym.png",
    video: "/resources/videos/Gym.mp4",
    github: undefined,
    demo: undefined,
  },
  {
    name: "Haori House",
    description:
      "High-end frontend experiences built with modern animation libraries, 3D elements, and immersive scroll-driven interactions.",
    tech: ["JavaScript", "Css", "HTML"],
    image: "/resources/House.png",
    video: "/resources/videos/House.mp4",
    demo: "https://naoristudio-house.vercel.app/",
    github: undefined,
  },
  {
    name: "Azuliverde House",
    description:
      "High-end frontend experiences built with modern animation libraries, 3D elements, and immersive scroll-driven interactions.",
    tech: ["JavaScript", "Css", "HTML"],
    image: "/resources/azuliverde.png",
    video: "/resources/videos/azuliverde.mp4",
    demo: "https://azuliverde.vercel.app/",
    github: undefined,
  },
  {
    name: "Hacienda Hansen",
    description:
      "High-end frontend experiences built with modern animation libraries, 3D elements, and immersive scroll-driven interactions.",
    tech: ["JavaScript", "Css", "HTML"],
    image: "/resources/Hansen.png",
    video: "/resources/videos/hacienda.mp4",
    demo: undefined,
    github: undefined,
  },
]

function ProjectCard({
  project,
  index,
  onOpenModal,
}: {
  project: (typeof projects)[0]
  index: number
  onOpenModal: (p: (typeof projects)[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoLoaded = useRef(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 })

  const rafRef = useRef<number | null>(null)
  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) {
          mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
          mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
        }
        rafRef.current = null
      })
    },
    [mouseX, mouseY],
  )

  function handleMouseEnter() {
    if (videoRef.current) {
      if (!videoLoaded.current) {
        videoRef.current.src = project.video ?? ""
        videoLoaded.current = true
      }
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (videoRef.current) videoRef.current.pause()
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative cursor-default select-none overflow-hidden rounded-2xl border border-border/30 bg-background/20 will-change-transform hover:border-border/70 hover:shadow-2xl hover:shadow-black/20"
    >
      {/* Imagen de fondo */}
      <img
        src={project.image}
        alt=""
        loading="lazy"
        aria-hidden
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.13] transition-opacity duration-500 group-hover:opacity-0"
      />

      {/* Video preview */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      {/* Overlay base */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background/90 via-background/5 to-transparent opacity-100 transition-opacity duration-400 group-hover:opacity-0" />

      {/* Contenido */}
      <div className="pointer-events-none relative z-40 flex flex-col p-8" style={{ minHeight: 300 }}>
        {/* Número + botones */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
              >
                <Github size={15} />
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Título */}
        <h3 className="mt-5 text-xl font-bold text-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-0">
          {project.name}
        </h3>

        {/* Descripción */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0">
          {project.description}
        </p>

        <div className="flex-1" />

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2 transition-all duration-[250ms] group-hover:translate-y-2 group-hover:opacity-0">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/30 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Título al fondo en hover */}
      <h3 className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 text-xl font-bold text-white opacity-0 drop-shadow-lg transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        {project.name}
      </h3>

      {/* Play button — solo en el centro, no cubre toda la card */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onOpenModal(project)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        aria-label={`Ver video de ${project.name}`}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.08)] opacity-0 group-hover:opacity-100 transition-[opacity,border-color,box-shadow] duration-300 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        <Play size={20} fill="white" className="ml-1 text-white drop-shadow-md" />
      </motion.button>
    </motion.div>
  )
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" className="relative py-32">

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={0.9}
          rayLength={5}
          followMouse={false}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={0.6}
          saturation={1.5}
        />
      </motion.div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[3] h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// projects"
          title="Featured Work"
          description="A selection of projects that showcase my expertise in full-stack development."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onOpenModal={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* ── VideoModal ── */}
      <VideoModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}