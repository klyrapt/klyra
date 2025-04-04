// components/ContatoModal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Paperclip } from "lucide-react"

interface ContatoModalProps {
  open: boolean
  onClose: () => void
  tipo?: "contato" | "demonstração"
}

export default function ContatoModal({ open, onClose, tipo = "contato" }: ContatoModalProps) {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" })
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [enviado, setEnviado] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setArquivo(e.target.files[0])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de envio (API ou e-mail)
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      onClose()
    }, 2000)
  }

  const titulo = tipo === "demonstração" ? "Agendar Demonstração" : "Fale Conosco"
  const subtitulo = tipo === "demonstração"
    ? "Preencha o formulário e agende uma demonstração com nosso time."
    : "Envie uma mensagem ou sugestão. Nossa equipe vai responder em breve."

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-1">{titulo}</DialogTitle>
          <p className="text-muted-foreground text-sm mb-4">{subtitulo}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Seu nome"
            required
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Seu e-mail"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Escreva sua mensagem..."
            rows={4}
            required
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          />

          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <Paperclip className="w-4 h-4" />
            <span>{arquivo ? arquivo.name : "Anexar documento (PDF ou imagem)"}</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={handleFileChange}
            />
          </label>

          <Button type="submit" className="w-full" disabled={enviado}>
            {enviado ? "Enviado com sucesso!" : "Enviar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
