"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { toast } from "sonner";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  formacao: z.string().optional(),
  especializacao: z.string().optional(),
  biografia: z.string().optional(),
  telefone: z.string().optional(),
  data_nascimento: z.string().optional(),
  genero: z.enum(["M", "F", "O"]).optional(),
  nacionalidade: z.string().optional(),
  naturalidade: z.string().optional(),
  endereco_completo: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  codigo_postal: z.string().optional(),
  data_admissao: z.string().optional(),
  regime_trabalho: z.enum(["integral", "parcial", "horista"]).optional(),
});

type Inputs = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: any;
};

export function ProfessorForm({ open, onClose, onSubmitSuccess, initialData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isEditMode = !!initialData;

  useEffect(() => {
    if (open) {
      if (isEditMode && initialData) {
        const copy = { ...initialData };
        delete copy.foto;
        delete copy.id;
        reset(copy);

        if (initialData.foto) {
          setPreviewUrl(
            initialData.foto.startsWith("http")
              ? initialData.foto
              : `http://localhost:8000${initialData.foto}`
          );
        }
      } else {
        reset();
        setPreviewUrl(null);
        setFotoFile(null);
      }
    }
  }, [open, isEditMode, initialData, reset]);

  const onSubmit = async (values: Inputs) => {
    try {
      const token = Cookies.get("accessToken");
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (fotoFile) {
        formData.append("foto", fotoFile);
      }

      const url = isEditMode
        ? `http://localhost:8000/api/professores/${initialData.id}/`
        : "http://localhost:8000/api/professores/";

      const method = isEditMode ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(isEditMode ? "Professor atualizado!" : "Professor criado!");
      onSubmitSuccess();
      onClose();
      reset();
      setPreviewUrl(null);
    } catch (err) {
      console.error("Erro ao salvar professor:", err);
      toast.error("Erro ao salvar professor. Verifique os dados.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
      <h2 className="text-lg font-semibold">{isEditMode ? "Atualizar Professor" : "Novo Professor"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nome completo</Label>
          <Input {...register("nome")} />
          {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Label>Telefone</Label>
          <Input {...register("telefone")} />
        </div>
        <div>
          <Label>Data de nascimento</Label>
          <Input type="date" {...register("data_nascimento")} />
        </div>
        <div>
          <Label>Gênero</Label>
          <select {...register("genero")} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>
        </div>
        <div>
          <Label>Nacionalidade</Label>
          <Input {...register("nacionalidade")} />
        </div>
        <div>
          <Label>Naturalidade</Label>
          <Input {...register("naturalidade")} />
        </div>
        <div>
          <Label>Endereço</Label>
          <Input {...register("endereco_completo")} />
        </div>
        <div>
          <Label>Bairro</Label>
          <Input {...register("bairro")} />
        </div>
        <div>
          <Label>Cidade</Label>
          <Input {...register("cidade")} />
        </div>
        <div>
          <Label>Código Postal</Label>
          <Input {...register("codigo_postal")} />
        </div>
        <div>
          <Label>Data de admissão</Label>
          <Input type="date" {...register("data_admissao")} />
        </div>
        <div>
          <Label>Regime de trabalho</Label>
          <select {...register("regime_trabalho")} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            <option value="integral">Integral</option>
            <option value="parcial">Parcial</option>
            <option value="horista">Horista</option>
          </select>
        </div>
        <div>
          <Label>Formação</Label>
          <Input {...register("formacao")} />
        </div>
        <div>
          <Label>Especialização</Label>
          <Input {...register("especializacao")} />
        </div>
        <div className="md:col-span-2">
          <Label>Biografia</Label>
          <Textarea {...register("biografia")} />
        </div>
        <div>
          <Label>Foto</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFotoFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview da foto"
              width={100}
              height={100}
              className="rounded mt-2"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{isEditMode ? "Atualizar" : "Criar"}</Button>
      </div>
    </form>
  );
}
