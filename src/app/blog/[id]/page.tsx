"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { Calendar, Clock, Share2, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - In a real app, this would come from a CMS or Database
const allPosts = [
    {
        id: 1,
        title: "Impacto da Nova Lei Geral do Trabalho em Angola",
        category: "Direito do Trabalho",
        date: "15 Fev, 2026",
        readTime: "8 min",
        author: "Dra. Ana Paula",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200",
        content: `
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A recém-aprovada Lei Geral do Trabalho (LGT) em Angola traz mudanças significativas que impactam diretamente a relação entre empregadores e colaboradores. Esta análise explora os pontos cruciais desta reforma.
            </p>

            <h2 className="text-3xl font-display text-primary mt-12 mb-6">1. Modalidades de Contrato</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
                Uma das principais alterações reside na simplificação das modalidades contratuais. O novo diploma penaliza menos a contratação por tempo indeterminado, incentivando a estabilidade laboral. No entanto, as regras para contratos a termo tornaram-se mais específicas para evitar abusos.
            </p>

            <blockquote className="border-l-4 border-secondary pl-8 my-10 italic text-2xl text-primary font-display">
                "O equilíbrio entre a protecção do trabalhador e a flexibilidade empresarial é o pilar desta nova legislação."
            </blockquote>

            <h2 className="text-3xl font-display text-primary mt-12 mb-6">2. Direitos de Personalidade</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
                A nova lei dá um destaque inédito à proteção da privacidade do trabalhador, regulando o uso de meios de vigilância à distância e a proteção de dados pessoais no âmbito laboral.
            </p>

            <div className="bg-gray-50 p-8 rounded-[2rem] my-10 border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-4">Pontos de Atenção para RH:</h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center"><ChevronRight className="w-4 h-4 text-secondary mr-2" /> Revisão de contratos vigentes.</li>
                    <li className="flex items-center"><ChevronRight className="w-4 h-4 text-secondary mr-2" /> Atualização de manuais de conduta internos.</li>
                    <li className="flex items-center"><ChevronRight className="w-4 h-4 text-secondary mr-2" /> Treinamento para gestores sobre as novas regras disciplinares.</li>
                </ul>
            </div>
        `
    }
]

export default function BlogPost() {
    const params = useParams()
    const post = allPosts.find(p => p.id === Number(params.id)) || allPosts[0]

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Post Header */}
            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center text-secondary text-xs font-bold uppercase tracking-widest mb-10 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Regressar ao Blog
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-secondary/10 text-secondary text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest mb-8 inline-block">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display text-primary mb-10 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 mb-12">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">{post.author}</p>
                                        <p className="text-xs text-gray-400">Consultora Jurídica</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-secondary" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-secondary" />
                                        {post.readTime} leitura
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="container mx-auto px-6 mb-20">
                    <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Post Content */}
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* Actions */}
                        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-bold text-primary uppercase">Compartilhar:</span>
                                <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                {["Direito", "Trabalho", "Angola"].map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
