"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/features/events/hooks/useEvents"
import ConvexImage from "@/components/ConvexImage"

export default function EventsPeek() {
    const { events, loading } = useEvents()
    const displayEvents = events ? events.slice(0, 2) : []

    if (loading) {
        return (
            <div className="py-32 bg-primary flex items-center justify-center font-display text-white text-2xl">
                A carregar...
            </div>
        )
    }

    return (
        <section id="agenda" className="py-32 bg-primary overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-4"
                        >
                            Próximos Momentos
                        </motion.span>
                        <h3 className="text-4xl md:text-6xl font-display text-white">Agenda de <span className="italic">Imersões</span></h3>
                    </div>
                    <Link href="/eventos" className="text-white/60 hover:text-secondary group flex items-center transition-colors text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                        Ver Agenda Completa
                        <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {displayEvents.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-10">
                        {displayEvents.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col md:flex-row bg-[#0A1628] rounded-[2rem] border border-white/5 hover:border-secondary/30 transition-all duration-500 overflow-hidden"
                            >
                                {/* Event Image */}
                                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                                    <ConvexImage
                                        storageId={event.coverImage}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        alt={event.title}
                                        fallback="https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=800"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-transparent to-transparent hidden md:block" />
                                </div>

                                {/* Event Content */}
                                <div className="flex-1 p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <div className="text-4xl font-display text-white group-hover:text-secondary transition-colors">{event.date?.split(" ")[0] || "15"}</div>
                                                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{event.date?.split(" ")[2] || event.date?.split(" ")[1] || "MÊS"}</div>
                                                </div>
                                                <div className="h-10 w-[1px] bg-white/10" />
                                                <span className="bg-secondary/10 text-secondary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                                                    {event.type || "Evento"}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-2xl font-bold text-white mb-6 group-hover:text-secondary transition-colors line-clamp-2">
                                            {event.title}
                                        </h4>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-white/40 italic">
                                            <Clock className="w-4 h-4 mr-3 text-secondary" />
                                            {event.time || "A Confirmar"}
                                        </div>
                                        <div className="flex items-center text-sm text-white/40">
                                            <MapPin className="w-4 h-4 mr-3 text-secondary" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <Link
                                            href={`/eventos/${event._id}`}
                                            className="w-full py-4 rounded-2xl bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all text-center"
                                        >
                                            Garantir Vaga & Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-10 text-center text-white/40">Nenhum evento agendado no momento.</div>
                )}
            </div>
        </section>
    )
}
