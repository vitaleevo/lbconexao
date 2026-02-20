"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DireitoComercialPage() {
    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
                        alt="Direito Comercial"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-primary/40" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-6">Áreas de Atuação</span>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8">
                            Direito <span className="italic text-secondary">Comercial</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Soluções jurídicas estratégicas para impulsionar o crescimento e a segurança das empresas no mercado angolano.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-primary mb-8">Excelência em <span className="italic">Assuntos Corporativos</span></h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                No cenário económico dinâmico de Angola, o Direito Comercial é a base para o sucesso empresarial sustentável. Nossa consultoria abrange desde a constituição de sociedades até operações complexas de fusões e aquisições.
                            </p>
                            <div className="space-y-4 mb-10">
                                {[
                                    "Constituição e Reestruturação de Sociedades",
                                    "Contratos Mercantis e Internacionais",
                                    "Governança Corporativa e Compliance",
                                    "Propriedade Intelectual e Marcas",
                                    "Recuperação de Créditos e Insolvências"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                                        <span className="text-primary/80 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/contato"
                                className="secondary-gradient text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center"
                            >
                                Agendar Consultoria Especializada
                                <ArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-primary rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="/img 2.jpg"
                                    alt="Luis Bastos - Consultoria Comercial"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="h-1 w-16 bg-secondary mb-6" />
                                    <h3 className="text-2xl font-display text-white mb-2">Visão Estratégica</h3>
                                    <p className="text-white/60">Protegendo ativos e estruturando negócios para o futuro.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
