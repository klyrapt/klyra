"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const plans = [
  {
    name: "Básico",
    description: "Ideal para escolas pequenas",
    price: "R$ 299",
    period: "/mês",
    features: [
      "Até 200 alunos",
      "Gestão de matrículas",
      "Controle de frequência",
      "Boletins online",
      "Comunicação básica",
      "Suporte por email",
    ],
    highlighted: false,
    cta: "Começar agora",
  },
  {
    name: "Profissional",
    description: "Para escolas em crescimento",
    price: "R$ 599",
    period: "/mês",
    features: [
      "Até 500 alunos",
      "Tudo do plano Básico",
      "Portal para pais e alunos",
      "Gestão financeira básica",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    highlighted: true,
    cta: "Experimentar grátis",
  },
  {
    name: "Enterprise",
    description: "Para redes de ensino",
    price: "R$ 1.299",
    period: "/mês",
    features: [
      "Alunos ilimitados",
      "Tudo do plano Profissional",
      "Múltiplas unidades",
      "Gestão financeira completa",
      "Integrações personalizadas",
      "Suporte 24/7",
      "Consultor dedicado",
    ],
    highlighted: false,
    cta: "Falar com consultor",
  },
]

export default function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <div className="bg-white/10 p-1 rounded-full mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "monthly" ? "bg-yellow-400 text-[#0b1c35]" : "text-white/70 hover:text-white"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "yearly" ? "bg-yellow-400 text-[#0b1c35]" : "text-white/70 hover:text-white"
              }`}
            >
              Anual <span className="text-xs font-bold">-20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl overflow-hidden ${
              plan.highlighted
                ? "bg-gradient-to-b from-blue-600/20 to-indigo-600/20 border-2 border-blue-400/30"
                : "bg-white/5 border border-white/10"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center text-sm py-1.5 font-medium">
                Mais popular
              </div>
            )}

            <div className={`p-8 ${plan.highlighted ? "pt-12" : ""}`}>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/70 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {billingPeriod === "yearly" ? `${Number.parseInt(plan.price.replace("R$ ", "")) * 0.8}` : plan.price}
                </span>
                <span className="text-white/70">{plan.period}</span>

                {billingPeriod === "yearly" && (
                  <div className="mt-2 text-sm text-yellow-400">Economize 20% no plano anual</div>
                )}
              </div>

              <Button
                className={`w-full py-6 mb-8 ${
                  plan.highlighted
                    ? "bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className={`h-5 w-5 mt-0.5 ${plan.highlighted ? "text-blue-400" : "text-green-400"}`}
                    />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/70 mb-4">Precisa de um plano personalizado para sua instituição?</p>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          Entre em contato
        </Button>
      </div>
    </div>
  )
}
