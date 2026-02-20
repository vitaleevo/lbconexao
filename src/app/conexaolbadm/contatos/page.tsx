"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
    Mail,
    CheckCircle2,
    MessageSquare,
    Clock,
    Trash2,
    Search,
    Reply
} from "lucide-react";
import { useState, useMemo } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

export default function AdminContactsPage() {
    const contacts = useQuery(api.contacts.list);
    const updateStatus = useMutation(api.contacts.updateStatus);
    const removeContact = useMutation(api.contacts.remove);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'unread', 'read'

    const handleToggleRead = async (id: Id<"contacts">, currentStatus: string) => {
        const newStatus = currentStatus === "unread" ? "read" : "unread";
        await updateStatus({ id, status: newStatus });
    };

    const handleDelete = async (id: Id<"contacts">) => {
        if (confirm("Tem certeza que deseja excluir esta mensagem? Esta ação é irreversível.")) {
            await removeContact({ id });
        }
    };

    const openMailClient = (email: string, subject: string) => {
        window.location.href = `mailto:${email}?subject=RE: ${encodeURIComponent(subject)}`;
    };

    const filteredContacts = useMemo(() => {
        return contacts?.filter(contact => {
            const matchesSearch =
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === "all" ? true : contact.status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [contacts, searchTerm, filterStatus]);

    const unreadCount = contacts?.filter(c => c.status === "unread").length || 0;

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-2">Mensagens & Contatos</h1>
                    <p className="text-gray-500">Gestão de leads e contatos recebidos pelo site.</p>
                </div>

                {/* Stats Cards */}
                <div className="flex items-center space-x-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Por Ler</p>
                            <p className="text-2xl font-display font-bold text-primary leading-none mt-1">{unreadCount}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total</p>
                            <p className="text-2xl font-display font-bold text-primary leading-none mt-1">{contacts?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="relative w-full md:flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, email ou assunto..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center w-full md:w-auto p-1 bg-gray-50 rounded-xl">
                    <button
                        onClick={() => setFilterStatus("all")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === "all" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-primary"}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilterStatus("unread")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === "unread" ? "bg-white text-orange-500 shadow-sm" : "text-gray-400 hover:text-primary"}`}
                    >
                        Por Ler
                    </button>
                    <button
                        onClick={() => setFilterStatus("read")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === "read" ? "bg-white text-emerald-500 shadow-sm" : "text-gray-400 hover:text-primary"}`}
                    >
                        Lidos
                    </button>
                </div>
            </div>

            {/* Contacts Timeline / List */}
            <div className="space-y-6">
                {filteredContacts?.map((contact) => (
                    <div
                        key={contact._id}
                        className={`group bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${contact.status === "unread"
                            ? "border-orange-200 shadow-lg shadow-orange-500/5 relative"
                            : "border-gray-100 opacity-90 hover:opacity-100"
                            }`}
                    >
                        {/* Unread Indicator Bar */}
                        {contact.status === "unread" && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-red-400" />
                        )}

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                <div className="flex items-center space-x-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${contact.status === "unread"
                                        ? "bg-gradient-to-br from-orange-50 to-red-50 text-orange-500 border-orange-100"
                                        : "bg-gray-50 text-gray-400 border-gray-100"
                                        }`}>
                                        <Mail className={`w-6 h-6 ${contact.status === "unread" ? "fill-orange-100" : ""}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-primary">{contact.name}</h3>
                                        <a href={`mailto:${contact.email}`} className="text-sm text-secondary hover:text-secondary-dark transition-colors font-medium">
                                            {contact.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center space-x-3 w-full md:w-auto justify-between md:justify-end border-t border-gray-100 md:border-0 pt-4 md:pt-0">
                                    <span className="text-xs font-bold text-gray-400 flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <Clock className="w-3.5 h-3.5 mr-2" />
                                        {new Date(contact.createdAt).toLocaleDateString('pt-AO')} às {new Date(contact.createdAt).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}
                                    </span>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => openMailClient(contact.email, contact.subject)}
                                            className="p-2.5 rounded-xl transition-all bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-100"
                                            title="Responder por Email"
                                        >
                                            <Reply className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleToggleRead(contact._id, contact.status)}
                                            className={`p-2.5 rounded-xl transition-all border ${contact.status === "unread"
                                                ? "bg-orange-500 text-white border-orange-600 hover:bg-orange-600 shadow-md shadow-orange-500/20"
                                                : "bg-gray-50 text-emerald-500 border-gray-100 hover:bg-emerald-50 hover:border-emerald-200"
                                                }`}
                                            title={contact.status === "unread" ? "Marcar como lido" : "Marcar como não lido"}
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="p-2.5 rounded-xl transition-all bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-100 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Eliminar Mensagem"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#FCFCFD] p-6 lg:p-8 rounded-2xl border border-gray-100 relative group-hover:border-gray-200 transition-colors">
                                <MessageSquare className="absolute top-6 right-6 w-12 h-12 text-gray-50 opacity-50 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest bg-gray-100 px-3 py-1 rounded-md">Assunto</span>
                                        <p className="font-bold text-primary">{contact.subject}</p>
                                    </div>
                                    <div className="w-10 h-px bg-gray-200 mb-4" />
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">
                                        {contact.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {(!filteredContacts || filteredContacts.length === 0) && (
                    <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Caixa de Entrada Vazia</h3>
                        <p className="text-gray-400">
                            {searchTerm || filterStatus !== "all"
                                ? "Nenhum resultado encontrado para os filtros atuais."
                                : "Ainda não recebeu nenhuma mensagem."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
