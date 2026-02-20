"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Get upload URL
            const postUrl = await generateUploadUrl();

            // 2. POST the file to Convex
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();

            // 3. In this simple implementation, we'll just store the storageId or the final URL
            // To make it easy for the user, let's get the permanent URL
            // We'll need a way to get the URL from storageId. 
            // Actually, we can just use the storageId and fetch it on render, 
            // but for 'posts.coverImage' it's usually expected to be a URL.
            // So we'll use a temporary trick or a proxy.

            // Let's assume we want the final URL. 
            // Convex provides a way to get the URL.
            onChange(storageId); // We'll store storageId in the database
        } catch (error) {
            console.error("Upload error:", error);
            alert("Falha no upload da imagem.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // For previewing
    const isUrl = value?.startsWith('http') || value?.startsWith('data:');
    const storageUrl = useQuery(api.files.getUrl,
        value && !isUrl ? { storageId: value as any } : "skip"
    );

    const previewSrc = isUrl ? value : storageUrl;

    return (
        <div className="space-y-2">
            {label && <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">{label}</label>}

            <div className="relative">
                {value ? (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                            {previewSrc ? (
                                <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Loader2 className="w-8 h-8 mb-2 animate-spin opacity-20" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest">A carregar pré-visualização...</span>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-secondary/50 hover:bg-gray-50 transition-all group"
                    >
                        {isUploading ? (
                            <Loader2 className="w-10 h-10 text-secondary animate-spin" />
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-secondary" />
                                </div>
                                <p className="text-sm font-bold text-primary">Clique para carregar imagem</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG ou WEBP (Max 5MB)</p>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </div>
    );
}
