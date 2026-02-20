"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowLeft, Users, CheckCircle2, Music, Coffee, BookOpen } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const allEvents = [
    {
        id: 1,
        title: "I Conferência de Direito Comercial Angolano",
        description: "Um evento de alto nível reunindo os principais especialistas do país para debater o futuro das relações comerciais e investimentos estrangeiros em Angola.",
        day: "25",
        month: "Março",
        fullDate: "25 de Março, 2026",
        time: "09:00 - 17:00",
        location: "Hotel Epic Sana, Luanda",
        type: "Conferência",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200",
    }
]

export default function EventDetail() {
    const params = useParams()
    const event = allEvents.find(e => e.id === Number(params.id)) || allEvents[0]

    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Header Hero */}
            <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
                <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-primary/40 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <Link href="/eventos" className="inline-flex items-center text-secondary-light text-xs font-bold uppercase tracking-[0.2em] mb-10 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Regressar à Agenda
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-secondary text-white text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest mb-6 inline-block shadow-xl">
                                {event.type}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-display text-white mb-8 leading-tight">
                                {event.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Info Bar */}
            <div className="bg-white border-b border-gray-100 shadow-sm relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 py-8 items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data</p>
                                <p className="font-bold text-primary">{event.fullDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Horário</p>
                                <p className="font-bold text-primary">{event.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Localização</p>
                                <p className="font-bold text-primary">{event.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20">
                        {/* Main Description */}
                        <div className="lg:col-span-8">
                            <h3 className="text-3xl font-display text-primary mb-8">Sobre o Evento</h3>
                            <p className="text-lg text-gray-500 leading-relaxed mb-12">
                                {event.description} Prepare-se para uma jornada de conhecimento focada nas tendências globais aplicadas ao ordenamento jurídico angolano. Oportunidade única para networking estratégico com sócios de grandes escritórios e diretores jurídicos de multinacionais.
                            </p>

                            <h4 className="text-xl font-bold text-primary mb-8">O que está incluído:</h4>
                            <div className="grid sm:grid-cols-2 gap-6 mb-16">
                                {[
                                    { icon: <BookOpen />, label: "Material Didático Exclusivo" },
                                    { icon: <Coffee />, label: "Coffee Break & Almoço Executive" },
                                    { icon: <CheckCircle2 />, label: "Certificado de Participação" },
                                    { icon: <Music />, label: "Cocktail de Networking" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center p-6 bg-white border border-gray-100 rounded-3xl">
                                        <div className="text-secondary mr-4">{item.icon}</div>
                                        <span className="font-bold text-primary/80">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-primary p-10 rounded-[3rem] sticky top-32 shadow-2xl overflow-hidden text-center text-white">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                                <Users className="w-12 h-12 text-secondary mx-auto mb-6" />
                                <h4 className="text-2xl font-display mb-4">Reserve sua Vaga</h4>
                                <p className="text-white/60 mb-8 text-sm">Vagas limitadas para garantir a qualidade das imersões.</p>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                    <p className="text-xs text-white/40 uppercase mb-2">Vagas Restantes</p>
                                    <p className="text-3xl font-bold text-secondary">08</p>
                                </div>

                                <button className="secondary-gradient w-full py-5 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all text-white">
                                    Inscrever-me Agora
                                </button>
                                <p className="mt-6 text-[10px] text-white/30 uppercase tracking-widest font-bold">Inscrições seguras via Multicaixa Express</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
