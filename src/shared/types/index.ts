import type React from "react"

// Tipos compartilhados
export interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  accent: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

export interface NavLink {
  name: string
  href: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
  category: string
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  excerpt: string
  slug: string
}