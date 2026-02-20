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

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        coverImage: v.optional(v.string()),
        author: v.string(),
        featured: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("posts", {
            ...args,
            published: true,
        });
    },
});
