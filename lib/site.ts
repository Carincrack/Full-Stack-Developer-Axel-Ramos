import { Github, Linkedin, Mail } from "lucide-react"

// Datos de contacto en un solo lugar. Lo que quede vacío no se muestra en la página.
export const site = {
  github: "https://github.com/Carincrack",
  linkedin: "", // pendiente: URL del perfil de LinkedIn
  email: "", // pendiente: correo público de contacto
  location: "Costa Rica",
}

export const socials = [
  { icon: Github, href: site.github, label: "GitHub" },
  { icon: Linkedin, href: site.linkedin, label: "LinkedIn" },
  { icon: Mail, href: site.email && `mailto:${site.email}`, label: "Correo" },
].filter((s) => s.href)
