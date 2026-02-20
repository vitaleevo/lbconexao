import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("contacts").order("desc").collect();
    },
});

export const updateStatus = mutation({
    args: { id: v.id("contacts"), status: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});


export const remove = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("contacts", {
            ...args,
            status: "unread",
            createdAt: Date.now(),
        });
    },
});
