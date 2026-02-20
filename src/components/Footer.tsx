import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-primary pt-24 pb-12 text-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-8">
                            <img src="/logo.png" alt="LB Conexão" className="h-10 w-auto brightness-0 invert" />
                        </Link>
                        <p className="text-white/60 leading-relaxed mb-8">
                            Conectando profissionais do Direito em Angola através de excelência acadêmica e praticidade imersiva.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/profile.php?id=61574212834524" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.instagram.com/lbconexao_juridica/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Links Rápidos</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/" className="hover:text-secondary transition-colors">Início</Link></li>
                            <li><Link href="/sobre" className="hover:text-secondary transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-secondary transition-colors">Blog Jurídico</Link></li>
                            <li><Link href="/eventos" className="hover:text-secondary transition-colors">Próximos Eventos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Serviços</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="#" className="hover:text-secondary transition-colors">Direito Comercial</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">Direito Fiscal</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">Consultoria</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">Formação Prática</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Contactos</h4>
                        <ul className="space-y-6 text-white/60">
                            <li className="flex items-start">
                                <Phone className="w-5 h-5 mr-4 text-secondary shrink-0" />
                                <span>+(244) 922 600 019</span>
                            </li>
                            <li className="flex items-start">
                                <Mail className="w-5 h-5 mr-4 text-secondary shrink-0" />
                                <span>geral@lbconexao.com</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-4 text-secondary shrink-0" />
                                <span>Rua Kwame Nkrumah, Maianga<br />Luanda, Angola</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-sm italic">
                        Copyright © 2026 Lbconexao. Todos os direitos reservados.
                    </p>
                    <div className="flex space-x-8 text-sm text-white/40">
                        <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
                        <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
