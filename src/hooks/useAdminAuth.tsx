"use client";

import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface Admin {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    admin: Admin | null;
    login: (admin: Admin) => void;
    logout: () => void;
    isLoading: boolean;
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedAdmin = localStorage.getItem("lb_admin");
        if (storedAdmin) {
            try {
                setAdmin(JSON.parse(storedAdmin));
            } catch (e) {
                console.error("Failed to parse stored admin", e);
                localStorage.removeItem("lb_admin");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (adminData: Admin) => {
        setAdmin(adminData);
        localStorage.setItem("lb_admin", JSON.stringify(adminData));
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("lb_admin");
        router.push("/conexaolbadm/login");
    };

    const contextValue: AuthContextType = {
        admin,
        login,
        logout,
        isLoading
    };

    return (
        <AdminAuthContext.Provider value={contextValue}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AuthProvider");
    }
    return context;
}
