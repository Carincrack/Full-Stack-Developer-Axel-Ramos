"use client"

import { motion } from "framer-motion"
import { Code2, Database, Globe, Zap } from "lucide-react"
import { SectionHeading } from "./section-heading"
import ProfileCard from "./ProfileCard"

const highlights = [
  {
    icon: Globe,
    title: "Full Stack",
    description:
      "End-to-end development from responsive frontends to scalable backend services and APIs.",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Relational database architecture with PostgreSQL, MySQL, and SQL Server for data-driven applications.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimized builds, efficient rendering, and clean code that keeps applications fast and maintainable.",
  },
  {
    icon: Code2,
    title: "Modern Stack",
    description:
      "TypeScript-first development with React, Next.js, NestJS, and containerized deployments.",
  },
]

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// about"
          title="About Me"
        />

        {/* 3 columnas: ProfileCard | Texto+Stats | Highlights */}
        <div className="grid items-start gap-10 lg:grid-cols-3">

          {/* ── Col 1 — ProfileCard (nuevo) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <ProfileCard
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/resources/vivero.png"
  showUserInfo={false}
  enableTilt={true}
  enableMobileTilt={true}
  onContactClick={() => console.log('Contact clicked')}
  behindGlowColor="rgba(125, 190, 255, 0.67)"
  iconUrl="/assets/demo/iconpattern.png"
  behindGlowEnabled
  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
/>
          </motion.div>

          {/* ── Col 2 — Texto + Stats (sin cambios) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="gradient-border rounded-2xl bg-card/50 p-8 md:p-10">
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                I am a full stack developer focused on modern web architectures,
                scalable backends, and high-performance interfaces. I enjoy the
                process of turning complex problems into elegant, functional
                solutions.
              </p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                With experience across the entire development lifecycle, I work
                with technologies like React, Next.js, Node.js, NestJS, and
                multiple database systems to deliver production-ready
                applications.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                I am passionate about clean code, developer experience, and
                building tools that make a real impact. Currently open to new
                opportunities and exciting projects.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
                {[
                  { value: "24+", label: "Technologies" },
                  { value: "3+", label: "Years Exp." },
                  { value: "10+", label: "Projects" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Col 3 — Highlights cards (sin cambios) ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="gradient-border group rounded-xl bg-card/50 p-6 transition-all hover:bg-card"
                >
                  <div className="mb-4 inline-flex rounded-lg border border-border/50 bg-secondary/50 p-2.5 text-muted-foreground transition-colors group-hover:text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}