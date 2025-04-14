"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, School } from "lucide-react"
import { motion } from "framer-motion"

const EtapaInstituicao = ({ register, errors, onNext }: any) => {
  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <School className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Informações da Instituição</h3>
        <p className="text-gray-500 text-sm mt-1">Primeiro, vamos conhecer sua escola</p>
      </div>

      <motion.div
        variants={inputVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="nome" className="text-gray-700 font-medium">
          Nome da Instituição
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <School className="h-5 w-5" />
          </div>
          <Input
            id="nome"
            {...register("nome")}
            placeholder="Ex: Colégio Futuro"
            className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
        </div>
        {errors.nome && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1">
            {errors.nome.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Button
          onClick={onNext}
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          Próximo
          <ArrowRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}

export default EtapaInstituicao
