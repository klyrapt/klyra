"use client"

import CadastroInstituicao from "@/components/cadastro/CadastroInstituicao"
import Image from "next/image"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1c35] via-[#0d2240] to-[#0b1c35] flex flex-col md:flex-row items-stretch">
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

        {/* Illustration */}
        <div className="relative z-10 flex-grow flex items-center justify-center py-12">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="School Management Illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <p className="text-white/90 italic mb-4">
            "A Klyra transformou completamente a gestão da nossa escola. Economizamos horas de trabalho administrativo e
            melhoramos a comunicação com os pais."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold">
              MS
            </div>
            <div>
              <p className="text-white font-medium">Maria Silva</p>
              <p className="text-white/70 text-sm">Diretora, Colégio Futuro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <CadastroInstituicao />
      </div>
    </main>
  )
}
