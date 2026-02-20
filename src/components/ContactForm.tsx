"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("submitting")
        // Simulate submission
        setTimeout(() => {
            setStatus("success")
            setTimeout(() => setStatus("idle"), 5000)
        }, 1500)
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-secondary/20 rounded-[2rem] shadow-xl animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-2">Mensagem Enviada!</h4>
                <p className="text-gray-500">Agradecemos o seu contacto. Responderemos o mais breve possível.</p>
            </div>
        )
    }

    return (
        <form id="contacto" onSubmit={handleSubmit} className="space-y-6 p-10 bg-white border border-gray-100 rounded-[2rem] shadow-xl relative overflow-hidden">
            {/* Decorative dot */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Nome Completo</label>
                    <input
                        type="text"
                        placeholder="Ex: João Manuel"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">E-mail</label>
                    <input
                        type="email"
                        placeholder="joao@exemplo.ao"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Assunto</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm appearance-none">
                    <option>Consultoria Jurídica</option>
                    <option>Inscrição em Eventos</option>
                    <option>Cursos e Formação</option>
                    <option>Outros Assuntos</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Mensagem</label>
                <textarea
                    rows={5}
                    placeholder="Como podemos ajudar?"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm resize-none"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full secondary-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center group disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-secondary/20"
            >
                <span>{status === "submitting" ? "Enviando..." : "Enviar Mensagem"}</span>
                <Send className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 ${status === "submitting" ? "animate-pulse" : ""}`} />
            </button>
        </form>
    )
}
