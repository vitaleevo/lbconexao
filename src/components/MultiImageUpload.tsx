"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, X, Loader2 } from "lucide-react";
import ConvexImage from "./ConvexImage";

interface MultiImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    label?: string;
}

export default function MultiImageUpload({ value = [], onChange, label }: MultiImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        try {
            const newIds = [...value];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                const { storageId } = await result.json();
                if (storageId) {
                    newIds.push(storageId);
                }
            }
            onChange(newIds);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Falha no upload das imagens.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = (indexToRemove: number) => {
        const newIds = [...value];
        newIds.splice(indexToRemove, 1);
        onChange(newIds);
    };

    return (
        <div className="space-y-4">
            {label && <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">{label}</label>}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {value.map((storageId, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50 flex items-center justify-center">
                        <ConvexImage
                            storageId={storageId}
                            className="w-full h-full object-cover"
                            fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-secondary/50 hover:bg-gray-50 transition-all group"
                >
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 text-secondary animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-6 h-6 text-gray-400 group-hover:text-secondary group-hover:scale-110 mb-2 transition-all" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center px-2">Adicionar</span>
                        </>
                    )}
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                multiple
                className="hidden"
            />
        </div>
    );
}
