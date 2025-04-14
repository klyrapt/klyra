"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import ContatoModal from "@/components/ContatoModal"

export default function CtaSection() {
  const [showDemonstraçãoModal, setShowDemonstraçãoModal] = useState(false)

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2240] to-[#0b1c35]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl"
          animate={{
            x: ["0%", "-50%", "0%"],
            y: ["0%", "30%", "0%"],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "5%" }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transforme a gestão da sua escola hoje</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de escolas que já simplificaram seus processos administrativos e melhoraram a
            experiência educacional.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 text-lg px-8 py-6 rounded-xl shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:translate-y-[-2px]">
              Começar agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl transition-all duration-300"
              onClick={() => setShowDemonstraçãoModal(true)}
            >
              Agendar demonstração
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {[
              "Teste grátis por 14 dias",
              "Sem necessidade de cartão de crédito",
              "Suporte completo durante o teste",
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ContatoModal open={showDemonstraçãoModal} onClose={() => setShowDemonstraçãoModal(false)} tipo="demonstração" />
    </section>
  )
}
