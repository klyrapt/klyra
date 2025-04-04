// components/AnimatedResources.tsx

"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
  Calendar,
  Clock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Users,
  GraduationCap,
  BarChart,
  BookOpenCheck
} from "lucide-react"

const recursos = [
  { icon: LayoutDashboard, label: "Painel Inteligente" },
  { icon: Users, label: "Gestão de Alunos" },
  { icon: FileText, label: "Boletins e Avaliações" },
  { icon: Calendar, label: "Calendário Escolar" },
  { icon: Clock, label: "Frequência e Presenças" },
  { icon: MessageSquare, label: "Mensagens Diretas" },
  { icon: ShieldCheck, label: "Controle de Acesso" },
  { icon: GraduationCap, label: "Plano de Ensino" },
  { icon: BarChart, label: "Relatórios Avançados" },
  { icon: BookOpenCheck, label: "Materiais Didáticos" },
]

const AnimatedResources = () => {
  const containerTop = useRef<HTMLDivElement>(null)
  const containerBottom = useRef<HTMLDivElement>(null)

  const [pauseTop, setPauseTop] = useState(false)
  const [pauseBottom, setPauseBottom] = useState(false)

  useEffect(() => {
    let rafId: number
    let offsetTop = 0
    let offsetBottom = 0
    let directionTop = 1
    let directionBottom = -1

    const animate = () => {
      if (containerTop.current && !pauseTop) {
        offsetTop += directionTop
        containerTop.current.style.transform = `translateX(${offsetTop}px)`
        if (Math.abs(offsetTop) > containerTop.current.scrollWidth / 2) {
          directionTop *= -1
        }
      }

      if (containerBottom.current && !pauseBottom) {
        offsetBottom += directionBottom
        containerBottom.current.style.transform = `translateX(${offsetBottom}px)`
        if (Math.abs(offsetBottom) > containerBottom.current.scrollWidth / 2) {
          directionBottom *= -1
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [pauseTop, pauseBottom])

  const renderItem = (
    item: (typeof recursos)[0],
    index: number,
    onPause: () => void,
    onResume: () => void
  ) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 bg-white/10 text-white rounded-xl p-4 w-[250px] hover:cursor-pointer"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <item.icon className="text-yellow-400 h-6 w-6" />
      <span className="text-base font-medium">{item.label}</span>
    </motion.div>
  )

  return (
    <div className="overflow-hidden space-y-6">
      <div className="flex gap-6 w-max" ref={containerTop}>
        {[...recursos, ...recursos].map((item, i) =>
          renderItem(item, i, () => setPauseTop(true), () => setPauseTop(false))
        )}
      </div>
      <div className="flex gap-6 w-max" ref={containerBottom}>
        {[...recursos, ...recursos].map((item, i) =>
          renderItem(item, i, () => setPauseBottom(true), () => setPauseBottom(false))
        )}
      </div>
    </div>
  )
}

export default AnimatedResources
