// components/ChatWidget.tsx
"use client"

import { useState } from "react"
import { MessageCircle, MoreVertical, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  const quickReplies = [
    "Estou com um problema",
    "Tenho uma dúvida de conteúdo (preciso de um especialista)",
    "Tenho uma pergunta não relacionada ao conteúdo"
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-[360px] max-w-[90vw] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-[#0b1c35] text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/avatar.png" alt="Bot" width={32} height={32} className="rounded-full" />
                <div className="text-sm leading-tight">
                  <div className="font-medium">Olá! Como posso te ajudar?</div>
                </div>
              </div>
              <div className="flex gap-2">
                <MoreVertical className="w-4 h-4 opacity-60" />
                <ChevronDown
                  className="w-4 h-4 opacity-60 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto px-4 py-3 text-sm space-y-4">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                <span className="font-semibold text-gray-600 flex items-center gap-1">
                  🤖 Bot EduGestão
                </span>
                <p className="text-sm mt-1">
                  Olá! Sou uma assistente virtual e posso te ajudar.
                  <br />
                  Se precisar de atendimento humano, estou aqui para transferir você!
                </p>
              </div>

              {/* Respostas rápidas */}
              <div className="space-y-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    className="w-full border border-yellow-400 text-yellow-500 font-medium py-2 rounded-lg text-sm hover:bg-yellow-50 transition whitespace-normal"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Campo de mensagem */}
            <div className="border-t px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Digite uma mensagem"
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="text-yellow-500 font-semibold text-sm hover:underline">Enviar</button>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-400 p-2 border-t">
              Criado por <span className="font-semibold text-[#0b1c35]">EduGestão</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 text-[#0b1c35] p-4 rounded-full shadow-lg hover:bg-yellow-300"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
