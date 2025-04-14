"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight, Star, CheckCircle, ArrowRight, Users, School, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TestimonialsSlider from "@/components/TestimonialsSlider"
import PricingPlans from "@/components/PricingPlans"
import FaqSection from "@/components/FaqSection"
import CtaSection from "@/components/CtaSection"
import Footer from "@/components/Footer"
import AnimatedResources from "@/components/AnimatedResources"
import Header from "@/components/Header"
import ContatoModal from "@/components/ContatoModal"
import ChatWidget from "@/components/ChatWidget"

// Animated background component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/10"
          initial={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0.1 + Math.random() * 0.3,
          }}
          animate={{
            x: `calc(${Math.random() * 100}vw)`,
            y: `calc(${Math.random() * 100}vh)`,
          }}
          transition={{
            duration: 15 + Math.random() * 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Stats component
const StatsSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-4 md:px-8 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-white/10">
      {[
        { value: "2,500+", label: "Escolas", icon: School },
        { value: "98%", label: "Satisfação", icon: Star },
        { value: "50,000+", label: "Usuários", icon: Users },
        { value: "10+ anos", label: "Experiência", icon: Award },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-2 p-3 rounded-full bg-yellow-400/20">
            <stat.icon className="h-6 w-6 text-yellow-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">{stat.value}</h3>
          <p className="text-white/70">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Trusted by logos component
const TrustedBySection = () => {
  const logos = [
    { name: "Escola Modelo", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Colégio Futuro", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Instituto Educação", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Escola Inovação", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Colégio Excelência", logo: "/placeholder.svg?height=40&width=120" },
  ]

  return (
    <div className="py-12">
      <p className="text-center text-white/60 mb-6 text-sm uppercase tracking-wider font-medium">
        Utilizado por instituições de ensino em todo o Brasil
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image src={logo.logo || "/placeholder.svg"} alt={logo.name} width={120} height={40} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Navigation progress indicator
const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "recursos", "depoimentos", "precos", "faq"]
      const scrollPosition = window.scrollY + 300

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {[
        { id: "hero", label: "Início" },
        { id: "recursos", label: "Recursos" },
        { id: "depoimentos", label: "Depoimentos" },
        { id: "precos", label: "Preços" },
        { id: "faq", label: "FAQ" },
      ].map((item) => (
        <Link key={item.id} href={`#${item.id}`} className="group flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              activeSection === item.id ? "bg-yellow-400 scale-125" : "bg-white/30 group-hover:bg-white/60"
            }`}
          />
          <span
            className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              activeSection === item.id ? "text-yellow-400" : "text-white/70"
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [showDemonstraçãoModal, setShowDemonstraçãoModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0b1c35] via-[#0d2240] to-[#0b1c35] text-white overflow-hidden">
      <ParticleBackground />
      <ProgressIndicator />

      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100vh] flex items-center pt-20 md:pt-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

        <div className="container grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text on the left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-2">
              <Star className="h-4 w-4 mr-1.5" /> Plataforma educacional #1 no Brasil
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Simplifique a gestão da sua{" "}
              <span className="relative">
                <span className="relative z-10 text-yellow-400">escola</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-400/30 rounded-full z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-xl leading-relaxed">
              Uma plataforma completa para administrar matrículas, notas, frequência, comunicação entre diretores,
              professores, pais e alunos. Unifique tudo em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 text-lg px-8 py-6 rounded-xl shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:translate-y-[-2px]">
                Começar agora <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:border-white/40"
                onClick={() => setShowDemonstraçãoModal(true)}
              >
                Agendar demonstração
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-2 text-white/60"
            >
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Comece gratuitamente, sem necessidade de cartão de crédito</span>
            </motion.div>
          </motion.div>

          {/* Image on the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-70" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
              <Image
                src="/hero-dashboard.png"
                alt="Dashboard Klyra"
                width={640}
                height={480}
                priority
                className="w-full h-auto rounded-xl relative z-10 transform hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 -right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl z-20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-400/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Frequência</p>
                    <p className="text-xs text-white/70">98% dos alunos presentes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Matrículas</p>
                    <p className="text-xs text-white/70">+15% este semestre</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-12 md:py-16">
        <StatsSection />
      </section>

      {/* Trusted By Section */}
      <section className="container">
        <TrustedBySection />
      </section>

      <ContatoModal open={showDemonstraçãoModal} onClose={() => setShowDemonstraçãoModal(false)} tipo="demonstração" />

      {/* Features Section */}
      <section id="recursos" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#09172b] to-[#0d2240] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-400/20 text-blue-400 text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4 mr-2" /> Recursos Completos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Tudo que sua escola precisa</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Recursos completos para o controle escolar, acadêmico e administrativo, integrados com comunicação.
            </p>
          </motion.div>

          <AnimatedResources />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="#precos">
              <Button
                variant="outline"
                className="group border-white/20 text-white hover:bg-white/10 text-lg px-6 py-5 rounded-xl transition-all duration-300"
              >
                Ver todos os recursos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" /> Depoimentos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">O que dizem sobre a Klyra</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Veja como diretores e professores melhoraram a gestão e o desempenho com a nossa plataforma.
            </p>
          </motion.div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* Plans Section */}
      <section id="precos" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#09172b] to-[#0d2240] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-400/20 text-blue-400 text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4 mr-2" /> Planos Flexíveis
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Escolha o plano ideal para sua escola</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Oferecemos opções para escolas de todos os tamanhos, com recursos que crescem junto com você.
            </p>
          </motion.div>

          <PricingPlans />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative">
        <FaqSection />
      </section>

      {/* CTA Section */}
      <section className="relative">
        <CtaSection />
      </section>

      <ChatWidget />

      <Footer />

      {/* Floating "Back to top" button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-yellow-400 text-[#0b1c35] shadow-lg hover:bg-yellow-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
