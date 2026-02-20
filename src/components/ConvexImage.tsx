"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ConvexImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    storageId?: string;
    fallback?: string;
}

export default function ConvexImage({ storageId, fallback, ...props }: ConvexImageProps) {
    // If storageId is a URL or doesn't look like a storageId, just use it
    const isUrl = storageId?.startsWith('http') || storageId?.startsWith('data:') || storageId?.includes('/');

    // We only call the query if it looks like a storageId and isn't a URL
    const imageUrl = useQuery(api.files.getUrl,
        storageId && !isUrl ? { storageId: storageId as any } : "skip"
    );

    const finalSrc = isUrl ? storageId : (imageUrl || fallback);

    if (!finalSrc && !props.src) return <div className={props.className + " bg-gray-100 flex items-center justify-center text-gray-400"}>Sem imagem</div>;

    return <img {...props} src={finalSrc || props.src} />;
}
