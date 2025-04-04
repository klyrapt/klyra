"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

const schema = z.object({
  novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.novaSenha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type RedefinirSenhaData = z.infer<typeof schema>;

export default function RedefinirSenhaPage() {
  const { user_id, token } = useParams();
  const router = useRouter();

  const form = useForm<RedefinirSenhaData>({
    resolver: zodResolver(schema),
    defaultValues: { novaSenha: "", confirmarSenha: "" },
  });

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const onSubmit = async (values: RedefinirSenhaData) => {
    try {
      await axios.post(`http://localhost:8000/api/auth/password-reset/${user_id}/${token}/`, {
        new_password: values.novaSenha,
      });
      setMensagem("Senha redefinida com sucesso! Redirecionando...");
      setTimeout(() => router.push("/sign-in"), 2500);
    } catch (err) {
      setErro("O link é inválido ou já expirou.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0b1c35] text-white px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Redefinir Senha</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="novaSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl><Input type="password" placeholder="Nova senha" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl><Input type="password" placeholder="Confirme a senha" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Redefinir senha
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
