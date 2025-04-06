"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

import LoadingOverlay from "../cadastro/LoadingOverlay";
import { AnimatePresence, motion } from "framer-motion";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect } from "react";


const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  remember: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("remember", true);
    }
  }, [form]);
  

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (values: LoginSchema) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login/", values);
      const { token, refresh_token, nome, tipo } = res.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("usuario", JSON.stringify({ nome, tipo }));



      Cookies.set("accessToken", token, { expires: 1 }); // expira em 1 dia
      Cookies.set("refreshToken", refresh_token);



      if (values.remember) {
        localStorage.setItem("rememberEmail", values.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.push("/admin");
    } catch (err) {
      setError("Email ou senha inválidos ou conta não confirmada.");
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Faça o seu login
        </span>
      </h2>

      

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu e-mail*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite seu e-mail" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      className="pr-10"
                    />
                  </FormControl>
                  <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox lembrar-me */}
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  id="remember"
                  className="w-4 h-4"
                />
                <FormLabel htmlFor="remember" className="text-sm font-normal">
                  Lembrar-me
                </FormLabel>
              </FormItem>
            )}
          />

          {error && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md text-center">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#6A5FE7] hover:bg-[#594fd4] text-white font-semibold py-2 rounded-md transition"
          >
            ENTRAR
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Esqueceu sua senha?{" "}
          <Link href="/esqueceu-senha" className="text-blue-600 hover:underline font-semibold">
            Clique aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}
