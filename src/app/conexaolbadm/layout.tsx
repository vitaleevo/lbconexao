"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Calendar, Users, Menu, X, User, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAdminAuth } from "@/hooks/useAdminAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ConvexImage from "@/components/ConvexImage";

function AdminSidebarAvatar({ adminId }: { adminId: string }) {
    const adminData = useQuery(api.admins.getById, adminId ? { adminId: adminId as any } : "skip");

    return (
        <div className="w-10 h-10 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center border border-white/10 relative">
            {adminData?.avatar ? (
                <ConvexImage
                    storageId={adminData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
            ) : adminData ? (
                <User className="w-5 h-5 text-secondary" />
            ) : (
                <Loader2 className="w-4 h-4 text-white/20 animate-spin" />
            )}
        </div>
    );
}

function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { admin, isLoading, logout } = useAdminAuth();

    const isLoginPage = pathname === "/conexaolbadm/login";

    useEffect(() => {
        if (!isLoading && !admin && !isLoginPage) {
            router.push("/conexaolbadm/login");
        }
    }, [admin, isLoading, isLoginPage, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!admin && !isLoginPage) {
        return null;
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    const navItems = [
        { href: "/conexaolbadm", label: "Dashboard", icon: LayoutDashboard },
        { href: "/conexaolbadm/posts", label: "Notícias (Blog)", icon: FileText },
        { href: "/conexaolbadm/eventos", label: "Eventos", icon: Calendar },
        { href: "/conexaolbadm/contatos", label: "Contatos Recebidos", icon: Users },
        { href: "/conexaolbadm/perfil", label: "Meu Perfil", icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
            {/* Mobile Header */}
            <header className="md:hidden bg-primary text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
                <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-display font-bold text-secondary">LB Conexão</h2>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-white/5 rounded-lg active:bg-white/10"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-primary text-white border-r border-primary-light flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 md:w-64
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6 border-b border-white/10 hidden md:block">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-display font-bold text-secondary">
                            LB Conexão
                        </h2>
                    </div>
                    <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center space-x-3">
                            <AdminSidebarAvatar adminId={admin?.id as any} />
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold text-white truncate leading-none mb-1">
                                    {admin?.name || "Administrador"}
                                </p>
                                <p className="text-[10px] text-white/40 truncate leading-none">
                                    {admin?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 border-b border-white/10 md:hidden">
                    <h2 className="text-xl font-display font-bold text-secondary">Menu</h2>
                    <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5 font-bold" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-1">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 transition-all text-sm px-4 py-3 hover:bg-red-500/5 rounded-xl"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sair do Painel</span>
                    </button>

                    <Link
                        href="/"
                        className="flex items-center space-x-3 text-white/50 hover:text-white transition-all text-sm px-4 py-3 hover:bg-white/5 rounded-xl"
                    >
                        <span>&larr; Voltar ao site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto max-w-full">
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <ProtectedAdminLayout>{children}</ProtectedAdminLayout>
        </AuthProvider>
    );
}
