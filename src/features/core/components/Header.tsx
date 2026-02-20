"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

export interface HeaderProps {
  variant?: "default" | "transparent"
}

export function Header({ variant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Eventos", href: "/eventos" },
    { name: "Contato", href: "/contato" },
  ]

  const isTransparent = variant === "transparent"
  const showScrolledStyle = isScrolled || !isTransparent

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showScrolledStyle
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center border font-display font-bold text-xl",
            showScrolledStyle
              ? "bg-gradient-to-r from-primary to-primary-light text-secondary border-white/20"
              : "bg-white/10 text-white border-white/20"
          )}>
            LB
          </div>
          <span className={cn(
            "font-display font-bold text-xl transition-colors duration-300",
            showScrolledStyle ? "text-primary" : "text-white"
          )}>
            LB CONEXÃO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium transition-colors hover:text-secondary",
                showScrolledStyle
                  ? "text-primary/70 hover:text-primary"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="group"
            asChild={true}
          >
            <Link href="/#contacto">
              Fale Conosco
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={cn("w-6 h-6", showScrolledStyle ? "text-primary" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", showScrolledStyle ? "text-primary" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary font-medium p-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}