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
        readTime: v.optional(v.string()),
        dateExtremity: v.optional(v.string()),
        published: v.boolean(),
        featured: v.boolean(),
    }).index("by_slug", ["slug"]),

    events: defineTable({
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
        status: v.string(), // "upcoming", "ongoing", "completed"
        featured: v.optional(v.boolean()),
        includedItems: v.optional(v.array(v.string())),
        gallery: v.optional(v.array(v.string())),
    }),

    contacts: defineTable({
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        status: v.string(), // "unread", "read", "responded"
        createdAt: v.number(),
    }),

    admins: defineTable({
        email: v.string(),
        password: v.string(), // hashed
        name: v.optional(v.string()),
        role: v.optional(v.string()),
        phone: v.optional(v.string()),
        bio: v.optional(v.string()),
        avatar: v.optional(v.string()),
        failedAttempts: v.optional(v.number()),
        lockUntil: v.optional(v.number()),
    }).index("by_email", ["email"]),
});
