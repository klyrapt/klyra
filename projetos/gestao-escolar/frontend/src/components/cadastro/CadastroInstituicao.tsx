// CadastroInstituicao.tsx

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import EtapaInstituicao from "./EtapaInstituicao";
import EtapaAdministrador from "./EtapaAdministrador";
import LoadingOverlay from "./LoadingOverlay";

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
  });

type FormData = z.infer<typeof schema>;

export default function CadastroInstituicao() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setErro("");
    setSucesso("");
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/instituicoes/", data);
      localStorage.setItem("emailConfirmacao", data.email_admin);
      setSucesso("Cadastro realizado com sucesso!");
      setTimeout(() => router.push("/confirmar-email"), 2000);
    } catch {
      setErro("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <h2 className="text-xl font-semibold text-center mb-4 text-[#0b1c35]">
        Cadastro de Instituição
      </h2>

      {erro && <p className="text-red-600 text-sm text-center mb-2">{erro}</p>}
      {sucesso && <p className="text-green-600 text-sm text-center mb-2">{sucesso}</p>}

      {step === 0 && <EtapaInstituicao register={register} errors={errors} onNext={() => setStep(1)} />}
      {step === 1 && <EtapaAdministrador register={register} errors={errors} onBack={() => setStep(0)} />}
    </form>
  );
}
