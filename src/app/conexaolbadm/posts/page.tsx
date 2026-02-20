"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
    Plus,
    Trash2,
    Edit2,
    ExternalLink,
    Search,
    Filter,
    FileText,
    Star,
    X,
    Save,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";
import ConvexImage from "@/components/ConvexImage";

export default function AdminPostsPage() {
    const posts = useQuery(api.posts.listAll);
    const removePost = useMutation(api.posts.remove);
    const createPost = useMutation(api.posts.create);
    const updatePost = useMutation(api.posts.update);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "LB Conexão",
        coverImage: "",
        featured: false,
        published: true,
        readTime: "5 min"
    });

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            author: "LB Conexão",
            coverImage: "",
            featured: false,
            published: true,
            readTime: "5 min"
        });
        setEditingPost(null);
    };

    const openCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (post: any) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            coverImage: post.coverImage || "",
            featured: post.featured,
            published: post.published,
            readTime: post.readTime || "5 min"
        });
        setIsModalOpen(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        setFormData({ ...formData, title, slug });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingPost) {
                await updatePost({
                    id: editingPost._id,
                    ...formData
                });
            } else {
                await createPost(formData);
            }
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Erro ao salvar post:", error);
            alert("Erro ao salvar publicação. Verifique os dados.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: Id<"posts">) => {
        if (confirm("Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.")) {
            await removePost({ id });
        }
    };

    const filteredPosts = useMemo(() => {
        return posts?.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);

    return (
        <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary mb-2">Notícias</h1>
                    <p className="text-gray-500 text-sm md:text-base">Gerencie todas as publicações e artigos do blog.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="secondary-gradient text-white w-full md:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nova Publicação</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar por título ou autor..."
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
                            {filteredPosts?.length || 0} publicações
                        </div>
                    </div>
                </div>
            </div>

            {/* Table/List Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Conteúdo</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Autor & Data</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPosts?.map((post) => (
                                <tr key={post._id} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0 relative">
                                                <ConvexImage
                                                    storageId={post.coverImage}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                                    fallback="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=200"
                                                />
                                                {post.featured && (
                                                    <div className="absolute top-1 right-1 bg-amber-400 text-white p-1 rounded-lg">
                                                        <Star className="w-3 h-3 fill-current" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="max-w-md">
                                                <p className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{post.title}</p>
                                                <p className="text-xs text-gray-400 mt-1 font-mono tracking-tighter">slug: {post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">{post.author}</span>
                                            <span className="text-[10px] text-gray-400 uppercase font-medium">{post.readTime || '5 min'} de leitura</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${post.published
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${post.published ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                {post.published ? 'Publicado' : 'Rascunho'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end items-center space-x-1">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2.5 text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
                                                title="Ver no site"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Eliminar"
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

                {(!filteredPosts || filteredPosts.length === 0) && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-1">Nenhuma publicação encontrada</h3>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            {searchTerm ? "Não encontramos resultados para a sua pesquisa." : "O seu blog ainda não tem publicações. Comece criando a primeira!"}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-4 text-sm font-bold text-secondary hover:underline"
                            >
                                Limpar pesquisa
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between text-sm text-gray-500 px-4">
                <p>Mostrando {filteredPosts?.length || 0} de {posts?.length || 0} publicações</p>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50" disabled>Próxima</button>
                </div>
            </div>

            {/* Modal CRUD */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="sticky top-0 bg-white p-6 md:p-8 border-b border-gray-100 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-xl md:text-2xl font-display font-bold text-primary">
                                    {editingPost ? "Editar Publicação" : "Nova Publicação"}
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500">Mantenha o conteúdo atualizado e relevante.</p>
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
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Título da Notícia</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-medium text-primary placeholder:text-gray-300 text-lg"
                                            placeholder="Ex: Novos serviços jurídicos em Luanda"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Conteúdo Principal</label>
                                        <RichTextEditor
                                            value={formData.content}
                                            onChange={(val) => setFormData({ ...formData, content: val })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Resumo Impactante (Excerpt)</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-medium text-primary resize-none placeholder:text-gray-300"
                                            placeholder="Um breve parágrafo que resume o artigo e atrai leitores..."
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
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Slug da URL</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-mono text-xs text-gray-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Autor</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.author}
                                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-medium text-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-200">
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
                                            <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">Em Destaque</span>
                                        </label>

                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={formData.published}
                                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </div>
                                            <span className="text-sm font-bold text-primary group-hover:text-emerald-500 transition-colors">Publicar</span>
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
                                    <span>{editingPost ? "Guardar Alterações" : "Publicar Artigo"}</span>
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
