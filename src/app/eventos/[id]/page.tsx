"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowLeft, Users, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import ConvexImage from "@/components/ConvexImage"

export default function EventDetail() {
    const params = useParams()
    const id = params.id as Id<"events">
    const event = useQuery(api.events.getById, { id })
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (event?.gallery && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % event.gallery.length)
        }
    }

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (event?.gallery && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + event.gallery.length) % event.gallery.length)
        }
    }

    if (event === undefined) {
        return (
            <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center font-display text-primary text-2xl">
                A carregar evento...
            </div>
        )
    }

    if (event === null) {
        return (
            <div className="min-h-screen bg-[#FCFCFD] flex flex-col items-center justify-center font-display text-primary text-2xl">
                <div>Evento não encontrado.</div>
                <Link href="/eventos" className="mt-8 text-sm font-bold text-secondary flex items-center group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Regressar à Agenda
                </Link>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Header Hero */}
            <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
                <ConvexImage
                    storageId={event.coverImage}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    fallback="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200"
                />
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
                                {event.type || "Evento"}
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
                                <p className="font-bold text-primary">{event.date || "A Confirmar"}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Horário</p>
                                <p className="font-bold text-primary">{event.time || "A Confirmar"}</p>
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
                            <div
                                className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary prose-p:text-gray-600 prose-p:leading-relaxed mb-12"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />

                            {event.includedItems && event.includedItems.length > 0 && (
                                <>
                                    <h4 className="text-xl font-bold text-primary mb-8">O que está incluído:</h4>
                                    <div className="grid sm:grid-cols-2 gap-4 mb-16">
                                        {event.includedItems.map((item, i) => (
                                            <div key={i} className="flex items-center p-6 bg-white border border-gray-100 rounded-[2rem] group hover:border-secondary/30 transition-colors shadow-sm">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mr-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-primary/80 text-sm leading-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {event.gallery && event.gallery.length > 0 && (
                                <div className="mt-16">
                                    <div className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6">
                                        <div className="w-8 h-[1px] bg-secondary" />
                                        <span>Galeria</span>
                                    </div>
                                    <h4 className="text-3xl font-display text-primary mb-8">Momentos do Evento</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {event.gallery.map((storageId, i) => (
                                            <motion.div
                                                key={i}
                                                className="aspect-square rounded-[2rem] overflow-hidden group cursor-pointer relative"
                                                onClick={() => setSelectedImageIndex(i)}
                                                whileHover={{ y: -5 }}
                                            >
                                                <ConvexImage
                                                    storageId={storageId}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    alt={`Galeria de ${event.title} - Foto ${i + 1}`}
                                                    fallback="https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=600"
                                                />
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                    <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">Visualizar</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-primary p-10 rounded-[3rem] sticky top-32 shadow-2xl overflow-hidden text-center text-white">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                                <Users className="w-12 h-12 text-secondary mx-auto mb-6" />
                                <h4 className="text-2xl font-display mb-4">Reserve sua Vaga</h4>
                                <p className="text-white/60 mb-8 text-sm">{event.mode || "Online e/ou Presencial"}</p>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                    <p className="text-xs text-white/40 uppercase mb-2">Investimento</p>
                                    <p className="text-2xl font-bold text-secondary">{event.price || "Consulte-nos"}</p>
                                </div>

                                {event.registrationUrl ? (
                                    <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="secondary-gradient w-full py-5 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all text-white flex justify-center items-center">
                                        Inscrever-me Agora
                                    </Link>
                                ) : (
                                    <Link href="/#contacto" className="secondary-gradient w-full py-5 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all text-white flex justify-center items-center">
                                        Mais Informações
                                    </Link>
                                )}
                                <p className="mt-6 text-[10px] text-white/30 uppercase tracking-widest font-bold">Inscrições seguras via Multicaixa Express ou Transferência</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && event?.gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 md:top-10 md:right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                            {event.gallery.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-0 md:-left-20 p-4 text-white/40 hover:text-white transition-all z-10"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="w-10 h-10" />
                                    </button>
                                    <button
                                        className="absolute right-0 md:-right-20 p-4 text-white/40 hover:text-white transition-all z-10"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="w-10 h-10" />
                                    </button>
                                </>
                            )}

                            <motion.div
                                key={selectedImageIndex}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ConvexImage
                                    storageId={event.gallery[selectedImageIndex]}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                                    fallback="https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=1200"
                                />

                                <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                                        Foto {selectedImageIndex + 1} de {event.gallery.length}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
