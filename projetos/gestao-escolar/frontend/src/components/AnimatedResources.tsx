"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, BookOpen, MessageSquare, CreditCard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const resources = [
  {
    id: "academico",
    name: "Acadêmico",
    icon: BookOpen,
    color: "blue",
    description: "Gestão completa do processo acadêmico, desde o planejamento até a avaliação.",
    features: [
      "Lançamento de notas e frequência",
      "Geração de boletins e históricos",
      "Planejamento de aulas",
      "Avaliações online",
      "Biblioteca digital",
      "Atividades e tarefas",
    ],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "administrativo",
    name: "Administrativo",
    icon: Users,
    color: "yellow",
    description: "Controle eficiente de matrículas, turmas e toda a estrutura escolar.",
    features: [
      "Gestão de matrículas e rematrículas",
      "Controle de turmas e horários",
      "Cadastro de professores e funcionários",
      "Gestão de salas e recursos",
      "Controle de documentos",
      "Relatórios gerenciais",
    ],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "financeiro",
    name: "Financeiro",
    icon: CreditCard,
    color: "green",
    description: "Administração completa das finanças da sua instituição de ensino.",
    features: [
      "Controle de mensalidades",
      "Gestão de inadimplência",
      "Emissão de boletos",
      "Fluxo de caixa",
      "Relatórios financeiros",
      "Integração com sistemas bancários",
    ],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "comunicacao",
    name: "Comunicação",
    icon: MessageSquare,
    color: "purple",
    description: "Canais integrados para comunicação entre escola, professores, alunos e pais.",
    features: [
      "Chat interno",
      "Envio de comunicados",
      "Portal para pais e alunos",
      "Agenda de eventos",
      "Notificações push",
      "Compartilhamento de arquivos",
    ],
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function AnimatedResources() {
  const [activeTab, setActiveTab] = useState("academico")

  const getColorClass = (color: string, element: "bg" | "text" | "border") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-400",
        text: "text-blue-400",
        border: "border-blue-400",
      },
      yellow: {
        bg: "bg-yellow-400",
        text: "text-yellow-400",
        border: "border-yellow-400",
      },
      green: {
        bg: "bg-green-400",
        text: "text-green-400",
        border: "border-green-400",
      },
      purple: {
        bg: "bg-purple-400",
        text: "text-purple-400",
        border: "border-purple-400",
      },
    }

    return colorMap[color as keyof typeof colorMap][element]
  }

  const activeResource = resources.find((r) => r.id === activeTab)

  return (
    <div className="mt-12">
      <Tabs defaultValue="academico" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-white/5 p-1 rounded-xl mb-8">
          {resources.map((resource) => (
            <TabsTrigger
              key={resource.id}
              value={resource.id}
              className={`py-3 data-[state=active]:${getColorClass(resource.color, "text")} data-[state=active]:bg-white/10`}
            >
              <div className="flex items-center gap-2">
                <resource.icon className="h-5 w-5" />
                <span className="hidden md:inline">{resource.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {resources.map((resource) => (
          <TabsContent
            key={resource.id}
            value={resource.id}
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full ${getColorClass(resource.color, "bg")}/20 ${getColorClass(resource.color, "text")} text-sm font-medium`}
                >
                  <resource.icon className="h-4 w-4 mr-2" />
                  {resource.name}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {resource.name}: Gestão completa e integrada
                </h3>

                <p className="text-white/80 text-lg">{resource.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {resource.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div
                        className={`mt-1 h-5 w-5 rounded-full ${getColorClass(resource.color, "bg")}/20 flex items-center justify-center flex-shrink-0`}
                      >
                        <CheckCircle className={`h-3 w-3 ${getColorClass(resource.color, "text")}`} />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl"
              >
                <div className={`absolute inset-0 ${getColorClass(resource.color, "bg")}/5`} />
                <Image
                  src={resource.image || "/placeholder.svg"}
                  alt={`${resource.name} screenshot`}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

import { CheckCircle } from "lucide-react"
