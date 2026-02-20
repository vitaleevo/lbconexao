"use client"

import { motion } from "framer-motion"
import { Scale, Users, GraduationCap, Briefcase } from "lucide-react"
import Link from "next/link"

export default function Services() {
    const services = [
        {
            title: "Cursos e Capacitações",
            description: "Imersões teóricas e práticas focadas no contexto jurídico angolano, do Comercial ao Fiscal.",
            icon: <GraduationCap className="w-10 h-10" />,
            accent: "bg-blue-500/10"
        },
        {
            title: "Eventos e Networking",
            description: "Conferências de alto nível e workshops que promovem atualização e conexões estratégicas.",
            icon: <Users className="w-10 h-10" />,
            accent: "bg-secondary/10"
        },
        {
            title: "Soluções Jurídicas",
            description: "Acompanhamento educacional e consultoria de excelência para profissionais e empresas.",
            icon: <Scale className="w-10 h-10" />,
            accent: "bg-primary/10"
        },
        {
            title: "Orientação Profissional",
            description: "Simulação de tribunais e networking orientado para o desenvolvimento de novos talentos.",
            icon: <Briefcase className="w-10 h-10" />,
            accent: "bg-green-500/10"
        },
    ]

    return (
        <section id="sobre" className="py-32 bg-[#FCFCFD] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6"
                        >
                            <div className="w-8 h-[1px] bg-secondary" />
                            <span>Nossa Expertise</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-display text-primary leading-tight">
                            Arquitetando Soluções <br />
                            <span className="italic font-light">Jurídicas Completas</span>
                        </h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-lg leading-relaxed max-w-md lg:text-right"
                    >
                        Conectamos conhecimento profundo e experiência prática para fortalecer todo o ecossistema legal em Angola.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group relative p-10 bg-white rounded-[2.5rem] border border-gray-100/60 hover:border-secondary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(10,35,66,0.08)] h-full flex flex-col items-start text-left"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${service.accent} flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 mb-8`}>
                                {service.icon}
                            </div>

                            <h4 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300 tracking-tight">
                                {service.title}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {service.description}
                            </p>

                            <Link href="/servicos" className="flex items-center text-xs font-bold uppercase tracking-widest text-primary/40 group-hover:text-secondary transition-colors">
                                <span>Ver Detalhes</span>
                                <div className="ml-2 w-0 group-hover:w-8 h-[1px] bg-secondary transition-all duration-500" />
                            </Link>

                            {/* Decorative background element */}
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
