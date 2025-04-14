"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg"
  >
    <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
    <p className="text-blue-600 font-medium">Processando seu cadastro...</p>
    <p className="text-gray-500 text-sm mt-2">Isso pode levar alguns segundos</p>
  </motion.div>
)

export default LoadingOverlay
