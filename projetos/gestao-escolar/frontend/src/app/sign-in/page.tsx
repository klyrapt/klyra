import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1c35] text-white">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-10 md:py-20 max-w-7xl mx-auto">
        {/* Lado esquerdo: texto e imagem (esconde imagem em telas pequenas) */}
        <div className="w-full md:w-1/2 text-center md:text-left px-2 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Seja bem-vindo ao <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Portal Acadêmico</span>!
          </h1>
          <p className="text-md text-slate-300 mb-8 max-w-md mx-auto md:mx-0">
            Preencha os campos ao lado para acessar sua conta e entrar na plataforma.
          </p>
          <div className="hidden md:flex justify-center md:justify-start">
            <Image
              src="/mockup.png"
              alt="Mockup"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Formulário responsivo */}
        <div className="w-full sm:max-w-md bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-[#050f1e] text-gray-400 text-sm text-center gap-4">
        <button className="bg-gray-700 px-4 py-1 rounded-full">❓ Suporte</button>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/privacidade" className="hover:underline">Política de Privacidade</Link>
          <span>|</span>
          <Link href="/termos" className="hover:underline">Termos de Uso</Link>
        </div>
      </footer>
    </div>
  );
}
