"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContatoModalProps {
  open: boolean
  onClose: () => void
  tipo: string
}

export default function ContatoModal({ open, onClose, tipo }: ContatoModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    escola: "",
    cargo: "",
    tamanhoEscola: "",
    mensagem: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        onClose()
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          escola: "",
          cargo: "",
          tamanhoEscola: "",
          mensagem: "",
        })
      }, 3000)
    }, 1500)
  }

  const getTitulo = () => {
    switch (tipo) {
      case "demonstração":
        return "Agendar uma demonstração"
      case "contato":
        return "Entre em contato"
      default:
        return "Fale conosco"
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-gradient-to-br from-[#0d2240] to-[#081628] rounded-2xl border border-white/10 shadow-xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">{getTitulo()}</h2>
              <p className="text-white/70 mb-6">
                {tipo === "demonstração"
                  ? "Preencha o formulário abaixo para agendar uma demonstração personalizada da plataforma Klyra."
                  : "Preencha o formulário abaixo e entraremos em contato o mais breve possível."}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">Mensagem enviada!</h3>
                  <p className="text-white/80">Obrigado pelo seu contato. Nossa equipe entrará em contato em breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-white">
                        Nome completo
                      </Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-white">
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="escola" className="text-white">
                        Nome da escola
                      </Label>
                      <Input
                        id="escola"
                        name="escola"
                        value={formData.escola}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="cargo" className="text-white">
                        Cargo
                      </Label>
                      <Input
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tamanhoEscola" className="text-white">
                        Tamanho da escola
                      </Label>
                      <Select
                        value={formData.tamanhoEscola}
                        onValueChange={(value) => handleSelectChange("tamanhoEscola", value)}
                      >
                        <SelectTrigger
                          id="tamanhoEscola"
                          className="bg-white/5 border-white/10 text-white [&_svg]:text-white"
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pequena">Até 200 alunos</SelectItem>
                          <SelectItem value="media">201 a 500 alunos</SelectItem>
                          <SelectItem value="grande">501 a 1000 alunos</SelectItem>
                          <SelectItem value="muito_grande">Mais de 1000 alunos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem" className="text-white">
                      Mensagem
                    </Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={4}
                      className="bg-white/5 border-white/10 text-white resize-none"
                      placeholder={
                        tipo === "demonstração"
                          ? "Conte-nos um pouco sobre suas necessidades e o melhor horário para a demonstração."
                          : "Como podemos ajudar?"
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Enviando..."
                      : tipo === "demonstração"
                        ? "Agendar demonstração"
                        : "Enviar mensagem"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
