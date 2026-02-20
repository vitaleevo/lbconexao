"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
    Plus,
    Trash2,
    Edit2,
    ExternalLink,
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    Tag,
    X,
    Save,
    Loader2,
    Search,
    Filter,
    Star,
    Globe,
    CreditCard
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";
import MultiImageUpload from "@/components/MultiImageUpload";
import ConvexImage from "@/components/ConvexImage";

export default function AdminEventsPage() {
    const events = useQuery(api.events.listAll);
    const removeEvent = useMutation(api.events.remove);
    const createEvent = useMutation(api.events.create);
    const updateEvent = useMutation(api.events.update);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "Imersão",
        mode: "Presencial",
        price: "Grátis",
        registrationUrl: "",
        coverImage: "",
        status: "upcoming",
        featured: false,
        includedItemsText: "",
        gallery: [] as string[],
    });

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            type: "Imersão",
            mode: "Presencial",
            price: "Grátis",
            registrationUrl: "",
            coverImage: "",
            status: "upcoming",
            featured: false,
            includedItemsText: "",
            gallery: [],
        });
        setEditingEvent(null);
    };

    const openCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (event: any) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time || "",
            location: event.location,
            type: event.type,
            mode: event.mode,
            price: event.price,
            registrationUrl: event.registrationUrl || "",
            coverImage: event.coverImage || "",
            status: event.status,
            featured: event.featured || false,
            includedItemsText: event.includedItems ? event.includedItems.join("\n") : "",
            gallery: event.gallery || [],
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = { ...formData } as any;
        payload.includedItems = formData.includedItemsText
            .split("\n")
            .map(item => item.trim())
            .filter(item => item !== "");
        delete payload.includedItemsText;

        try {
            if (editingEvent) {
                await updateEvent({
                    id: editingEvent._id,
                    ...payload
                });
            } else {
                await createEvent(payload);
            }
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            alert("Erro ao salvar evento. Verifique os dados.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: Id<"events">) => {
        if (confirm("Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.")) {
            await removeEvent({ id });
        }
    };

    const filteredEvents = useMemo(() => {
        return events?.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    return (
        <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary mb-2">Eventos</h1>
                    <p className="text-gray-500 text-sm md:text-base">Gerencie a agenda, imersões e workshops.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="secondary-gradient text-white w-full md:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    <span>Novo Evento</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar por título ou local..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all">
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>
                        <div className="text-sm text-gray-400 px-4 whitespace-nowrap">
                            {filteredEvents?.length || 0} eventos
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Evento</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Data & Local</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredEvents?.map((event) => (
                                <tr key={event._id} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0 relative">
                                                <ConvexImage
                                                    storageId={event.coverImage}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                                    fallback="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=200"
                                                />
                                                {event.featured && (
                                                    <div className="absolute top-1 right-1 bg-amber-400 text-white p-1 rounded-lg shadow-lg">
                                                        <Star className="w-3 h-3 fill-current" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="max-w-md">
                                                <p className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{event.title}</p>
                                                <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">{event.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center text-sm font-semibold text-gray-700">
                                                <CalendarIcon className="w-3.5 h-3.5 mr-2 text-secondary" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center text-[10px] text-gray-400 uppercase font-medium">
                                                <MapPin className="w-3.5 h-3.5 mr-2" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${event.status === 'upcoming' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                            event.status === 'ongoing' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                'bg-gray-50 text-gray-500 border border-gray-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${event.status === 'upcoming' ? 'bg-blue-500' :
                                                event.status === 'ongoing' ? 'bg-emerald-500' :
                                                    'bg-gray-400'
                                                }`}></span>
                                            {event.status === 'upcoming' ? 'Agendado' :
                                                event.status === 'ongoing' ? 'Em Curso' :
                                                    'Concluído'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end items-center space-x-1">
                                            <Link
                                                href={`/eventos/${event._id}`}
                                                target="_blank"
                                                className="p-2.5 text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => openEditModal(event)}
                                                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!filteredEvents || filteredEvents.length === 0) && (
                    <div className="p-12 md:p-20 text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-1">Nenhum evento encontrado</h3>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            {searchTerm ? "Não encontramos resultados para a sua pesquisa." : "A sua agenda está vazia. Crie o seu primeiro evento!"}
                        </p>
                    </div>
                )}
            </div>

            {/* Modal CRUD */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="sticky top-0 bg-white p-6 md:p-8 border-b border-gray-100 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-xl md:text-2xl font-display font-bold text-primary">
                                    {editingEvent ? "Editar Evento" : "Novo Evento"}
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500">Preencha os detalhes da agenda jurídica.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-all"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column: Main Fields */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Nome do Evento</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-medium text-primary placeholder:text-gray-300 text-lg"
                                            placeholder="Ex: Imersão em Direito Laboral"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Descrição Completa</label>
                                        <RichTextEditor
                                            value={formData.description}
                                            onChange={(val) => setFormData({ ...formData, description: val })}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Localização / Platforma</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                    placeholder="Luanda ou Link Zoom"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Preço ou Tipo de Acesso</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                    placeholder="Grátis ou 25.000 AKZ"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Link de Inscrição (Opcional)</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input
                                                type="url"
                                                value={formData.registrationUrl}
                                                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                placeholder="https://suaplataforma.com/evento"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Itens Incluídos (Um por linha)</label>
                                        <textarea
                                            value={formData.includedItemsText}
                                            onChange={(e) => setFormData({ ...formData, includedItemsText: e.target.value })}
                                            rows={4}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all resize-none"
                                            placeholder="Certificado de Participação&#10;Material Didático&#10;Coffee Break"
                                        />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <MultiImageUpload
                                            label="Galeria de Fotos (Opcional)"
                                            value={formData.gallery}
                                            onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                                        />
                                    </div>
                                </div>

                                {/* Right Column: Sidebar */}
                                <div className="space-y-8 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                                    <ImageUpload
                                        label="Imagem de Capa"
                                        value={formData.coverImage}
                                        onChange={(url) => setFormData({ ...formData, coverImage: url })}
                                    />

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Data do Evento</label>
                                            <div className="relative">
                                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none text-sm"
                                                    placeholder="Ex: 15 de Junho, 2024"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Horário</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.time}
                                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none text-sm"
                                                    placeholder="Ex: 09:00 - 17:00"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Tipo</label>
                                                <select
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none text-sm"
                                                >
                                                    <option>Imersão</option>
                                                    <option>Workshop</option>
                                                    <option>Palestra</option>
                                                    <option>Consultoria</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Modalidade</label>
                                                <select
                                                    value={formData.mode}
                                                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none text-sm"
                                                >
                                                    <option>Presencial</option>
                                                    <option>Online</option>
                                                    <option>Híbrido</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-200">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-bold"
                                            >
                                                <option value="upcoming">Agendado</option>
                                                <option value="ongoing">Em Curso</option>
                                                <option value="completed">Concluído</option>
                                            </select>
                                        </div>

                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={formData.featured}
                                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                            </div>
                                            <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">Destaque na Home</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 pt-8 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-light transition-all disabled:opacity-50 shadow-xl shadow-primary/10"
                                >
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    <span>{editingEvent ? "Guardar Alterações" : "Criar Evento"}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Descartar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
