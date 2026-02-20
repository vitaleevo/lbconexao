"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { ArrowRight, Search, Calendar, User, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"
import { useBlogPosts, useFeaturedPost } from "@/features/blog/hooks/useBlogPosts"
import ConvexImage from "@/components/ConvexImage"

const categories = ["Todos", "Direito do Trabalho", "Direito Comercial", "Direito Fiscal", "Consultoria", "Dicas Práticas"]

export default function BlogPage() {
    const { posts: allPosts, loading: postsLoading } = useBlogPosts()
    const { featuredPost, loading: featuredLoading } = useFeaturedPost()

    // Loading state while fetching from Convex
    if (postsLoading || featuredLoading) {
        return (
            <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center font-display text-primary text-2xl">
                A carregar artigos...
            </div>
        )
    }

    const displayFeatured = featuredPost || (allPosts && allPosts.length > 0 ? allPosts[0] : null)
    const displayRegular = allPosts?.filter(p => p._id !== displayFeatured?._id) || []

    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Premium Header */}
            <section className="pt-32 pb-20 premium-gradient relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200"
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
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-secondary-light font-bold text-xs uppercase tracking-[0.3em] block mb-6">Conhecimento Jurídico</span>
                            <h1 className="text-5xl md:text-6xl font-display text-white mb-8 leading-tight">
                                Blog <span className="italic text-secondary-light">LB Conexão</span>
                            </h1>
                            <p className="text-xl text-white/70 leading-relaxed">
                                Explore análises profundas, guias práticos e todas as atualizações legislativas essenciais para o mercado angolano.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {displayFeatured && (
                <section className="py-20 -mt-10 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row"
                        >
                            <div className="lg:w-3/5 relative overflow-hidden h-[400px] lg:h-auto bg-gray-100">
                                {displayFeatured.coverImage ? (
                                    <ConvexImage
                                        storageId={displayFeatured.coverImage}
                                        alt={displayFeatured.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        fallback="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop"
                                    />
                                ) : (
                                    <img
                                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop"
                                        alt="Placeholder"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:hidden" />
                            </div>
                            <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="bg-secondary/10 text-secondary text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-[0.2em]">Destaque</span>
                                    <span className="text-gray-400 text-xs font-medium flex items-center">
                                        <Clock className="w-3 h-3 mr-1" /> {displayFeatured.readTime || "5 min"}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display text-primary mb-6 group-hover:text-secondary transition-colors leading-snug">
                                    {displayFeatured.title}
                                </h2>
                                <p className="text-gray-500 mb-10 leading-relaxed">
                                    {displayFeatured.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {displayFeatured.author ? displayFeatured.author.charAt(0) : "A"}
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold text-primary">{displayFeatured.author || "Equipe LB"}</p>
                                            <p className="text-gray-400">{displayFeatured.dateExtremity || "Recente"}</p>
                                        </div>
                                    </div>
                                    <Link href={`/blog/${displayFeatured.slug}`} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Filter and Content */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    {/* Navigation/Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 pb-8 border-b border-gray-100">
                        <div className="flex overflow-x-auto space-x-2 pb-2 w-full md:w-auto scrollbar-hide no-scrollbar">
                            {categories.map((cat, i) => (
                                <button
                                    key={i}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary/40 hover:bg-gray-50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80 group">
                            <input
                                type="text"
                                placeholder="Procurar artigo..."
                                className="w-full bg-white border border-gray-100 rounded-full py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:border-secondary transition-all shadow-sm"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-secondary transition-colors" />
                        </div>
                    </div>

                    {/* Regular Posts Grid */}
                    {displayRegular && displayRegular.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {displayRegular.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group bg-white p-5 rounded-[2.5rem] border border-gray-100/50 hover:shadow-2xl hover:border-secondary/20 transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 bg-gray-100">
                                        <ConvexImage
                                            storageId={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            fallback="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md text-primary text-[9px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest">
                                                Artigo
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 mb-4 px-2">
                                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{post.dateExtremity || "Recente"}</span>
                                        <span className="text-gray-200">|</span>
                                        <Clock className="w-3.5 h-3.5 text-secondary" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{post.readTime || "5 min"}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-primary mb-4 px-2 line-clamp-2 group-hover:text-secondary transition-colors leading-snug">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed px-2 line-clamp-3 mb-8">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between px-2">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-bold text-primary/60">{post.author || "Equipe LB"}</span>
                                        </div>
                                        <Link href={`/blog/${post.slug}`} className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center group/btn">
                                            Ler Mais
                                            <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">Nenhum artigo encontrado no momento.</div>
                    )}

                    {/* Pagination */}
                    {displayRegular && displayRegular.length > 0 && (
                        <div className="mt-20 flex justify-center items-center space-x-4">
                            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-secondary hover:text-secondary transition-all">
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                            <div className="flex space-x-2">
                                <button className="w-12 h-12 rounded-full bg-primary text-white font-bold shadow-lg">1</button>
                            </div>
                            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-secondary hover:text-secondary transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
