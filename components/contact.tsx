"use client"

import { motion } from "framer-motion"
import { Send, MapPin, Clock, Mail } from "lucide-react"
import { SectionHeading } from "./section-heading"

const meta = [
  { icon: Mail, label: "Email", value: "contact@example.com" },
  { icon: MapPin, label: "Location", value: "San José, Costa Rica" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_oklch(0.5_0.15_250_/_0.06)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          tag="// contact"
          title="Get In Touch"
          description="Have a project in mind or want to collaborate? Send me a message."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">

          {/* ── Left col: info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Disponibilidad */}
            <div className="gradient-border rounded-2xl bg-card/50 p-6">
              <span className="mb-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  
                </span>
                Available for work
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I'm currently open to freelance projects and full-time opportunities. Let's build something great together.
              </p>
            </div>

            {/* Meta items */}
            <div className="gradient-border rounded-2xl bg-card/50 p-6">
              <ul className="flex flex-col gap-5">
                {meta.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary/30">
                      <Icon size={15} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Right col: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="gradient-border rounded-2xl bg-card/50 p-8 md:p-10">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-5"
              >
                {/* Name + Email en fila */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
                >
                  Send Message
                  <Send
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}