"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-white/10 overflow-hidden w-80"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">Precisa de ajuda?</h3>
              <p className="text-white/70 text-sm">Estamos aqui para responder suas perguntas.</p>
            </div>
            <div className="bg-white/5 border-t border-white/10 p-4">
              <button className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 py-2 px-4 rounded-md w-full">
                Iniciar chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={toggleChat}
        className="bg-yellow-400 text-[#0b1c35] p-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
        aria-label="Abrir chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
