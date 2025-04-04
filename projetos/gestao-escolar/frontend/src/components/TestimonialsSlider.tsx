"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    nome: "Maria Silva",
    cargo: "Diretora, Colégio Progresso",
    avatar: "/avatar.png",
    texto:
      "Reduzimos em 70% o tempo com tarefas administrativas. Agora focamos no que importa: nossos alunos.",
  },
  {
    nome: "Carlos Oliveira",
    cargo: "Coordenador, Escola Nova Era",
    avatar: "/avatar.png",
    texto:
      "A comunicação com os pais melhorou significativamente. Eles acompanham tudo em tempo real.",
  },
  {
    nome: "Ana Beatriz",
    cargo: "Secretária, Instituto Educacional Futuro",
    avatar: "/avatar.png",
    texto:
      "O suporte técnico é excelente. A migração foi simples e rápida. Super recomendo!",
  },
  {
    nome: "Roberto Santos",
    cargo: "Diretor Financeiro, Rede Crescer",
    avatar: "/avatar.png",
    texto:
      "Reduzimos a inadimplência em 35% no primeiro semestre com o controle financeiro da plataforma.",
  },
]

export default function TestimonialsSlider() {
  const duplicated = [...testimonials, ...testimonials] // duplica para scroll contínuo

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className="min-w-[300px] max-w-xs flex-shrink-0 rounded-lg border p-6 bg-white shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={item.avatar}
                alt={item.nome}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.nome}</p>
                <p className="text-sm text-gray-500">{item.cargo}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">“{item.texto}”</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
