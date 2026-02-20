import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to hash password using Web Crypto API (supported in Convex)
async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const getByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("admins")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
    },
});

export const getById = query({
    args: { adminId: v.id("admins") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.adminId);
    },
});

export const login = mutation({
    args: { email: v.string(), password: v.string() },
    handler: async (ctx, args) => {
        const admin = await ctx.db
            .query("admins")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (!admin) {
            return { success: false, message: "Administrador não encontrado." };
        }

        const hashedPassword = await hashPassword(args.password);
        if (hashedPassword !== admin.password) {
            return { success: false, message: "Senha incorreta." };
        }

        return {
            success: true,
            adminId: admin._id,
            email: admin.email,
            name: admin.name
        };
    },
});

export const updatePassword = mutation({
    args: {
        adminId: v.id("admins"),
        currentPassword: v.string(),
        newPassword: v.string()
    },
    handler: async (ctx, args) => {
        const admin = await ctx.db.get(args.adminId);
        if (!admin) throw new Error("Admin not found");

        const currentHashed = await hashPassword(args.currentPassword);
        if (currentHashed !== admin.password) {
            return { success: false, message: "Senha atual incorreta." };
        }

        const newHashed = await hashPassword(args.newPassword);
        await ctx.db.patch(args.adminId, { password: newHashed });

        return { success: true };
    },
});

export const updateProfile = mutation({
    args: {
        adminId: v.id("admins"),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        bio: v.optional(v.string()),
        avatar: v.optional(v.string()),
        role: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { adminId, ...updates } = args;
        const admin = await ctx.db.get(adminId);
        if (!admin) throw new Error("Admin not found");

        // Check if email is being changed and if it's already taken
        if (updates.email && updates.email !== admin.email) {
            const existing = await ctx.db
                .query("admins")
                .withIndex("by_email", (q) => q.eq("email", updates.email!))
                .unique();
            if (existing) {
                return { success: false, message: "Este e-mail já está em uso." };
            }
        }

        await ctx.db.patch(adminId, updates);
        return { success: true };
    },
});

export const recoveryPassword = mutation({
    args: {
        email: v.string(),
        masterKey: v.string(), // Security key defined in environment variables
        newPassword: v.string(),
    },
    handler: async (ctx, args) => {
        // Here we would ideally check against process.env.ADMIN_RECOVERY_KEY
        // For security in Convex, environment variables are accessed via process.env
        const RECOVERY_KEY = process.env.ADMIN_RECOVERY_KEY || "LB_MASTER_2024"; // Default for now, should be set in Convex Dashboard

        if (args.masterKey !== RECOVERY_KEY) {
            return { success: false, message: "Chave Mestra inválida." };
        }

        const admin = await ctx.db
            .query("admins")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (!admin) {
            return { success: false, message: "Administrador não encontrado." };
        }

        const hashed = await hashPassword(args.newPassword);
        await ctx.db.patch(admin._id, { password: hashed });

        return { success: true };
    },
});

// Seed function to create the initial admin
export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("admins").first();
        if (existing) return "Admin already exists";

        const hashedPassword = await hashPassword("123456");
        await ctx.db.insert("admins", {
            email: "negociosvitaleevo@gmail.com",
            password: hashedPassword,
            name: "Administrador",
            role: "Administrador Geral",
            bio: "Equipe de gestão da LB Conexão Jurídica.",
            phone: "+244 9XX XXX XXX"
        });

        return "Admin created successfully";
    },
});
