"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"

export default function ContatoPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 premium-gradient relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1200"
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
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] block mb-6">Contacto</span>
            <h1 className="text-4xl md:text-6xl font-display text-white mb-8">
              Entre em <span className="italic">Contato</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Estamos prontos para ouvir você. Descubra como podemos
              conectar você ao sucesso jurídico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Informações de Contato + Formulário */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Informações */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6">
                <div className="w-8 h-[1px] bg-secondary" />
                <span>Informações</span>
              </div>
              <h2 className="text-4xl font-display text-primary mb-10">Informações de Contato</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1">Telefone</h3>
                    <p className="text-gray-500">+(244) 922 600 019</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1">E-mail</h3>
                    <p className="text-gray-500">geral@lbconexao.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1">Localização</h3>
                    <p className="text-gray-500">Rua Kwame Nkrumah, Maianga<br />Luanda, Angola</p>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className="p-8 bg-[#FCFCFD] rounded-[2rem] border border-gray-100 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-5 h-5 text-secondary" />
                  <h3 className="font-bold text-primary text-lg">Horário de Funcionamento</h3>
                </div>
                <div className="space-y-3 text-gray-500">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span className="font-medium text-primary">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-medium text-primary">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="font-medium text-primary">Fechado</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61574212834524" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/lbconexao_juridica/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-24 bg-[#FCFCFD]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display text-primary mb-4">Nosso Escritório</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Estamos localizados no coração de Luanda, prontos para atendê-lo pessoalmente
            </p>
          </motion.div>

          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15770.984746253744!2d13.2322!3d-8.8368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15c6e9c2f67%3A0xfa24be03ff6b0f4c!2sMaianga%2C%20Luanda!5e0!3m2!1spt-PT!2sao!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização LB Conexão Jurídica"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}