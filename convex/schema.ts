import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        coverImage: v.optional(v.string()),
        author: v.string(),
        published: v.boolean(),
        featured: v.boolean(),
    }).index("by_slug", ["slug"]),

    events: defineTable({
        title: v.string(),
        description: v.string(),
        date: v.string(), // ISO String
        location: v.string(),
        registrationUrl: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        status: v.string(), // "upcoming", "ongoing", "completed"
    }),

    contacts: defineTable({
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    }),
});
