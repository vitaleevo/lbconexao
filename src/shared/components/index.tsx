"use client"

import { motion } from "framer-motion"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility: cn
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Componente de FadeInSection
export interface FadeInSectionProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function FadeInSection({
    children,
    className = "",
    delay = 0
}: FadeInSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Componente de Container principal
export interface MainContainerProps {
    children: React.ReactNode
    className?: string
}

export function MainContainer({
    children,
    className = ""
}: MainContainerProps) {
    return (
        <main className={cn("min-h-screen", className)}>
            {children}
        </main>
    )
}

// Seção de Serviços reutilizável
export interface ServicesSectionProps {
    title: string
    subtitle: string
    services: Array<{
        id: string
        title: string
        description: string
        icon: string
        accent: string
    }>
    className?: string
}

export function ServicesSection({
    title,
    subtitle,
    services,
    className = ""
}: ServicesSectionProps) {
    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-6">
                <FadeInSection className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </FadeInSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <FadeInSection key={service.id} delay={index * 0.1} className="h-full">
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

                                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary/40 group-hover:text-secondary transition-colors">
                                    <span>Ver Detalhes</span>
                                    <div className="ml-2 w-0 group-hover:w-8 h-[1px] bg-secondary transition-all duration-500" />
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
