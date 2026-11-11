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

// Aviso de derechos de los proyectos. "team" = hecho con su equipo; "own" = hecho por Axel.
// Sin "®" ni "marca registrada": eso solo aplica a marcas ya inscritas en el Registro.
export type Rights = "team" | "own"
export const RIGHTS = {
  year: new Date().getFullYear(),
  label: "Nombre e identidad reservados",
  credit: {
    team: "Equipo de desarrollo",
    own: "Axel Ramos",
  } satisfies Record<Rights, string>,
}
