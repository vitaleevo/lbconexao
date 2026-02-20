"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Lightbulb, Handshake } from "lucide-react"
import Link from "next/link"

export default function ConsultoriaPage() {
    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=1200"
                        alt="Consultoria Jurídica"
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
                        <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-6">Soluções Integradas</span>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8">
                            Consultoria <span className="italic text-secondary">Jurídica</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Apoio estratégico contínuo para prevenir riscos e maximizar oportunidades de negócio.
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
                            <h2 className="text-3xl md:text-5xl font-display text-primary mb-8">Parceria <span className="italic">Estratégica</span></h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                Nossa consultoria não se limita a resolver problemas; nós os prevenimos. Através de um acompanhamento próximo, ajudamos nossos clientes a navegar no complexo ambiente regulatório angolano.
                            </p>
                            <div className="grid gap-6 mb-10">
                                {[
                                    { icon: <Shield />, title: "Prevenção", text: "Identificação antecipada de riscos jurídicos." },
                                    { icon: <Lightbulb />, title: "Estratégia", text: "Apoio na tomada de decisões empresariais." },
                                    { icon: <Handshake />, title: "Parceria", text: "Suporte jurídico contínuo e personalizado." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4 p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                                        <div className="text-secondary scale-125">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/contato"
                                className="secondary-gradient text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center"
                            >
                                Falar com Consultor
                                <ArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="/img 1.jpg"
                                    alt="Luis Bastos - Consultoria"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
