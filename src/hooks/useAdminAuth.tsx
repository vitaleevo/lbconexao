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

// Helper to set cookie
const setCookie = (name: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

// Helper to delete cookie
const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Helper to get cookie
const getCookie = (name: string) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedAdmin = localStorage.getItem("lb_admin");
        const sessionCookie = getCookie("lb_admin_session");

        if (storedAdmin && sessionCookie) {
            try {
                setAdmin(JSON.parse(storedAdmin));
            } catch (e) {
                console.error("Failed to parse stored admin", e);
                localStorage.removeItem("lb_admin");
                deleteCookie("lb_admin_session");
            }
        } else if (!sessionCookie) {
            // If cookie is gone, clear local storage too
            localStorage.removeItem("lb_admin");
            setAdmin(null);
        }
        setIsLoading(false);
    }, []);

    const login = (adminData: Admin) => {
        setAdmin(adminData);
        localStorage.setItem("lb_admin", JSON.stringify(adminData));
        // Set a session cookie that the Middleware can see
        setCookie("lb_admin_session", adminData.id);
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("lb_admin");
        deleteCookie("lb_admin_session");
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
