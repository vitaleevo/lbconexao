import { mutation } from "./_generated/server";

export const deletePostBySlug = mutation({
  args: {},
  handler: async (ctx) => {
    const slug = "problematica-providencias-cautelares-cpt";
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (post) {
      await ctx.db.delete(post._id);
      return `Post with slug ${slug} deleted successfully.`;
    }
    return `Post with slug ${slug} not found.`;
  },
});
