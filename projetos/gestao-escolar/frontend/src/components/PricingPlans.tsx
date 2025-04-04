"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import api from "@/services/api"

interface Plano {
  id: number
  nome: string
  preco: string
  preco_anual: string
  descricao: string
  recursos_formatados: string[]
  destaque: boolean
  personalizado: boolean
}

export default function PlanosSection() {
  const [planos, setPlanos] = useState<Plano[]>([])

  useEffect(() => {
    api.get("/planos/")
      .then((res) => setPlanos(res.data))
      .catch((err) => console.error("Erro ao buscar planos:", err))
  }, [])

  return (
    <section id="precos" className="py-24 bg-[#0b1c35] text-white">
      <div className="container text-center">
        <div className="mb-12">
          <span className="bg-yellow-400 text-[#0b1c35] px-4 py-1 rounded-full text-sm font-semibold">
            Preços
          </span>
          <h2 className="text-4xl font-bold mt-4">Planos para escolas de todos os tamanhos</h2>
          <p className="text-white/70 mt-2">
            Escolha entre plano mensal ou anual com 14 dias grátis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {planos.map((plano) => (
            <motion.div
              key={plano.id}
              whileHover={{ scale: 1.05 }}
              className={`relative p-8 rounded-xl shadow-xl border border-white/10 bg-[#0f2346] ${
                plano.destaque ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              {plano.destaque && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#0b1c35] px-3 py-1 rounded-full text-xs font-bold">
                  Mais popular
                </span>
              )}

              <h3 className="text-2xl font-semibold mb-1">{plano.nome}</h3>
              <p className="text-sm text-white/60 mb-4">{plano.descricao}</p>

              <div className="mb-4">
                <p className="text-yellow-400 font-bold text-lg">
                  {plano.personalizado ? "Sob consulta" : `€${plano.preco}/mês`}
                </p>
                {!plano.personalizado && (
                  <p className="text-sm text-white/50">
                    ou €{plano.preco_anual}/ano (10% off)
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plano.recursos_formatados.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 text-base">
                {plano.personalizado ? "Fale com vendas" : "Começar agora"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
