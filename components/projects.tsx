"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeading } from "./section-heading"
import LightRays from "./LightRays"

const projects = [
  {
    name: "Vivero Paraíso del Cactus",
    description:
      "Interactive carousel with GSAP animations, responsive design, and touch swipe support. Built to showcase a nursery's plant catalog with cinematic slide transitions.",
    tech: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Lucide React"],
    image: "/resources/vivero.png",
    video: "https://www.pexels.com/es-es/download/video/33857351/",
    demo: "https://viveroparaiso.vercel.app/",
    github: undefined,
  },
  {
    name: "Gym LIFTUP Suplementos",
    description: "Gym system for managing supplement sales, inventory, and daily operations with admin and reception roles.",
    tech: ["React", "TypeScript", "MySQL", "TailwindCSS", "NestJS"],
    image: "/resources/Gym.png",
    video: "/projects/gym-preview.mp4",
    github: undefined,
    demo: undefined,
  },
  {
    name: "naori house",
    description:
      "High-end frontend experiences built with modern animation libraries, 3D elements, and immersive scroll-driven interactions.",
    tech: ["JavaScript", "Css", "HTML"],
    image: "/resources/House.png",
    video: "/projects/web-preview.mp4",
    demo: "https://naoristudio-house.vercel.app/",
    github: undefined,
  },
  {
    name: "Smart Gym Analytics",
    description:
      "Dashboard for gyms to monitor sales, memberships, and supplement performance in real time.",
    tech: ["React", "Node.js", "MySQL", "Chart.js", "Tailwind CSS"],
    image: "/resources/gym-analytics.png",
    video: "/projects/gym-analytics.mp4",
    demo: "#",
    github: undefined,
  },
  {
    name: "Real Estate 3D Explorer",
    description:
      "Interactive property viewer that lets users explore spaces through animated transitions.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "/resources/real-estate.png",
    video: "/projects/real-estate.mp4",
    demo: "#",
    github: undefined,
  },
  {
    name: "Restaurant Order System",
    description:
      "Digital ordering and inventory platform designed to streamline restaurant operations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/resources/restaurant.png",
    video: "/projects/restaurant.mp4",
    demo: "#",
    github: undefined,
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })

  function handleMouse(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseEnter() {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    if (videoRef.current) videoRef.current.pause()
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/20 transition-all duration-300 hover:border-border/70 hover:shadow-2xl hover:shadow-black/20"
    >
      {/* Imagen de fondo estática */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${project.image})`,
          opacity: isHovered ? 0 : 0.13,
        }}
      />

      {/* Video en hover */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
      </motion.div>

      {/* Overlay base */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background/90 via-background/5 to-transparent"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col p-8" style={{ minHeight: 300 }}>

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
                className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={15} />
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Título original */}
        <motion.h3
          className="mt-5 text-xl font-bold text-foreground"
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ pointerEvents: isHovered ? "none" : "auto" }}
        >
          {project.name}
        </motion.h3>

        {/* Descripción */}
        <motion.p
          className="mt-3 text-sm leading-relaxed text-muted-foreground"
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {project.description}
        </motion.p>

        <div className="flex-1" />

        {/* Tech tags */}
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 8 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/30 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Título al fondo en hover — absolute, no afecta layout */}
      <motion.h3
        className="absolute bottom-8 left-8 right-8 z-20 text-xl font-bold text-white drop-shadow-lg"
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.name}
      </motion.h3>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">

      {/* LightRays — solo decorativo en la parte superior */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[2]"
        style={{ height: "600px" }}
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
          fadeDistance={1}
          saturation={1.5}
        />
      </motion.div>

      {/* Fade top — tapa el borde superior de los rayos */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[3] h-24 bg-gradient-to-b from-background to-transparent" />

      {/* Fade bottom — tapa el borde inferior de los rayos cuando hay pocos proyectos
          y evita la línea negra al añadir más cards */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// projects"
          title="Featured Work"
          description="A selection of projects that showcase my expertise in full-stack development."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}