"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
    User,
    Mail,
    Phone,
    Briefcase,
    FileText,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Shield,
    Key
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import { motion } from "framer-motion";

export default function AdminProfilePage() {
    const { admin, login } = useAdminAuth();
    const adminData = useQuery(api.admins.getById, admin ? { adminId: admin.id as any } : "skip");
    const updateProfile = useMutation(api.admins.updateProfile);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        role: "",
        avatar: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        if (adminData) {
            setFormData({
                name: adminData.name || "",
                email: adminData.email || "",
                phone: adminData.phone || "",
                bio: adminData.bio || "",
                role: adminData.role || "",
                avatar: adminData.avatar || ""
            });
        }
    }, [adminData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!admin) return;

        setIsLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const result = await updateProfile({
                adminId: admin.id as any,
                ...formData
            });

            if (result.success) {
                // Update local context to sync sidebar
                login({
                    id: admin.id,
                    email: formData.email,
                    name: formData.name
                });

                setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            } else {
                setMessage({ type: "error", text: result.message || "Erro ao atualizar perfil." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Erro ao processar a solicitação." });
        } finally {
            setIsLoading(false);
        }
    };

    if (!adminData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-2">
                    Meu Perfil
                </h1>
                <p className="text-gray-500">
                    Gerencie suas informações pessoais e configurações de conta.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar and Quick Stats */}
                <div className="space-y-6">
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-xl bg-gray-100 mx-auto">
                                {formData.avatar ? (
                                    <AdminAvatar src={formData.avatar} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <User className="w-16 h-16" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow-lg">
                                <Shield className="w-5 h-5" />
                            </div>
                        </div>
                        <h2 className="text-xl font-display font-bold text-primary">{formData.name || "Administrador"}</h2>
                        <p className="text-sm text-secondary font-bold uppercase tracking-widest mt-1">{formData.role || "Nível de Acesso"}</p>

                        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col space-y-3">
                            <button
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="flex items-center justify-center space-x-2 w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-primary font-bold text-xs transition-all"
                            >
                                <Key className="w-4 h-4 text-secondary" />
                                <span>Alterar Senha</span>
                            </button>
                        </div>
                    </section>

                    <section className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Segurança</h3>
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed">
                            Sua conta está protegida com autenticação criptografada. Mantenha seus dados sempre atualizados para facilitar a recuperação.
                        </p>
                    </section>
                </div>

                {/* Right Column: Form */}
                <div className="lg:col-span-2">
                    <section className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-center space-x-3 p-4 rounded-2xl text-sm ${message.type === "success"
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        : "bg-red-50 text-red-600 border border-red-100"
                                        }`}
                                >
                                    {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <span className="font-medium">{message.text}</span>
                                </motion.div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Nome Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                            placeholder="Ex: Alexander Vitale"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">E-mail Administrativo</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                            placeholder="negociosvitaleevo@gmail.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Telefone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                            placeholder="+244 9XX XXX XXX"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Cargo / Função</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                            placeholder="Ex: Diretor de Marketing"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Pequena Bio</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm resize-none"
                                        placeholder="Conte um pouco sobre suas responsabilidades..."
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                <ImageUpload
                                    label="Foto de Perfil"
                                    value={formData.avatar}
                                    onChange={(url) => setFormData({ ...formData, avatar: url })}
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center space-x-2 px-10 py-4 bg-secondary text-white font-bold rounded-2xl shadow-lg shadow-secondary/20 hover:bg-secondary-light transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>A guardar...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            <span>Guardar Alterações</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
}

function AdminAvatar({ src }: { src: string }) {
    const isUrl = src.startsWith('http') || src.startsWith('data:');
    const storageUrl = useQuery(api.files.getUrl, !isUrl ? { storageId: src as any } : "skip");
    const finalUrl = isUrl ? src : storageUrl;

    if (!finalUrl) return <div className="w-full h-full bg-gray-100 animate-pulse" />;
    return <img src={finalUrl} alt="Avatar" className="w-full h-full object-cover" />;
}
