"use client"

import { useState } from "react"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { MapPin, Clock, ArrowRight, Filter, Search, Users, Video, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import { useEvents, useFeaturedEvent } from "@/features/events/hooks/useEvents"
import ConvexImage from "@/components/ConvexImage"

const eventCategories = ["Todos", "Conferências", "Workshops", "Mentorias", "Webinars", "Imersões"]

export default function EventsPage() {
    const { events: allEvents, loading: eventsLoading } = useEvents()
    const { featuredEvent, loading: featuredLoading } = useFeaturedEvent()

    const [selectedCategory, setSelectedCategory] = useState("Todos")
    const [searchQuery, setSearchQuery] = useState("")

    if (eventsLoading || featuredLoading) {
        return (
            <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center font-display text-primary text-2xl">
                A carregar eventos...
            </div>
        )
    }

    const displayFeatured = featuredEvent || (allEvents && allEvents.length > 0 ? allEvents[0] : null)

    const displayRegular = allEvents?.filter(e => e._id !== displayFeatured?._id)
        ?.filter(e => selectedCategory === "Todos" || (e.type && e.type.toLowerCase() === selectedCategory.toLowerCase()))
        ?.filter(e =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (e.location && e.location.toLowerCase().includes(searchQuery.toLowerCase()))
        ) || []

    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <ConvexImage
                        storageId="https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?q=80&w=1200"
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

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-6">Agenda Jurídica</span>
                        <h1 className="text-5xl md:text-6xl font-display text-white mb-8">
                            Eventos & <span className="italic text-secondary">Imersões</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Desenvolva competências práticas através de experiências desenhadas para o sucesso na advocacia moderna.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Event Section */}
            {displayFeatured && (
                <section className="py-20 -mt-16 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 grid lg:grid-cols-2"
                    >
                        <div className="relative h-80 lg:h-auto overflow-hidden bg-gray-100">
                            <ConvexImage
                                storageId={displayFeatured.coverImage}
                                alt={displayFeatured.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                fallback="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                            <div className="absolute top-8 left-8 bg-secondary text-white px-6 py-3 rounded-2xl shadow-xl">
                                <div className="text-3xl font-display font-bold leading-none">{displayFeatured.date?.split(" ")[0] || "15"}</div>
                                <div className="text-xs uppercase font-bold tracking-widest">{displayFeatured.date?.split(" ")[2] || displayFeatured.date?.split(" ")[1] || "MÊS"}</div>
                            </div>
                        </div>
                        <div className="p-12 lg:p-20 flex flex-col justify-center">
                            <div className="flex items-center space-x-3 mb-8">
                                <span className="bg-primary/5 text-primary text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-primary/10">Destaque do Mês</span>
                                <span className="flex items-center text-xs text-gray-400">
                                    <Users className="w-4 h-4 mr-2 text-secondary" />
                                    Vagas Limitadas
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display text-primary mb-8 group-hover:text-secondary transition-colors">
                                {displayFeatured.title}
                            </h2>
                            <div
                                className="text-gray-500 text-lg mb-10 leading-relaxed line-clamp-3 prose prose-slate max-w-none prose-p:my-0"
                                dangerouslySetInnerHTML={{ __html: displayFeatured.description }}
                            />
                            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                                <div className="flex items-start">
                                    <Clock className="w-5 h-5 mr-4 text-secondary shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400 mb-1">Horário</p>
                                        <p className="text-primary font-medium">{displayFeatured.time || "A Confirmar"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 mr-4 text-secondary shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400 mb-1">Local</p>
                                        <p className="text-primary font-medium">{displayFeatured.location}</p>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={`/eventos/${displayFeatured._id}`}
                                className="secondary-gradient text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all w-full sm:w-max flex items-center justify-center"
                            >
                                Inscrever-me Agora
                                <ArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Content & Filters */}
            <section className="pb-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 pb-10 border-b border-gray-100">
                    <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar w-full md:w-auto">
                        {eventCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-100 text-primary/40 hover:border-secondary/30'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Procurar evento..."
                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-100 bg-white text-sm focus:outline-none focus:border-secondary transition-all"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-primary group hover:border-secondary transition-all">
                            <Filter className="w-5 h-5 group-hover:text-secondary transition-colors" />
                        </button>
                    </div>
                </div>

                {displayRegular && displayRegular.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-12">
                        {displayRegular.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group flex flex-col lg:flex-row bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-secondary/20 transition-all duration-500"
                            >
                                <div className="lg:w-2/5 relative h-64 lg:h-auto bg-gray-100">
                                    <ConvexImage
                                        storageId={event.coverImage}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        fallback="https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=800"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center ${event.mode === 'Digital' ? 'bg-blue-500/90 text-white' : 'bg-white/90 text-primary'}`}>
                                            {event.mode === 'Digital' ? <Video className="w-3 h-3 mr-2" /> : <MapIcon className="w-3 h-3 mr-2" />}
                                            {event.mode || "Evento"}
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <div className="text-2xl font-display font-bold text-primary group-hover:text-secondary transition-colors">{event.date?.split(" ")[0] || "15"}</div>
                                                <div className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">{event.date?.split(" ")[2] || event.date?.split(" ")[1] || "MÊS"}</div>
                                            </div>
                                            <div className="w-px h-8 bg-gray-100 mx-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{event.type || "Categoria"}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-bold text-gray-300">Investimento</p>
                                            <p className="text-sm font-bold text-primary">{event.price || "Sob Consulta"}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-6 group-hover:text-secondary transition-colors leading-snug">
                                        {event.title}
                                    </h3>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center text-sm text-gray-400 italic">
                                            <Clock className="w-4 h-4 mr-3 text-secondary" />
                                            {event.time || "A Confirmar"}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-400">
                                            <MapPin className="w-4 h-4 mr-3 text-secondary" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-gray-50">
                                        <Link
                                            href={`/eventos/${event._id}`}
                                            className="inline-block w-full py-4 rounded-2xl bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all text-center"
                                        >
                                            Saber Mais & Reserva
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">Nenhum evento agendado no momento.</div>
                )}

                {/* Newsletter Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 bg-primary p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-display text-white mb-6">Não Perca as <span className="italic text-secondary">Próximas Imersões</span></h3>
                        <p className="text-white/60 mb-10">Receba a agenda mensal da LB Conexão e garanta acesso a convites exclusivos antes de serem anunciados.</p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Seu e-mail profissional"
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-secondary transition-all"
                            />
                            <button className="secondary-gradient text-white px-10 py-4 rounded-2xl font-bold whitespace-nowrap">
                                Quero ser Notificado
                            </button>
                        </form>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}
