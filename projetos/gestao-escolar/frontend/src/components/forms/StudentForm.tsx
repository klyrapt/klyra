"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DeletePopup from "@/components/DeletePopup";

const schema = z.object({
  nome_completo: z.string().min(1, { message: "Nome obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().optional(),
  data_nascimento: z.string().optional(),
  genero: z.enum(["M", "F", "O"]).optional(),
  nacionalidade: z.string().optional(),
  naturalidade: z.string().optional(),

  documento_identidade: z.string().optional(),
  numero_documento: z.string().optional(),
  data_emissao_documento: z.string().optional(),
  local_emissao_documento: z.string().optional(),

  endereco_completo: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  codigo_postal: z.string().optional(),

  tem_alguma_deficiencia: z.boolean().optional(),
  descricao_deficiencia: z.string().optional(),

  alergias: z.string().optional(),
  plano_saude: z.string().optional(),

  situacao_escolar_anterior: z.string().optional(),
  escola_anterior: z.string().optional(),
  ano_concluido_anterior: z.string().optional(),

  pai_nome: z.string().optional(),
  mae_nome: z.string().optional(),
});

schema.superRefine((data, ctx) => {
  if (data.tem_alguma_deficiencia && !data.descricao_deficiencia?.trim()) {
    ctx.addIssue({
      path: ["descricao_deficiencia"],
      message: "Descrição obrigatória.",
      code: z.ZodIssueCode.custom,
    });
  }
});

type Inputs = z.infer<typeof schema>;

export default function StudentForm({
  type,
  data,
  onSuccess,
  onClose,
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const temDeficiencia = watch("tem_alguma_deficiencia");

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof Inputs, value as string | boolean | undefined);
      });
      if (data.foto_perfil) {
        setPreviewUrl(data.foto_perfil.startsWith("http") ? data.foto_perfil : `http://localhost:8000${data.foto_perfil}`);
      }
    }
  }, [data, setValue]);

  const onSubmit = async (values: Inputs) => {
    try {
      const token = Cookies.get("accessToken");
      const url =
        type === "create"
          ? "http://localhost:8000/api/alunos/"
          : `http://localhost:8000/api/alunos/${data.id}/`;

      const method = type === "create" ? "post" : "put";
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, typeof value === "boolean" ? String(value) : value ?? "");
      });
      if (fotoFile) formData.append("foto_perfil", fotoFile);

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPopup({ type: "success", message: type === "create" ? "Aluno criado!" : "Aluno atualizado!" });
      setTimeout(() => {
        setPopup(null);
        onSuccess?.();
        onClose?.();
      }, 2000);
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", message: "Erro ao salvar aluno." });
      setTimeout(() => setPopup(null), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[75vh] overflow-y-auto p-2">
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Nome Completo" error={errors.nome_completo?.message}><Input {...register("nome_completo")} /></Field>
        <Field label="Email" error={errors.email?.message}><Input {...register("email")} /></Field>
        <Field label="Telefone"><Input {...register("telefone")} /></Field>
        <Field label="Data de Nascimento"><Input type="date" {...register("data_nascimento")} /></Field>
        <Field label="Nacionalidade"><Input {...register("nacionalidade")} /></Field>
        <Field label="Naturalidade"><Input {...register("naturalidade")} /></Field>

        <Field label="Gênero">
          <Select onValueChange={(v) => setValue("genero", v as "M" | "F" | "O")}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
              <SelectItem value="O">Outro</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Endereço"><Textarea {...register("endereco_completo")} /></Field>
        <Field label="Bairro"><Input {...register("bairro")} /></Field>
        <Field label="Cidade"><Input {...register("cidade")} /></Field>
        <Field label="Código Postal"><Input {...register("codigo_postal")} /></Field>

        <Field label="Documento de Identidade"><Input {...register("documento_identidade")} /></Field>
        <Field label="Número do Documento"><Input {...register("numero_documento")} /></Field>
        <Field label="Data de Emissão"><Input type="date" {...register("data_emissao_documento")} /></Field>
        <Field label="Local de Emissão"><Input {...register("local_emissao_documento")} /></Field>

        <div className="col-span-full flex items-center gap-2">
          <Checkbox id="tem_alguma_deficiencia" checked={temDeficiencia} onCheckedChange={(v) => setValue("tem_alguma_deficiencia", Boolean(v))} />
          <Label htmlFor="tem_alguma_deficiencia">Tem alguma deficiência?</Label>
        </div>

        {temDeficiencia && (
          <Field label="Descrição da Deficiência" error={errors.descricao_deficiencia?.message}>
            <Textarea {...register("descricao_deficiencia")} />
          </Field>
        )}

        <Field label="Alergias"><Input {...register("alergias")} /></Field>
        <Field label="Plano de Saúde"><Input {...register("plano_saude")} /></Field>
        <Field label="Situação Escolar Anterior"><Input {...register("situacao_escolar_anterior")} /></Field>
        <Field label="Escola Anterior"><Input {...register("escola_anterior")} /></Field>
        <Field label="Ano Concluído"><Input {...register("ano_concluido_anterior")} /></Field>
        <Field label="Nome do Pai"><Input {...register("pai_nome")} /></Field>
        <Field label="Nome da Mãe"><Input {...register("mae_nome")} /></Field>

        <div className="col-span-full">
          <Label className="text-sm text-gray-700">Foto do Aluno</Label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <label htmlFor="foto_perfil" className="cursor-pointer text-blue-600 hover:underline text-sm">
              Selecionar Imagem
            </label>
            <input
              type="file"
              id="foto_perfil"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFotoFile(file);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                }
              }}
            />
            {previewUrl && <img src={previewUrl} alt="Preview" className="w-24 h-24 rounded-md object-cover ring-2 ring-lamaSky" />}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-sky-500 text-white">
        {type === "create" ? "Cadastrar Aluno" : "Atualizar Aluno"}
      </Button>
    </form>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm text-gray-700">{label}</Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
