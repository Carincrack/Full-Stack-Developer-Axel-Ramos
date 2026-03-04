"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  tag: string
  title: string
  description?: string
}

export function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      {/* <span className="mb-4 inline-block rounded-full border border-border/60 bg-secondary/50 px-4 py-1 font-mono text-xs text-accent">
        {tag}
      </span> */}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  )
}
