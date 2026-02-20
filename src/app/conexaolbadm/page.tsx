"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
    FileText,
    Calendar,
    Users,
    TrendingUp,
    Clock,
    ChevronRight,
    Mail,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import { Settings } from "lucide-react";

export default function AdminDashboardPage() {
    const posts = useQuery(api.posts.listAll);
    const events = useQuery(api.events.listAll);
    const contacts = useQuery(api.contacts.list);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Filter logic for some interesting stats
    const unreadContacts = contacts?.filter(c => c.status === "unread") || [];
    const upcomingEvents = events?.filter(e => e.status === "upcoming") || [];
    const featuredPosts = posts?.filter(p => p.featured) || [];

    const stats = [
        {
            label: "Total de Notícias",
            value: posts?.length ?? "...",
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: `${featuredPosts.length} em destaque`
        },
        {
            label: "Eventos Geridos",
            value: events?.length ?? "...",
            icon: Calendar,
            color: "text-amber-600",
            bg: "bg-amber-50",
            description: `${upcomingEvents.length} agendados`
        },
        {
            label: "Contatos",
            value: contacts?.length ?? "...",
            icon: Users,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            description: `${unreadContacts.length} por ler`
        }
    ];

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-2">
                        Painel Geral
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        Visão geral da LB Conexão Jurídica. Gerencie seu conteúdo e interações aqui.
                    </p>
                </div>
                <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-primary font-bold text-sm hover:shadow-lg transition-all self-start md:self-center"
                >
                    <Settings className="w-4 h-4 text-secondary" />
                    <span>Segurança da Conta</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                                <span className="text-[10px] font-medium text-gray-500 uppercase">{stat.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Contacts */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h2 className="font-display font-bold text-xl text-primary">Últimos Contatos</h2>
                        </div>
                        <Link href="/conexaolbadm/contatos" className="text-sm font-medium text-secondary hover:underline flex items-center">
                            Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {contacts?.slice(0, 4).map((contact) => (
                            <div key={contact._id} className="p-5 hover:bg-gray-50/50 transition-colors flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-bold text-primary text-sm">{contact.name}</h3>
                                        {contact.status === "unread" && (
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-1">{contact.subject}</p>
                                </div>
                                <span className="text-[10px] font-medium text-gray-400">
                                    {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        )) || (
                                <div className="p-10 text-center text-gray-400 text-sm">Carregando contatos...</div>
                            )}
                        {contacts && contacts.length === 0 && (
                            <div className="p-10 text-center text-gray-400 text-sm italic">Nenhum contato recebido ainda.</div>
                        )}
                    </div>
                </section>

                {/* Recent Posts */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h2 className="font-display font-bold text-xl text-primary">Publicações Recentes</h2>
                        </div>
                        <Link href="/conexaolbadm/posts" className="text-sm font-medium text-secondary hover:underline flex items-center">
                            Gerenciar <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {posts?.slice(0, 4).map((post) => (
                            <div key={post._id} className="p-5 hover:bg-gray-50/50 transition-colors flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                    {post.coverImage ? (
                                        <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary text-sm line-clamp-1">{post.title}</h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${post.published ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {post.published ? 'Publicado' : 'Rascunho'}
                                        </span>
                                        {post.featured && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold uppercase">
                                                Destaque
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )) || (
                                <div className="p-10 text-center text-gray-400 text-sm">Carregando postagens...</div>
                            )}
                        {posts && posts.length === 0 && (
                            <div className="p-10 text-center text-gray-400 text-sm italic">Nenhuma notícia publicada ainda.</div>
                        )}
                    </div>
                </section>
            </div>

            {/* Quick Actions / Status */}
            <div className="bg-primary rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 shadow-xl shadow-primary/20">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Sistema Operacional</h4>
                        <p className="text-white/60 text-sm">Todos os serviços da LB Conexão estão sincronizados.</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Link href="/conexaolbadm/posts" className="px-6 py-3 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-secondary hover:text-white transition-all">
                        Nova Notícia
                    </Link>
                    <Link href="/conexaolbadm/eventos" className="px-6 py-3 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">
                        Criar Evento
                    </Link>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
}
