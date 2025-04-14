"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const EtapaAdministrador = ({ register, errors, onBack }: any) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { y: -10, opacity: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Dados do Administrador</h3>
        <p className="text-gray-500 text-sm mt-1">Quem será o administrador principal?</p>
      </div>

      <motion.div
        custom={0}
        variants={inputVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-2"
      >
        <Label htmlFor="nome_admin" className="text-gray-700 font-medium">
          Nome do Administrador
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User className="h-5 w-5" />
          </div>
          <Input
            id="nome_admin"
            {...register("nome_admin")}
            placeholder="Nome completo"
            className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
        </div>
        {errors.nome_admin && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1">
            {errors.nome_admin.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        custom={1}
        variants={inputVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-2"
      >
        <Label htmlFor="email_admin" className="text-gray-700 font-medium">
          Email
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            id="email_admin"
            {...register("email_admin")}
            placeholder="email@exemplo.com"
            className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
        </div>
        {errors.email_admin && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1">
            {errors.email_admin.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        custom={2}
        variants={inputVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-2"
      >
        <Label htmlFor="senha_admin" className="text-gray-700 font-medium">
          Senha
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="senha_admin"
            type={showPassword ? "text" : "password"}
            {...register("senha_admin")}
            className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.senha_admin && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1">
            {errors.senha_admin.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        custom={3}
        variants={inputVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-2"
      >
        <Label htmlFor="confirmar_senha" className="text-gray-700 font-medium">
          Confirmar Senha
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="confirmar_senha"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmar_senha")}
            className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmar_senha && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1">
            {errors.confirmar_senha.message}
          </motion.p>
        )}
      </motion.div>

      <div className="flex justify-between gap-4 mt-8">
        <Button
          onClick={onBack}
          type="button"
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6 rounded-lg flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </Button>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          Cadastrar
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-gray-500 text-sm mt-6"
      >
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Faça login
        </a>
      </motion.div>
    </div>
  )
}

export default EtapaAdministrador
