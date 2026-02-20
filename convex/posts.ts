import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("posts")
            .filter((q) => q.eq(q.field("published"), true))
            .order("desc")
            .collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
    },
});

export const getFeatured = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("posts")
            .filter((q) => q.eq(q.field("featured"), true))
            .filter((q) => q.eq(q.field("published"), true))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        coverImage: v.optional(v.string()),
        author: v.string(),
        readTime: v.optional(v.string()),
        dateExtremity: v.optional(v.string()),
        featured: v.boolean(),
        published: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("posts", args);
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("posts").order("desc").collect();
    },
});

export const remove = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const update = mutation({
    args: {
        id: v.id("posts"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        author: v.optional(v.string()),
        readTime: v.optional(v.string()),
        dateExtremity: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        published: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

