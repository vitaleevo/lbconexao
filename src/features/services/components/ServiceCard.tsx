"use client"


import { Button } from "@/shared/components/ui/button"
import { FadeInSection } from "@/shared/components/animations"
import { cn } from "@/shared/utils/cn"

export interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    icon: string
    accent: string
  }
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <FadeInSection delay={index * 0.1} className="h-full">
      <div className="group relative p-8 bg-white rounded-3xl border border-gray-100 hover:border-secondary/20 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-500",
          service.accent,
          "group-hover:bg-secondary group-hover:text-white"
        )}>
          {service.icon}
        </div>

        <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="w-full group-hover:text-secondary"
        >
          Ver Detalhes
        </Button>
      </div>
    </FadeInSection>
  )
}