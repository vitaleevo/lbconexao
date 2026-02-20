"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck, Key, X, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

    const loginMutation = useMutation(api.admins.login);
    const { login } = useAdminAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await loginMutation({ email, password });
            if (result.success && result.adminId) {
                login({
                    id: result.adminId,
                    email: result.email!,
                    name: result.name,
                });
                router.push("/conexaolbadm");
            } else {
                setError(result.message || "Erro ao fazer login");
            }
        } catch (err) {
            setError("Ocorreu um erro inesperado. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center p-6 relative overflow-hidden text-white font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-block p-4 rounded-3xl bg-gradient-to-br from-primary to-primary-dark shadow-2xl shadow-primary/20 mb-6"
                    >
                        <Lock className="w-8 h-8 text-secondary" />
                    </motion.div>
                    <h1 className="text-4xl font-display font-bold mb-2 tracking-tight">LB Conexão</h1>
                    <p className="text-gray-400 font-medium">Painel Administrativo</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/10 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Senha</label>
                                <button
                                    type="button"
                                    onClick={() => setIsRecoveryOpen(true)}
                                    className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:text-secondary-light transition-colors"
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/10 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-secondary hover:bg-secondary-light text-white font-bold py-4 rounded-2xl shadow-xl shadow-secondary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Autenticando...</span>
                                </>
                            ) : (
                                <span>Entrar no Painel</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
                    >
                        &larr; Voltar para o Site Principal
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isRecoveryOpen && (
                    <RecoveryModal onClose={() => setIsRecoveryOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}

function RecoveryModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [masterKey, setMasterKey] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const recoverMutation = useMutation(api.admins.recoveryPassword);

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await recoverMutation({ email, masterKey, newPassword });
            if (result.success) {
                setStep(2);
            } else {
                setError(result.message || "Erro na recuperação");
            }
        } catch (err) {
            setError("Erro ao processar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-[#12141C] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 ? (
                    <form onSubmit={handleRecover} className="space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-display font-bold">Recuperação</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Insira seu e-mail e a <strong>Chave Mestra</strong> fornecida durante a implementação para definir uma nova senha.
                        </p>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">E-mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Chave Mestra de Segurança</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="password"
                                        value={masterKey}
                                        onChange={(e) => setMasterKey(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Nova Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Digite a nova senha"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-secondary transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-secondary text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-secondary/20 flex items-center justify-center space-x-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Redefinir Senha</span>}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-6 space-y-6">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-display font-bold">Tudo Pronto!</h2>
                        <p className="text-gray-400 text-sm">
                            Sua senha foi redefinida com sucesso. Você já pode fazer login com as novas credenciais.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Voltar para Login
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
