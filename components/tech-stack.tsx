"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import MagicBento from "./magic-bento"
import type { BentoCardData } from "./magic-bento"
import GradualBlur from "./gradual-blur"

interface TechItem {
  name: string
  category: string
  icon: string
  dark?: boolean // logo negro: se invierte para que se vea sobre el fondo oscuro
}

const techStack: TechItem[] = [
  // Frontend
  { name: "React.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TailwindCSS", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Vite", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Figma", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  // Backend
  { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "Express.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", dark: true },
  { name: "C#", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
  { name: ".NET", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
  { name: "C++", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  // Database
  { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "SQL Server", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
  // DevOps & Tools
  { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Git", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", dark: true },
  { name: "Azure DevOps", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "Vercel", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", dark: true },
  {name: "Railway", category: "DevOps", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAOVBMVEUAAAA7OzuXl5e+vr7S0tJ2dnbo6Oj///8LCwvb29v6+voyMjJOTk5sbGygoKCurq6EhITCwsLIyMg/5z2vAAAADHRSTlP//////////////v5RwSCUAAAAq0lEQVR4Aa3SBQKEIAAEwKWbi///1aK5jrFdpfEPhDLOGSW4JaTKpJgibdTG7vvGaHScrVG6uu6/nKka2/Zvra7lBoUvgoilcoHkVEUa4FI5Mv83Fhogj18JBj7Vd8ZRK8Uu8syoRDi1YdidY0EzXLaQp9LCRCDWkF4mEbIWq8nE89YgYvjkuuEE6de7kJzVHWdk5jYzw5TZcZsmu2fdvEzqUlDm/QU2Lc3frU1iDemt76AZAAAAAElFTkSuQmCC" },
]

const categories = [
  { key: "Frontend", label: "Frontend", description: "Interfaces que se adaptan a cualquier pantalla" },
  { key: "Backend", label: "Backend", description: "APIs y la lógica del negocio en el servidor" },
  { key: "Database", label: "Bases de datos", description: "Modelado relacional y consultas que rinden" },
  { key: "DevOps", label: "DevOps y herramientas", description: "Versiones, contenedores y despliegue" },
]

function TechIconGrid({ items }: { items: TechItem[] }) {
  return (
    <div className="flex flex-wrap gap-2.5 text-nowrap">
      {items.map((tech) => (
        <motion.div
          key={tech.name}
          whileHover={{ scale: 1.06, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="group flex items-center gap-2.5 rounded-xl border border-border/30 bg-background/40 px-3 py-2 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-background/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tech.icon}
            alt={`${tech.name} logo`}
            width={26}
            height={26}
            className={`h-[22px] w-[22px] shrink-0 sm:h-[26px] sm:w-[26px] ${tech.dark ? "invert" : ""}`}
            loading="lazy"
          />
          <span className="select-none text-[13px] font-medium text-foreground/80 transition-colors group-hover:text-foreground sm:text-sm">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export function TechStack() {
  const bentoCards: BentoCardData[] = categories.map((cat) => {
    const items = techStack.filter((t) => t.category === cat.key)
    return {
      color: "oklch(0.09 0.01 250)",
      title: cat.label,
      description: cat.description,
      label: cat.key === "Database" ? "Datos" : cat.key,
      children: <TechIconGrid items={items} />,
    }
  })

  return (
    <section id="tech" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// tech stack"
          title="Tecnologías con las que trabajo"
          description="Las herramientas que uso a diario para llevar un proyecto de la base de datos a producción."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagicBento
            cards={bentoCards}
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="122, 186, 255"
            disableAnimations={false}
            ambientParticles
          />
        </motion.div>
      </div>

      {/* GradualBlur at bottom of section */}
     {/*  <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
      /> */}
    </section>
  )
}
