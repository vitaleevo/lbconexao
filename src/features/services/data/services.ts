import { Service } from "@/shared/types"

export const servicesData: Service[] = [
  {
    id: "courses",
    title: "Cursos e Capacitações",
    description: "Imersões teóricas e práticas focadas no contexto jurídico angolano, do Comercial ao Fiscal.",
    icon: "🎓",
    accent: "bg-blue-500/10"
  },
  {
    id: "events",
    title: "Eventos e Networking",
    description: "Conferências de alto nível e workshops que promovem atualização e conexões estratégicas.",
    icon: "👥",
    accent: "bg-secondary/10"
  },
  {
    id: "solutions",
    title: "Soluções Jurídicas",
    description: "Acompanhamento educacional e consultoria de excelência para profissionais e empresas.",
    icon: "⚖️",
    accent: "bg-primary/10"
  },
  {
    id: "career",
    title: "Orientação Profissional",
    description: "Simulação de tribunais e networking orientado para o desenvolvimento de novos talentos.",
    icon: "💼",
    accent: "bg-green-500/10"
  },
]