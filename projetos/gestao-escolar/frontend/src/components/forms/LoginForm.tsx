"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import { AnimatePresence, motion } from "framer-motion"
import { EyeIcon, EyeOffIcon, Mail, Lock, AlertCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  remember: z.boolean().optional(),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail")
    if (savedEmail) {
      form.setValue("email", savedEmail)
      form.setValue("remember", true)
    }
  }, [form])

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: LoginSchema) => {
    setError(null)
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const res = await axios.post("http://localhost:8000/api/auth/login/", values)
      const { token, refresh_token, nome, tipo } = res.data

      localStorage.setItem("accessToken", token)
      localStorage.setItem("refreshToken", refresh_token)
      localStorage.setItem("usuario", JSON.stringify({ nome, tipo }))

      Cookies.set("accessToken", token, { expires: 1 }) // expira em 1 dia
      Cookies.set("refreshToken", refresh_token)

      if (values.remember) {
        localStorage.setItem("rememberEmail", values.email)
      } else {
        localStorage.removeItem("rememberEmail")
      }

      router.push("/admin")
    } catch (err) {
      console.error("Login error:", err)
      setError("Email ou senha inválidos ou conta não confirmada.")
    } finally {
      setLoading(false)
    }
  }

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
  }

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center"
              >
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div custom={0} variants={inputVariants} initial="initial" animate="animate">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite seu email"
                        className="pl-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div custom={1} variants={inputVariants} initial="initial" animate="animate">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-medium">Senha</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        className="pl-10 pr-10 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={inputVariants}
            initial="initial"
            animate="animate"
            className="flex items-center justify-between"
          >
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember"
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </FormControl>
                  <FormLabel htmlFor="remember" className="text-sm font-normal text-gray-600 cursor-pointer">
                    Lembrar-me
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/esqueceu-senha"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </motion.div>

          <motion.div custom={3} variants={inputVariants} initial="initial" animate="animate" className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-10"
          >
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600 font-medium">Verificando credenciais...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
