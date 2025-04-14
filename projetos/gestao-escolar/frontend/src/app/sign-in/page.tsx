"use client"

import LoginForm from "@/components/forms/LoginForm"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1c35] via-[#0d2240] to-[#0b1c35] text-white">
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row items-stretch">
        {/* Left side - Illustration and branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#081628] p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 text-[#0b1c35] h-10 w-10 rounded-md flex items-center justify-center font-bold text-2xl">
                K
              </div>
              <span className="text-white text-2xl font-bold">Klyra</span>
            </div>
          </div>

          {/* Welcome text */}
          <div className="relative z-10 flex-grow flex flex-col justify-center py-12 max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Portal Acadêmico
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 mb-8"
            >
              Acesse sua conta para gerenciar todos os aspectos da sua instituição de ensino em um só lugar.
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {[
                "Gestão acadêmica completa",
                "Comunicação integrada",
                "Relatórios e análises em tempo real",
                "Acesso seguro de qualquer dispositivo",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative z-10 mt-8"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
              <Image
                src="/mockup.png"
                alt="Dashboard Preview"
                width={600}
                height={350}
                className="w-full h-auto rounded-xl relative z-10"
              />
            </div>
          </motion.div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h2 className="text-2xl font-bold">Acesse sua conta</h2>
                <p className="text-white/80 mt-1">Entre com suas credenciais para continuar</p>
              </div>

              <div className="p-6">
                <LoginForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-white/80 text-sm">
                Ainda não tem uma conta?{" "}
                <Link href="/sign-up" className="text-yellow-400 hover:text-yellow-300 font-medium">
                  Cadastre-se agora
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#050f1e] border-t border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button className="bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full text-sm text-white/80 transition-colors flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Suporte
            </button>
            <button className="text-white/60 hover:text-white/80 text-sm transition-colors">Contato</button>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link href="/privacidade" className="hover:text-white/80 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white/80 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
