"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import MobileNavigation from "./MobileNav"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Início", href: "/" },
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Serviços", href: "/servicos" },
        { name: "Blog", href: "/blog" },
        { name: "Eventos", href: "/eventos" },
        { name: "Contacto", href: "/contato" },
    ]

    return (
        <>
            {/* Desktop Navbar - Hidden on Mobile */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <img
                            src="/logo.png"
                            alt="LB Conexão"
                            className={`h-24 w-auto transition-all duration-300 transform hover:scale-105 ${isScrolled ? "scale-90" : "brightness-0 invert opacity-90"}`}
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-colors hover:text-secondary ${isScrolled ? "text-primary/70" : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contato"
                            className="secondary-gradient text-white px-6 py-2.5 rounded-full font-semibold flex items-center group transition-transform hover:scale-105 active:scale-95"
                        >
                            Fale Conosco
                            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Specialized Navigation */}
            <MobileNavigation />
        </>
    )
}
