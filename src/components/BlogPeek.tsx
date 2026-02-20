"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BlogPeek() {
    const posts = [
        {
            id: 1,
            title: "Impacto da Nova Lei Geral do Trabalho em Angola",
            category: "Direito do Trabalho",
            date: "15 Fev, 2026",
            author: "Dra. Ana Paula",
            readTime: "8 min",
            excerpt: "Uma análise detalhada sobre as principais alterações e como elas impactam o dia a dia das empresas angolanas.",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Desafios do Direito Comercial na Economia Digital",
            category: "Direito Comercial",
            date: "12 Fev, 2026",
            author: "Dr. João Silva",
            readTime: "12 min",
            excerpt: "Como as transações digitais e a inteligência artificial estão a moldar o novo cenário jurídico em Angola.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Consultoria Jurídica: Por que sua empresa precisa?",
            category: "Dicas Práticas",
            date: "10 Fev, 2026",
            author: "Equipe LB",
            readTime: "5 min",
            excerpt: "A prevenção através do acompanhamento especializado é o maior activo de uma gestão segura.",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
        },
    ]

    return (
        <section id="blog" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6"
                        >
                            <div className="w-8 h-[1px] bg-secondary" />
                            <span>Insights Jurídicos</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-display text-primary leading-tight">
                            Perspectivas de <br />
                            <span className="italic">Lideranças no Direito</span>
                        </h2>
                    </div>
                    <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-primary/40 hover:text-secondary group flex items-center transition-colors pb-2 border-b border-primary/5">
                        Explorar Todo o Blog
                        <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group bg-[#FCFCFD] p-6 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:border-secondary/20 transition-all duration-500"
                        >
                            <div className="relative aspect-[16/11] rounded-[2.5rem] overflow-hidden mb-8">
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt={post.title}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                                    <span>{post.date}</span>
                                    <div className="w-1.5 h-1.5 bg-secondary/20 rounded-full" />
                                    <span>{post.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 italic font-light">
                                    &ldquo;{post.excerpt}&rdquo;
                                </p>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary text-[10px] font-bold">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{post.author}</span>
                                    </div>
                                    <Link href={`/blog/${post.id}`} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
