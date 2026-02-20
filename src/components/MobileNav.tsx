"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, BookOpen, Calendar, Mail, FileText, ChevronRight, X, ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react"

export default function MobileNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Início", href: "/", icon: <Home className="w-5 h-5" /> },
        { name: "Sobre Nós", href: "/sobre", icon: <User className="w-5 h-5" /> },
        { name: "Serviços", href: "/servicos", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Blog", href: "/blog", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Eventos", href: "/eventos", icon: <Calendar className="w-5 h-5" /> },
        { name: "Contacto", href: "/contato", icon: <Mail className="w-5 h-5" /> },
    ]

    return (
        <div className="md:hidden">
            {/* Minimal Mobile Header */}
            <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 px-6 flex justify-between items-center ${isScrolled ? "h-16 bg-white/90 backdrop-blur-lg shadow-sm" : "h-20 bg-transparent"
                }`}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <img
                        src="/logo.png"
                        alt="LB Conexão"
                        className={`h-10 w-auto transition-all ${!isScrolled && !isMenuOpen ? "brightness-0 invert" : ""}`}
                    />
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`w-10 h-10 rounded-full flex flex-col items-center justify-center space-y-1.5 transition-all ${isMenuOpen ? "bg-primary text-white" : isScrolled ? "bg-primary/5 text-primary" : "bg-white/10 text-white backdrop-blur-md"
                        }`}
                >
                    <motion.span
                        animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-0.5 bg-current rounded-full"
                    />
                    <motion.span
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-5 h-0.5 bg-current rounded-full"
                    />
                    <motion.span
                        animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-0.5 bg-current rounded-full"
                    />
                </button>
            </header>

            {/* Mobile Application-like Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-primary z-[55] overflow-y-auto pt-24 pb-10"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[10%] right-[-20%] w-[150%] aspect-square bg-secondary/20 rounded-full blur-[120px]" />
                        </div>

                        <div className="container mx-auto px-8 relative z-10">
                            {/* Main Navigation Links */}
                            <div className="space-y-2 mb-12">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-6">Navegação Principal</p>
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center group py-4 border-b border-white/5"
                                        >
                                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-secondary mr-4 group-hover:bg-secondary group-hover:text-white transition-all">
                                                {link.icon}
                                            </div>
                                            <span className="text-2xl font-display text-white group-hover:text-secondary transition-colors">
                                                {link.name}
                                            </span>
                                            <ChevronRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-secondary transition-all group-hover:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Secondary Actions / Featured Area */}
                            <div className="bg-white/5 rounded-[2rem] p-6 mb-12 border border-white/10">
                                <h4 className="text-white font-bold mb-2">LB Conexão Jurídica</h4>
                                <p className="text-white/50 text-sm mb-6">Elevando o padrão do Direito em Angola através da inovação e excelência.</p>
                                <Link
                                    href="/contato"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between bg-secondary text-primary font-bold p-4 rounded-2xl w-full"
                                >
                                    <span>Agendar Consultoria</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            {/* Contact & Socials */}
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Email</p>
                                    <a href="mailto:geral@lbconexao.com" className="text-white text-sm font-medium">geral@lbconexao.com</a>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Siga-nos</p>
                                    <div className="flex space-x-4">
                                        <Instagram className="w-5 h-5 text-white/50" />
                                        <Linkedin className="w-5 h-5 text-white/50" />
                                        <Facebook className="w-5 h-5 text-white/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Application Bottom Bar - Persistent on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 flex justify-around items-center h-20 px-4 pb-2">
                {navLinks.slice(0, 4).map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex flex-col items-center space-y-1 text-primary opacity-40 hover:opacity-100 transition-opacity"
                    >
                        <div className="p-1">{link.icon}</div>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{link.name}</span>
                    </Link>
                ))}
                <div className="relative -top-6">
                    <Link
                        href="/contato"
                        className="w-14 h-14 rounded-full secondary-gradient shadow-xl flex items-center justify-center text-white ring-8 ring-white"
                    >
                        <Mail className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
