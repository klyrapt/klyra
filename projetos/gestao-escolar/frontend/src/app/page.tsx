// LandingPage.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"
import TestimonialsSlider from "@/components/TestimonialsSlider"
import PricingPlans from "@/components/PricingPlans"
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer"
import AnimatedResources from "@/components/AnimatedResources"
import Header from "@/components/Header"
import { useState } from "react"
import ContatoModal from "@/components/ContatoModal"
import ChatWidget from "@/components/ChatWidget"


export default function LandingPage() {
  const [showDemonstraçãoModal, setShowDemonstraçãoModal] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1c35] text-white">
    
    <Header />

      {/* Hero Section */}
    <section className="bg-[#0b1c35] min-h-[90vh] flex items-center pt-11 md:pt-2">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        {/* Texto à esquerda */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Simplifique a gestão da sua <span className="text-yellow-400">escola</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl">
            Uma plataforma completa para administrar matrículas, notas, frequência, comunicação entre diretores, professores, pais e alunos. Unifique tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 text-lg px-6">
              Começar agora <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="border-white text-[#0b1c35] hover:bg-white/10 text-lg px-6"
                onClick={() => setShowDemonstraçãoModal(true)}
              >
                Agendar demonstração
              </Button>

          </div>
        </motion.div>

        {/* Imagem à direita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <Image
            src="/hero-dashboard.png"
            alt="Dashboard Klyra"
            width={640}
            height={480}
            priority
            className="max-w-full h-auto rounded-xl"
          />
        </motion.div>
      </div>
    </section>

    <ContatoModal
      open={showDemonstraçãoModal}
      onClose={() => setShowDemonstraçãoModal(false)}
      tipo="demonstração"
    />



      {/* Features Section */}
      <section id="recursos" className="py-24 bg-[#09172b]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Tudo que sua escola precisa</h2>
          <p className="text-white/70 max-w-3xl mx-auto mb-12">
            Recursos completos para o controle escolar, acadêmico e administrativo, integrados com comunicação.
          </p>

          <AnimatedResources />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 bg-[#0b1c35]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">O que dizem sobre a Klyra</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Veja como diretores e professores melhoraram a gestão e o desempenho com a nossa plataforma.
          </p>
          <TestimonialsSlider />
        </div>
      </section>

      {/* Plans Section */}
      <section id="precos" className="py-24 bg-[#09172b]">
        <div className="container">
          <PricingPlans />
        </div>
      </section>

      <FaqSection />

      <CtaSection />
      <ChatWidget />

      <Footer />

    </div>
  )
}
