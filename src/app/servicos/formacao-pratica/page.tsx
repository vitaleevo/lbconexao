"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Compass, Laptop } from "lucide-react"
import Link from "next/link"

export default function FormacaoPraticaPage() {
    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200"
                        alt="Formação Prática"
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
                        <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-6">Academia LB Conexão</span>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8">
                            Formação <span className="italic text-secondary">Prática</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Desenvolvimento de competências essenciais através de simulações reais e ensino orientado à prática.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-primary mb-8">Aprender <span className="italic">Fazendo</span></h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                Nossa metodologia foca na aplicação imediata do conhecimento. Unimos a teoria jurídica às demandas reais do mercado de trabalho em Angola.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8 mb-10">
                                {[
                                    { icon: <Laptop />, title: "Imersões Digitais", text: "Workshops online e interativos." },
                                    { icon: <Compass />, title: "Mentoria", text: "Caminho guiado para novos talentos." },
                                    { icon: <Users />, title: "Simulações", text: "Treino em cenários reais de tribunal." },
                                    { icon: <BookOpen />, title: "Curadoria", text: "Material didático de alta qualidade." }
                                ].map((box, i) => (
                                    <div key={i} className="flex flex-col items-start space-y-3 p-6 bg-white rounded-3xl border border-gray-100 hover:border-secondary/20 transition-all">
                                        <div className="text-secondary">{box.icon}</div>
                                        <h4 className="font-bold text-primary">{box.title}</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">{box.text}</p>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/eventos"
                                className="secondary-gradient text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center"
                            >
                                Ver Agenda de Cursos
                                <ArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="aspect-[4/5] bg-primary rounded-[4rem] overflow-hidden shadow-2xl relative">
                                <img
                                    src="/img 2.jpg"
                                    alt="Luis Bastos - Formação"
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
