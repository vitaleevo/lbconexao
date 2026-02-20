import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useBlogPosts = () => {
    const posts = useQuery(api.posts.list);
    return { posts, loading: posts === undefined };
};

export const useFeaturedPost = () => {
    const featuredPost = useQuery(api.posts.getFeatured);
    return { featuredPost, loading: featuredPost === undefined };
};
