"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function TesteInputs() {
  const { register, watch } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <div>
          <label>Nome da Instituição</label>
          <Input {...register("nome")} placeholder="Instituição" />
        </div>
        <div>
          <label>Nome do Administrador</label>
          <Input {...register("nome_admin")} placeholder="Admin" />
        </div>
        <pre className="bg-gray-100 p-2 mt-4 text-sm">
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </form>
    </div>
  );
}
