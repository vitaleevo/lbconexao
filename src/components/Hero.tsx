"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050B14]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-primary-light/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full mb-10 shadow-2xl"
                        >
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-secondary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                            </span>
                            <span className="text-secondary-light font-bold text-xs uppercase tracking-[0.2em]">Direito Angolano • Excelência</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 leading-[1.05] font-bold tracking-tight">
                            Elevando o <br />
                            Padrão do <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary-light to-secondary/80 italic font-medium">Direito</span>
                        </h1>

                        <p className="text-xl text-white/60 mb-12 max-w-xl leading-relaxed font-light">
                            Unimos a tradição jurídica à inovação prática. A LB Conexão é o ponto de encontro entre
                            <span className="text-secondary-light font-medium"> especialistas </span> e o
                            <span className="text-white font-medium"> sucesso empresarial </span> em Angola.
                        </p>

                        <div className="flex flex-wrap gap-6 items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/contato"
                                    className="secondary-gradient px-10 py-5 rounded-full font-bold text-white shadow-[0_10px_30px_-10px_rgba(197,160,89,0.5)] flex items-center group"
                                >
                                    Agendar Consultoria
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                                <Link
                                    href="/sobre"
                                    className="px-10 py-5 rounded-full font-bold text-white border border-white/20 backdrop-blur-md flex items-center transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 shadow-lg">
                                        <Play className="w-3 h-3 fill-white ml-0.5" />
                                    </div>
                                    Conheça a LB
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-5 relative hidden lg:block"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {/* Main Visual Frame */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="relative aspect-[4/5] bg-[#0A1628] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                                <img
                                    src="/img 1.jpg"
                                    alt="Luis Bastos - Excelência Jurídica"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="h-1 w-16 bg-secondary mb-6" />
                                    <h3 className="text-3xl font-display text-white mb-3">Compromisso Ético</h3>
                                    <p className="text-white/60 text-sm">A estrutura do nosso trabalho baseia-se na transparência e no foco em resultados extraordinários.</p>
                                </div>
                            </div>
                        </div>



                        {/* Floating Status Card 2 */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 glass p-6 rounded-[2rem] z-20 max-w-[200px]"
                        >
                            <div className="flex flex-col space-y-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-gray-800" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center text-xs font-bold text-white">+</div>
                                </div>
                                <p className="text-white text-xs font-medium">Junte-se a mais de <span className="text-secondary italic underline">500 advogados</span> na nossa rede.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Add necessary icons to the existing import at the top
