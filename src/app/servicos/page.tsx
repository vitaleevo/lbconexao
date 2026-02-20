"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import {
    Scale, Users, GraduationCap, Briefcase,
    CheckCircle2, ArrowRight, Shield, Globe,
    Award, Target
} from "lucide-react"
import Link from "next/link"

const servicesList = [
    {
        id: "formacao-pratica",
        title: "Cursos e Capacitações",
        headline: "Excelência Educacional no Direito Angolano",
        description: "Formações modulares e imersivas desenhadas para elevar a competência técnica de advogados e estudantes.",
        icon: <GraduationCap className="w-12 h-12" />,
        color: "blue",
        features: [
            "Conteúdo focado na realidade angolana",
            "Certificação reconhecida",
            "Material de apoio exclusivo",
            "Sessões de perguntas e respostas"
        ],
        details: "Nossos cursos cobrem desde os princípios fundamentais até as mais complexas áreas do direito contemporâneo, como Direito Comercial, Fiscal e Telecomunicações."
    },
    {
        id: "eventos",
        title: "Eventos e Networking",
        headline: "Conexões que Transformam Carreiras",
        description: "Organizamos conferências e workshops de alto nível que servem como ponto de encontro estratégico para a elite jurídica.",
        icon: <Users className="w-12 h-12" />,
        color: "gold",
        features: [
            "Palestrantes de renome nacional e internacional",
            "Ambiente propício para parcerias",
            "Networking qualificado",
            "Discussões sobre o futuro do direito"
        ],
        details: "Através da LB Conexão, criamos espaços onde profissionais podem debater reformas legislativas e tendências de mercado."
    },
    {
        id: "direito-comercial",
        title: "Direito Comercial",
        headline: "Consultoria e Assessoria Especializada",
        description: "Acompanhamento estratégico para empresas e profissionais que buscam excelência e segurança jurídica.",
        icon: <Scale className="w-12 h-12" />,
        color: "navy",
        features: [
            "Pareceres técnicos detalhados",
            "Suporte em transações complexas",
            "Compliance e gestão de riscos",
            "Auditoria jurídica preventiva"
        ],
        details: "Unimos tradição e inovação para oferecer soluções que protegem e impulsionam os negócios de nossos clientes."
    },
    {
        id: "consultoria",
        title: "Consultoria Jurídica",
        headline: "Mentoria para a Nova Geração Jurídica",
        description: "Programas de mentoria e simulações práticas para preparar talentos para os desafios reais do mercado.",
        icon: <Briefcase className="w-12 h-12" />,
        color: "green",
        features: [
            "Simulação de tribunais e audiências",
            "Marketing jurídico ético",
            "Gestão de carreira na advocacia",
            "Desenvolvimento de soft skills"
        ],
        details: "O mercado exige mais que conhecimento técnico. Nossa orientação foca na construção de uma postura profissional de alta performance."
    }
]

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#FCFCFD]">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-24 premium-gradient relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
                        alt="Fundo Editorial"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-primary/40" />
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-primary-light/20 rounded-full blur-[100px] pointer-events-none" />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] block mb-6">Nosso Portfólio</span>
                        <h1 className="text-5xl md:text-6xl font-display text-white mb-8">
                            Áreas de <span className="italic text-secondary">Atuação</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            Desenvolvemos soluções integradas que conectam a base acadêmica à prática profissional de excelência.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Detailed List */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="space-y-32">
                        {servicesList.map((service, index) => (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
                            >
                                {/* Left/Right Content */}
                                <div className="lg:w-1/2">
                                    <div className={`w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary mb-8`}>
                                        {service.icon}
                                    </div>
                                    <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">{service.title}</h2>
                                    <h3 className="text-3xl md:text-5xl font-display text-primary mb-8 leading-tight">{service.headline}</h3>
                                    <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                                        {service.details}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-start space-x-3">
                                                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                                                <span className="text-sm text-primary/70 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/servicos/${service.id}`}
                                        className="inline-flex items-center space-x-3 text-primary font-bold uppercase tracking-widest text-xs group"
                                    >
                                        <span>Solicitar Consultoria</span>
                                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all group-hover:border-secondary">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </div>

                                {/* Image/Visual Placeholder */}
                                <div className="lg:w-1/2 w-full">
                                    <div className="aspect-square relative group">
                                        <div className="absolute -inset-4 bg-secondary/5 rounded-[4rem] blur-3xl group-hover:bg-secondary/10 transition-all" />
                                        <div className="relative h-full bg-[#0A1628] rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden">
                                            <img
                                                src={index === 0 ? "/img 3.jpg" : index === 1 ? "/img 2.jpg" : "/img 1.jpg"}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-[#050B14] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display text-white mb-8">Pioneirismo no <span className="italic text-secondary">Direito Angolano</span></h2>
                    <p className="text-white/60 mb-12 max-w-2xl mx-auto italic">
                        &quot;Onde a tradição encontra a modernidade para criar novas conexões e oportunidades.&quot;
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield />, label: "Segurança" },
                            { icon: <Globe />, label: "Global" },
                            { icon: <Award />, label: "Excelência" },
                            { icon: <Target />, label: "Resultados" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="text-secondary mb-3">{stat.icon}</div>
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
