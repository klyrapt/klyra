"use client";

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
  email: z.string().email("Digite um e-mail válido"),
});

type EsqueceuSenhaData = z.infer<typeof schema>;

export default function EsqueceuSenhaPage() {
  const form = useForm<EsqueceuSenhaData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const onSubmit = async (values: EsqueceuSenhaData) => {
    setErro(null);
    setMensagem(null);
    try {
      await axios.post("http://localhost:8000/api/auth/password-reset/", values);
      setMensagem("Um link de redefinição foi enviado para seu e-mail.");
    } catch (err) {
      setErro("Não foi possível enviar o link. Verifique o e-mail informado.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0b1c35] text-white px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Recuperar Senha</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email cadastrado</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Enviar link
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
