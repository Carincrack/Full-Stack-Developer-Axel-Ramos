"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import ProfileCard from "./ProfileCard";

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
];

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading tag="// about" title="About Me" />

        {/*
          Mobile:  1 columna apilada
          Tablet:  ProfileCard arriba centrado + texto/highlights abajo en 2col
          Desktop: 3 columnas iguales
        */}
        <div className="grid items-start gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-50">
          {/* ── Col 1 — ProfileCard ── */}
          {/* En mobile/tablet: centrado y ancho controlado */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex justify-center md:justify-start md:col-span-2 lg:col-span-1"
            style={{ isolation: "isolate" }}
          >
            <ProfileCard
              name="Axel R.V"
              title="Systems Engineer"
              avatarUrl="resources/Sinfondo.png"
              /*  avatarUrl="resources/Perfil.png"  */
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl="https://i.ibb.co/W4pfqymW/iconpattern.png"
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </motion.div>

          {/* ── Col 2 — Texto + Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-1"
          >
            <div className="gradient-border rounded-2xl bg-card/50 p-6 sm:p-8 md:p-10">
              <p className="mb-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                I am a Systems Engineer and Full Stack Developer focused on
                designing and building modern software systems, scalable
                backends, and high-performance web applications.
              </p>

              <p className="mb-5 leading-relaxed text-sm sm:text-base text-muted-foreground">
                My experience covers the full development lifecycle, including
                system architecture, database design, backend development, and
                modern frontend interfaces using technologies like React,
                Next.js, Node.js, and NestJS.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-muted-foreground">
                I focus on creating efficient, scalable, and maintainable
                solutions, applying engineering principles, clean code
                practices, and modern development workflows to build reliable
                production-ready systems.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
                {[
                  { value: "24+", label: "Technologies" },
                  { value: "3+", label: "Years Exp." },
                  { value: "10+", label: "Projects" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
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

          {/* ── Col 3 — Highlights cards ── */}
          {/* En tablet ocupa las 2 columnas completo, en desktop solo 1 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-2 lg:col-span-1">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="gradient-border group rounded-xl bg-card/50 p-4 sm:p-6 transition-all hover:bg-card"
                >
                  <div className="mb-3 sm:mb-4 inline-flex rounded-lg border border-border/50 bg-secondary/50 p-2 sm:p-2.5 text-muted-foreground transition-colors group-hover:text-accent">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
