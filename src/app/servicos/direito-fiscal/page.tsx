"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { Scale, CheckCircle2, ArrowRight, Shield, Calculator, FileText, Landmark } from "lucide-react"
import Link from "next/link"

export default function DireitoFiscalPage() {
    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200"
                        alt="Direito Fiscal"
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
                            Direito <span className="italic text-secondary">Fiscal</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Otimização tributária e compliance rigoroso para garantir a conformidade legal e a eficiência financeira da sua organização.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="aspect-square bg-white rounded-[4rem] p-12 border border-gray-100 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative z-10 grid grid-cols-2 gap-6 h-full">
                                    {[
                                        { icon: <Calculator />, label: "Planeamento" },
                                        { icon: <Landmark />, label: "Contencioso" },
                                        { icon: <FileText />, label: "Auditoria" },
                                        { icon: <Shield />, label: "Segurança" }
                                    ].map((box, i) => (
                                        <div key={i} className="flex flex-col items-center justify-center p-6 bg-[#FCFCFD] rounded-3xl border border-gray-50 group-hover:border-secondary/20 transition-all">
                                            <div className="text-secondary mb-4 scale-125">{box.icon}</div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{box.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-primary mb-8">Gestão Fiscal <span className="italic">Inteligente</span></h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                A complexidade do sistema tributário angolano exige um acompanhamento especializado para evitar contingências e aproveitar os benefícios fiscais previstos na lei.
                            </p>
                            <div className="space-y-4 mb-10">
                                {[
                                    "Consultoria em IVA e Impostos sobre o Rendimento",
                                    "Planeamento Fiscal Nacional e Internacional",
                                    "Apoio em Auditorias e Inspecções Fiscais",
                                    "Contencioso e Reclamações Tributárias",
                                    "Análise de Incentivos e Benefícios Fiscais"
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
                                Solicitar Diagnóstico Fiscal
                                <ArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
