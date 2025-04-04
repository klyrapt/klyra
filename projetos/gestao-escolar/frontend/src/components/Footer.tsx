import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full mt-52 border-t border-white/10 bg-[#0b1c35] text-white py-10">
      <div className="container grid gap-10 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">EduGestão</span>
          </div>
          <p className="text-sm text-white/70">
            Transformando a gestão escolar com tecnologia e inovação desde 2015.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold">Produto</h3>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link href="#recursos" className="hover:text-yellow-400">Recursos</Link></li>
            <li><Link href="#precos" className="hover:text-yellow-400">Preços</Link></li>
            <li><Link href="#contato" className="hover:text-yellow-400">Demonstração</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Atualizações</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold">Empresa</h3>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link href="#" className="hover:text-yellow-400">Sobre nós</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Carreiras</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Blog</Link></li>
            <li><Link href="#contato" className="hover:text-yellow-400">Contato</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold">Legal</h3>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link href="#" className="hover:text-yellow-400">Termos de Serviço</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Política de Privacidade</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex  flex-col md:flex-row items-center justify-between text-sm text-white/60 border-t border-white/10 pt-6">
        <p className="ml-10">© {new Date().getFullYear()} EduGestão. Todos os direitos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {['facebook', 'instagram', 'twitter', 'linkedin'].map((network, idx) => (
            <Link key={idx} href="#" className="hover:text-yellow-400">
              <span className="sr-only">{network}</span>
              <i className={`ri-${network}-line text-xl`}></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}