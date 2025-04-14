"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Mail, AlertCircle, ArrowRight, Clock } from "lucide-react"
import Image from "next/image"

const VerificarEmailPage = () => {
  const [codigo, setCodigo] = useState<string[]>(["", "", "", "", "", ""])
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailConfirmacao")
    setEmail(storedEmail)

    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setResendDisabled(false)
    }
  }, [resendCountdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const novoCodigo = [...codigo]
    novoCodigo[index] = value
    setCodigo(novoCodigo)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("Text").slice(0, 6)
    if (!/^\d+$/.test(pasted)) return

    const chars = pasted.split("")
    const novoCodigo = [...codigo]
    chars.forEach((char, i) => {
      if (i < 6) novoCodigo[i] = char
    })
    setCodigo(novoCodigo)

    // Focar no último campo preenchido
    const lastIndex = Math.min(chars.length, 6) - 1
    inputRefs.current[lastIndex]?.focus()
  }

  const handleResendCode = async () => {
    if (!email) return

    setResendDisabled(true)
    setResendCountdown(60) // Disable for 60 seconds

    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app, you would call your API here
      // await axios.post("http://localhost:8000/api/resend-code/", { email });
    } catch (err) {
      console.error("Error resending code:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")
    setLoading(true)

    const codigoFinal = codigo.join("")
    if (!email) {
      setErro("Email não encontrado.")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Real API call
      await axios.post("http://localhost:8000/api/verificar-email/", {
        email,
        codigo: codigoFinal,
      })

      setSucesso(true)
      setTimeout(() => {
        router.push("/sign-in")
      }, 2500)
    } catch (err) {
      setErro("Código inválido ou expirado.")
    } finally {
      setLoading(false)
    }
  }

  const isCodeComplete = codigo.every((digit) => digit !== "")

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-b from-[#0b1c35] via-[#0d2240] to-[#0b1c35]">
      {/* Left side - Illustration and branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#081628] p-8 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 text-[#0b1c35] h-10 w-10 rounded-md flex items-center justify-center font-bold text-2xl">
              K
            </div>
            <span className="text-white text-2xl font-bold">Klyra</span>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex-grow flex items-center justify-center py-12">
          <div className="relative w-full max-w-md">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Email Verification Illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        {/* Info box */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
            <Mail className="h-5 w-5 text-yellow-400" />
            Por que verificar seu email?
          </h3>
          <p className="text-white/80">
            A verificação do seu email ajuda a proteger sua conta e garante que possamos entrar em contato com você para
            informações importantes sobre sua escola.
          </p>
        </div>
      </div>

      {/* Right side - Verification form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Verificação de Email</h2>
              <p className="text-white/80 mt-1">
                Digite o código de 6 dígitos enviado para <span className="font-medium">{email || "seu email"}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 relative">
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg"
                  >
                    <div className="h-12 w-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-600 font-medium">Verificando código...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex gap-2 md:gap-4">
                    {codigo.map((digit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className={`w-12 h-16 md:w-14 md:h-20 text-center text-2xl font-bold rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            digit
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          ref={(el) => {
                            if (el) inputRefs.current[index] = el
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
                  <Clock className="h-4 w-4" />
                  <span>
                    Código expira em <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
                  </span>
                </div>

                <AnimatePresence>
                  {erro && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      {erro}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={!isCodeComplete || loading}
                  className={`w-full py-6 rounded-xl text-white transition-all duration-300 ${
                    isCodeComplete ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg" : "bg-blue-400 cursor-not-allowed"
                  }`}
                >
                  Verificar Código
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">Não recebeu o código?</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  {resendDisabled ? `Reenviar código (${resendCountdown}s)` : "Reenviar código"}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <a
              href="/sign-up"
              className="text-white/80 hover:text-white text-sm flex items-center justify-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para o cadastro
            </a>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {sucesso && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="mx-auto h-20 w-20 flex items-center justify-center bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Verificado!</h3>
              <p className="text-gray-600 mb-6">
                Seu email foi verificado com sucesso. Você será redirecionado para a página de login.
              </p>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                  className="h-full bg-green-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VerificarEmailPage
