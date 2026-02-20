"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { Calendar, Clock, Share2, MessageSquare, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import ConvexImage from "@/components/ConvexImage"

export default function BlogPost() {
    const params = useParams()
    const slug = params.id as string
    const post = useQuery(api.posts.getBySlug, { slug })

    if (post === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center font-display text-primary text-2xl">
                A carregar artigo...
            </div>
        )
    }

    if (post === null) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center font-display text-primary text-2xl">
                <div>Artigo não encontrado.</div>
                <Link href="/blog" className="mt-8 text-sm font-bold text-secondary flex items-center group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Regressar ao Blog
                </Link>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[70vh] min-h-[500px] flex items-end overflow-hidden">
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <ConvexImage
                        storageId={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        fallback="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200"
                    />
                    {/* Multi-layered Overlay for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 pt-32 pb-16 md:pb-24">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Link href="/blog" className="inline-flex items-center text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-10 group hover:text-white transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
                                Regressar ao Blog
                            </Link>

                            <div className="flex items-center space-x-3 mb-6">
                                <span className="bg-secondary text-white text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-lg shadow-secondary/20">
                                    Artigo
                                </span>
                                <div className="h-px w-12 bg-white/30" />
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Notícias</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-10 leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 text-white/80">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold border border-white/20">
                                        {post.author ? post.author.charAt(0) : "A"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{post.author || "Equipe LB"}</p>
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest">Autor da Publicação</p>
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-white/10 hidden md:block" />

                                <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-secondary" />
                                        {post.dateExtremity || "Recently"}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-secondary" />
                                        {post.readTime || "5 min"} de leitura
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Post Content */}
            <article className="py-20 md:py-32 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        {/* Excerpt/Lead Paragraph */}
                        {post.excerpt && (
                            <div className="mb-16 pb-16 border-b border-gray-100">
                                <p className="text-2xl md:text-3xl font-display text-primary/80 italic leading-relaxed">
                                    "{post.excerpt}"
                                </p>
                            </div>
                        )}

                        <div
                            className="prose prose-xl prose-slate max-w-none 
                                prose-headings:font-display prose-headings:text-primary prose-headings:tracking-tight 
                                prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-[1.15rem]
                                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-16
                                prose-blockquote:border-l-secondary prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-primary prose-blockquote:font-medium
                                prose-strong:text-primary prose-strong:font-bold"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Actions & Sharing */}
                        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center space-x-6">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compartilhar:</span>
                                <div className="flex items-center space-x-3">
                                    <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all shadow-sm">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all shadow-sm">
                                        <MessageSquare className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {["Direito Angolano", "Justiça", "LB Conexão"].map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio Footer */}
                        <div className="mt-24 p-10 bg-primary rounded-[3rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center text-3xl font-display font-bold border border-white/20 shrink-0">
                                    {post.author ? post.author.charAt(0) : "A"}
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-2xl font-display font-bold mb-2">Publicado por {post.author || "Equipe LB"}</h4>
                                    <p className="text-white/60 leading-relaxed mb-6">Especialista em consultoria jurídica e estratégica, focado em trazer clareza e soluções eficientes para o cenário jurídico angolano.</p>
                                    <Link href="/blog" className="text-secondary font-bold text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center md:justify-start">
                                        Ver mais artigos <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
