"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CheckCircle, School, User } from "lucide-react"

import EtapaInstituicao from "./EtapaInstituicao"
import EtapaAdministrador from "./EtapaAdministrador"
import LoadingOverlay from "./LoadingOverlay"

const schema = z
  .object({
    nome: z.string().min(3, "O nome da instituição é obrigatório"),
    nome_admin: z.string().min(3, "O nome do administrador é obrigatório"),
    email_admin: z.string().email("Email inválido"),
    senha_admin: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmar_senha: z.string(),
  })
  .refine((data) => data.senha_admin === data.confirmar_senha, {
    message: "As senhas não coincidem",
    path: ["confirmar_senha"],
  })

type FormData = z.infer<typeof schema>

export default function CadastroInstituicao() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const handleNext = async () => {
    const result = await trigger("nome")
    if (result) setStep(1)
  }

  const onSubmit = async (data: FormData) => {
    setErro("")
    setSucesso("")
    setLoading(true)
    try {
      await axios.post("http://localhost:8000/api/instituicoes/", data)
      localStorage.setItem("emailConfirmacao", data.email_admin)
      setSucesso("Cadastro realizado com sucesso!")
      setTimeout(() => router.push("/confirmar-email"), 2000)
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      setErro("Erro ao cadastrar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Cadastre sua instituição</h2>
          <p className="text-white/80 mt-1">Comece a transformar a gestão da sua escola hoje</p>
        </div>

        <div className="p-6">
          {/* Progress steps */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-[15%] right-[15%] top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <School className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-600">Instituição</span>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <User className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-600">Administrador</span>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${sucesso ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-600">Concluído</span>
            </div>
          </div>

          {/* Error and success messages */}
          <AnimatePresence mode="wait">
            {erro && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center"
              >
                <span className="bg-red-100 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {erro}
              </motion.div>
            )}

            {sucesso && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm flex items-center"
              >
                <span className="bg-green-100 p-1 rounded-full mr-2">
                  <CheckCircle className="h-4 w-4" />
                </span>
                {sucesso}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <AnimatePresence mode="wait">
              {loading && <LoadingOverlay />}

              {step === 0 && (
                <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                  <EtapaInstituicao register={register} errors={errors} onNext={handleNext} />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                  <EtapaAdministrador register={register} errors={errors} onBack={() => setStep(0)} />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 text-center text-white/80 text-sm"
      >
        Ao se cadastrar, você concorda com nossos{" "}
        <a href="#" className="text-yellow-400 hover:underline">
          Termos de Serviço
        </a>{" "}
        e{" "}
        <a href="#" className="text-yellow-400 hover:underline">
          Política de Privacidade
        </a>
        .
      </motion.div>
    </div>
  )
}
