import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import BlogPeek from "@/components/BlogPeek"
import EventsPeek from "@/components/EventsPeek"
import Footer from "@/components/Footer"
import { Phone, Mail } from "lucide-react"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <EventsPeek />
      <BlogPeek />

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-3">Contacto</h2>
              <h3 className="text-4xl md:text-5xl font-display text-primary mb-8">Estamos prontos para lhe ouvir</h3>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                Seja para uma consultoria especializada, dúvidas sobre cursos ou parcerias institucionais, a nossa equipa está à disposição.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg mb-1">Telefone</h5>
                    <p className="text-gray-500">+(244) 922 600 019</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg mb-1">E-mail</h5>
                    <p className="text-gray-500">geral@lbconexao.com</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-display text-white mb-6">Mantenha-se Atualizado</h3>
              <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto">
                Receba as últimas notícias sobre o direito angolano e notificações sobre novos eventos diretamente no seu e-mail.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-secondary transition-all"
                  required
                />
                <button className="secondary-gradient text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
