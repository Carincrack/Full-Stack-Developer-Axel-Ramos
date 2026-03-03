"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import { SectionHeading } from "./section-heading"

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance & Personal Projects",
    period: "2023 - Present",
    description:
      "Designing and developing full-stack web applications with modern frameworks. Building scalable APIs, interactive dashboards, and deploying with Docker and cloud platforms.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Docker", "Azure"],
  },
  {
    role: "Frontend Developer",
    company: "Web Development Projects",
    period: "2022 - 2023",
    description:
      "Created responsive, high-performance user interfaces with React and modern CSS frameworks. Focused on component architecture, accessibility, and smooth animations.",
    tech: ["React", "TypeScript", "TailwindCSS", "Vite", "Git"],
  },
  {
    role: "Software Engineering Student",
    company: "University & Self-Study",
    period: "2021 - 2022",
    description:
      "Built foundational knowledge in algorithms, data structures, and object-oriented programming. Developed projects in C++, C#, and began exploring web technologies.",
    tech: ["C++", "C#", ".NET", "SQL Server", "HTML/CSS"],
  },
]

export function Experience() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// experience"
          title="Professional Journey"
          description="A timeline of my growth as a developer and the experience I have gathered."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-border via-border to-transparent md:left-1/2 md:-translate-x-px" />

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
              {/* Dot */}
              <div
                className={`absolute left-2.5 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border bg-card md:top-1 ${
                  index % 2 === 0
                    ? "md:left-auto md:-right-[9px]"
                    : "md:-left-[9px]"
                }`}
              >
                <Briefcase size={10} className="text-accent" />
              </div>

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
