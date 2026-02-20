"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { Target, Eye, Heart, Sparkles, Users, BookOpen } from "lucide-react"

const valores = [
  { title: "Excelência", desc: "Compromisso com a mais alta qualidade em tudo que fazemos", icon: <Sparkles className="w-7 h-7" /> },
  { title: "Integridade", desc: "Atuamos com ética, transparência e responsabilidade", icon: <Heart className="w-7 h-7" /> },
  { title: "Inovação", desc: "Buscamos constantemente novas formas de agregar valor", icon: <BookOpen className="w-7 h-7" /> },
  { title: "Conexão", desc: "União entre profissionais, estudantes e instituições", icon: <Users className="w-7 h-7" /> },
]

export default function SobrePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 premium-gradient relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
            alt="Fundo Editorial"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-primary-light/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] block mb-6">Quem Somos</span>
            <h1 className="text-4xl md:text-6xl font-display text-white mb-8">
              Sobre a <span className="italic">LB Conexão</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Conectando profissionais do Direito em Angola através de excelência acadêmica
              e praticidade imersiva.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6">
                <div className="w-8 h-[1px] bg-secondary" />
                <span>Nossa História</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-primary mb-8 leading-tight">
                Uma jornada de <span className="italic">excelência</span> jurídica
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>
                  A LB Conexão Jurídica nasceu da visão de Luis Bastos de criar uma plataforma que verdadeiramente
                  conectasse profissionais do direito em Angola, oferecendo não apenas serviços jurídicos de excelência,
                  mas também oportunidades de crescimento e desenvolvimento profissional.
                </p>
                <p>
                  Com mais de 15 anos de experiência no mercado jurídico angolano, identificámos a necessidade de criar
                  um espaço onde profissionais pudessem não apenas receber consultoria especializada, mas também participar
                  de eventos enriquecedores e formações que os preparassem para os desafios do mercado moderno.
                </p>
                <p>
                  Desde a nossa fundação em Luanda, temos sido pioneiros na organização de eventos jurídicos de alto nível,
                  oferecendo imersões práticas únicas e assessoria empresarial estratégica.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-[#0A1628] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl group">
                <img
                  src="/img 3.jpg"
                  alt="Luis Bastos em Trabalho"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-12 left-12 right-12 z-10">
                  <div className="h-1 w-16 bg-secondary mb-6" />
                  <h3 className="text-3xl font-display text-white mb-3">Luis Bastos</h3>
                  <p className="text-white/60 text-sm">Fundador & CEO — Mais de 15 anos de experiência em direito empresarial e consultoria jurídica em Angola.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-24 bg-[#FCFCFD]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 bg-white rounded-[2.5rem] border border-gray-100 hover:border-secondary/20 transition-all duration-500 overflow-hidden group"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display text-primary mb-6">Nossa Missão</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                Fortalecer a comunidade jurídica angolana através de conexões profissionais,
                consultoria especializada no direito angolano e eventos que promovam a excelência
                e o desenvolvimento contínuo dos profissionais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-12 bg-white rounded-[2.5rem] border border-gray-100 hover:border-secondary/20 transition-all duration-500 overflow-hidden group"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display text-primary mb-6">Nossa Visão</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                Ser a principal referência em formação prática e imersiva em direito em Angola
                e na lusofonia, conectando profissionais e estudantes através de experiências
                transformadoras e conteúdos inovadores.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] block mb-4">Princípios</span>
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">Nossos Valores</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Princípios que guiam cada ação e decisão da nossa organização
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group bg-[#FCFCFD] p-8 rounded-[2rem] border border-gray-100 text-center hover:border-secondary/20 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  {valor.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{valor.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{valor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Pronto para Conectar-se?</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Junte-se a nós e faça parte de uma comunidade jurídica em constante evolução
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contacto" className="secondary-gradient text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform inline-flex items-center justify-center">
                Entrar em Contato
              </Link>
              <Link href="/#sobre" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all inline-flex items-center justify-center">
                Conhecer Programas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}