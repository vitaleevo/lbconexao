import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useEvents = () => {
    const events = useQuery(api.events.listUpcoming);
    return { events, loading: events === undefined };
};

export const useFeaturedEvent = () => {
    const featuredEvent = useQuery(api.events.getFeatured);
    return { featuredEvent, loading: featuredEvent === undefined };
};
