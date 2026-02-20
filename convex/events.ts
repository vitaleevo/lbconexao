import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listUpcoming = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("events")
            .filter((q) => q.neq(q.field("status"), "completed"))
            .order("desc")
            .collect();
    },
});

export const getFeatured = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("events")
            .filter((q) => q.eq(q.field("featured"), true))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        time: v.optional(v.string()),
        location: v.string(),
        type: v.string(),
        mode: v.string(),
        price: v.string(),
        registrationUrl: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        status: v.string(),
        featured: v.optional(v.boolean()),
        includedItems: v.optional(v.array(v.string())),
        gallery: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("events", args);
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").order("desc").collect();
    },
});

export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
export const update = mutation({
    args: {
        id: v.id("events"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        date: v.optional(v.string()),
        time: v.optional(v.string()),
        location: v.optional(v.string()),
        type: v.optional(v.string()),
        mode: v.optional(v.string()),
        price: v.optional(v.string()),
        registrationUrl: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        status: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        includedItems: v.optional(v.array(v.string())),
        gallery: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});
