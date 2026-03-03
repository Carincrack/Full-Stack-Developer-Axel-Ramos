"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeading } from "./section-heading"
import Beams from "./Beams"

const projects = [
  {
    name: "Enterprise Management System",
    description:
      "Full stack platform with role-based authentication, interactive dashboards, and RESTful APIs. Built for managing complex business operations at scale.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Docker", "TypeScript"],
  },
  {
    name: "Gym Management Platform",
    description:
      "Complete membership, inventory, and client management system with real-time tracking, payment integration, and automated reporting.",
    tech: ["React", "Node.js", "MySQL", "TailwindCSS", "Express"],
  },
  {
    name: "Interactive Web Experiences",
    description:
      "High-end frontend experiences built with modern animation libraries, 3D elements, and immersive scroll-driven interactions.",
    tech: ["React", "Framer Motion", "Three.js", "GSAP", "TailwindCSS"],
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  })

  function handleMouse(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/40 backdrop-blur-md transition-all duration-300 hover:border-border/70 hover:bg-background/60 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative z-10 flex h-full flex-col p-8">
        {/* Top row */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <a
              href="#"
              className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github size={15} />
            </a>
            <a
              href="#"
              className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
              aria-label={`Visit ${project.name} live demo`}
            >
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold text-foreground">
          {project.name}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
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
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">

      {/* Single Beams background for the whole section */}
    {/*   <div className="absolute inset-0 z-0 opacity-30">
        <Beams
          beamWidth={2}
          beamHeight={20}
          beamNumber={14}
          lightColor="#7abaff"
          speed={1.5}
          noiseIntensity={1.5}
          scale={0.2}
          rotation={30}
        />
      </div> */}

      {/* Fade top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[1] h-32 bg-gradient-to-b from-background to-transparent" />

      {/* Fade bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-32 bg-gradient-to-t from-background to-transparent" />

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