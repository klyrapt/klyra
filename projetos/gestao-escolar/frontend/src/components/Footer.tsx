import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#081628] border-t border-white/10 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-[#0b1c35] h-8 w-8 rounded-md flex items-center justify-center font-bold text-xl">
                  K
                </div>
                <span className="text-white text-xl font-bold">Klyra</span>
              </div>
            </Link>
            <p className="text-white/70">
              Simplificando a gestão escolar com tecnologia inovadora para instituições de ensino de todos os tamanhos.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              {[
                { name: "Recursos", href: "#recursos" },
                { name: "Preços", href: "#precos" },
                { name: "Depoimentos", href: "#depoimentos" },
                { name: "FAQ", href: "#faq" },
                { name: "Blog", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Soluções</h3>
            <ul className="space-y-4">
              {[
                { name: "Gestão Acadêmica", href: "#" },
                { name: "Gestão Administrativa", href: "#" },
                { name: "Gestão Financeira", href: "#" },
                { name: "Comunicação", href: "#" },
                { name: "Portal do Aluno", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contato</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:contato@klyra.com.br"
                  className="text-white/70 hover:text-yellow-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-5 w-5 text-yellow-400" />
                  contato@klyra.com.br
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+551140028922"
                  className="text-white/70 hover:text-yellow-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="h-5 w-5 text-yellow-400" />
                  (11) 4002-8922
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-white/70">
                  Av. Paulista, 1000, Bela Vista
                  <br />
                  São Paulo - SP, 01310-100
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Klyra Tecnologia Educacional. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/60 hover:text-white text-sm">
              Termos de Uso
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
