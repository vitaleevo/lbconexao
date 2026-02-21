"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ConvexImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    storageId?: string;
    fallback?: string;
}

export default function ConvexImage({ storageId, fallback, ...props }: ConvexImageProps) {
    // Check if it's a URL
    const isUrl = storageId?.startsWith('http') || storageId?.startsWith('data:') || storageId?.includes('/');

    // Call query if it looks like a storageId
    const imageUrl = useQuery(api.files.getUrl,
        storageId && !isUrl ? { storageId: storageId as any } : "skip"
    );

    // If it's a URL, use it directly. 
    // If it's a storageId, use the fetched URL or the fallback while loading/error.
    let finalSrc = isUrl ? storageId : (imageUrl || fallback);

    // If still undefined (no storageId, or loading with no fallback), use the fallback URL provided in props or default
    if (!finalSrc && !props.src) {
        if (storageId === undefined || storageId === "") {
            finalSrc = fallback;
        } else if (imageUrl === undefined) {
            // Still loading the storage URL, use fallback for now
            finalSrc = fallback;
        }
    }

    // If we have nothing at all after checking everything
    if (!finalSrc && !props.src) {
        return (
            <div className={`${props.className} bg-gray-50 flex flex-col items-center justify-center text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center px-4`}>
                <div className="w-8 h-8 rounded-full border-2 border-gray-100 border-t-secondary animate-spin mb-2" />
                Carregando...
            </div>
        );
    }

    return (
        <img
            {...props}
            src={finalSrc || props.src}
            onError={(e) => {
                // If the image fails to load, try to use the fallback
                if (fallback && (e.target as HTMLImageElement).src !== fallback) {
                    (e.target as HTMLImageElement).src = fallback;
                }
            }}
        />
    );
}
