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

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        registrationUrl: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("events", args);
    },
});
