"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "A Klyra transformou completamente a gestão da nossa escola. Economizamos horas de trabalho administrativo e melhoramos a comunicação com os pais.",
    author: "Maria Silva",
    role: "Diretora Escolar",
    avatar: "/placeholder.svg?height=80&width=80",
    school: "Colégio Futuro",
  },
  {
    id: 2,
    content:
      "Como professor, posso dizer que o sistema de lançamento de notas e frequência é o mais intuitivo que já utilizei. Recomendo para todas as escolas.",
    author: "João Santos",
    role: "Professor de Matemática",
    avatar: "/placeholder.svg?height=80&width=80",
    school: "Escola Modelo",
  },
  {
    id: 3,
    content:
      "A implementação foi rápida e o suporte é excelente. Nossa equipe se adaptou facilmente e os pais adoraram o acesso às informações dos alunos.",
    author: "Ana Oliveira",
    role: "Coordenadora Pedagógica",
    avatar: "/placeholder.svg?height=80&width=80",
    school: "Instituto Educação",
  },
]

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
        <button
          onClick={prev}
          className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
        <button
          onClick={next}
          className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-white/10 p-8 md:p-12">
        <div className="absolute top-6 right-6 text-yellow-400/30">
          <Quote className="h-16 w-16 md:h-24 md:w-24" />
        </div>

        <div className="min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed relative z-10">
                "{testimonials[current].content}"
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-yellow-400/50">
                <Image
                  src={testimonials[current].avatar || "/placeholder.svg"}
                  alt={testimonials[current].author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{testimonials[current].author}</h4>
                <p className="text-white/70">{testimonials[current].role}</p>
                <p className="text-yellow-400 text-sm">{testimonials[current].school}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false)
                setCurrent(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-yellow-400" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
