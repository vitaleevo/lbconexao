"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRef, useState } from "react";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link as LinkIcon,
    Type,
    Heading1,
    Heading2,
    Undo,
    Redo,
    Type as CaseIcon,
    Palette,
    Image as ImageIcon,
    Loader2
} from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const getUrlMutation = useMutation(api.files.getUrlMutation);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Image.configure({
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full h-auto my-6 shadow-lg border border-gray-100',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || "Comece a escrever...",
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const toggleCase = (type: 'upper' | 'lower') => {
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to);
        const newText = type === 'upper' ? text.toUpperCase() : text.toLowerCase();
        editor.commands.insertContentAt({ from, to }, newText);
    };

    const setLink = () => {
        const url = window.prompt("URL do Link:");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        } else if (url === "") {
            editor.chain().focus().unsetLink().run();
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Get upload URL
            const postUrl = await generateUploadUrl();

            // 2. POST the file
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();

            // 3. Get the final URL
            const url = await getUrlMutation({ storageId });

            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Falha ao carregar imagem.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full border border-gray-100 rounded-[2rem] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-secondary/20 transition-all shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50/50 border-b border-gray-100 sticky top-0 z-20">
                <div className="flex items-center space-x-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("bold") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Negrito"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("italic") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Itálico"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("underline") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Sublinhado"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 px-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: "left" }) ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Alinhar à Esquerda"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: "center" }) ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Centralizar"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: "right" }) ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Alinhar à Direita"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 px-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("heading", { level: 1 }) ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Título 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("heading", { level: 2 }) ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Título 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 px-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("bulletList") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Lista de Pontos"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("orderedList") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Lista Numerada"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 px-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 rounded-lg transition-all ${editor.isActive("link") ? "bg-primary text-white" : "text-gray-500 hover:bg-white"}`}
                        title="Inserir Link"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={triggerImageUpload}
                        disabled={isUploading}
                        className={`p-2 rounded-lg transition-all text-gray-500 hover:bg-white disabled:opacity-50`}
                        title="Inserir Imagem (Upload)"
                    >
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-secondary" /> : <ImageIcon className="w-4 h-4" />}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => toggleCase('upper')}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg transition-all"
                        title="MAIÚSCULAS"
                    >
                        <CaseIcon className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleCase('lower')}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg transition-all"
                        title="minúsculas"
                    >
                        <Type className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 px-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg transition-all"
                        title="Desfazer"
                    >
                        <Undo className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg transition-all"
                        title="Refazer"
                    >
                        <Redo className="w-4 h-4" />
                    </button>
                    <input
                        type="color"
                        onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                        value={editor.getAttributes("textStyle").color || "#0A2342"}
                        className="w-8 h-8 p-1 rounded-lg bg-white border border-gray-200 cursor-pointer"
                        title="Cor do Texto"
                    />
                </div>
            </div>

            {/* Editor Content */}
            <div className="p-8 min-h-[400px] prose prose-primary max-w-none prose-p:my-2 prose-headings:mb-4 prose-headings:mt-8 focus:outline-none overflow-y-auto">
                <EditorContent editor={editor} />
            </div>

            {/* Footer Info */}
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <div>{editor.storage.characterCount?.words?.() || 0} palavras</div>
                <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Editor Pró Ativo</span>
                </div>
            </div>

            <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror img {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
      `}</style>
        </div>
    );
}
