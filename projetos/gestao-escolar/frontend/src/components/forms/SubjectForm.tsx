"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import DeletePopup from "@/components/DeletePopup"; // usamos o DeletePopup aqui

const schema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  carga_horaria: z.coerce.number().min(1, "Carga horária obrigatória"),
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
  onSuccess,
  onClose, // novo
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
  onClose?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const onSubmit = async (values: FormData) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (type === "create") {
        await axios.post("http://localhost:8000/api/disciplinas/", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPopup({ type: "success", message: "Disciplina criada com sucesso!" });
      } else {
        await axios.put(`http://localhost:8000/api/disciplinas/${data.id}/`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPopup({ type: "success", message: "Disciplina atualizada com sucesso!" });
      }

      setTimeout(() => {
        setPopup(null);
        onSuccess?.();
        onClose?.(); // Fecha o modal
      }, 2000);
    } catch (error) {
      console.error("Erro:", error);
      setPopup({ type: "error", message: "Erro ao salvar disciplina. Verifique os dados." });
      setTimeout(() => setPopup(null), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-4">
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <div>
        <label className="text-sm">Nome</label>
        <Input {...register("nome")} placeholder="Nome da disciplina" />
        {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="text-sm">Carga horária</label>
        <Input {...register("carga_horaria")} placeholder="Ex: 40" type="number" />
        {errors.carga_horaria && (
          <p className="text-red-500 text-xs">{errors.carga_horaria.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm">Descrição</label>
        <Input {...register("descricao")} placeholder="Opcional" />
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
        {type === "create" ? "Criar Disciplina" : "Atualizar Disciplina"}
      </Button>
    </form>
  );
};

export default SubjectForm;
