"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DeletePopup from "../DeletePopup";

const schema = z.object({
  nome: z.string().min(1, { message: "Nome completo obrigatório!" }),
  email: z.string().email({ message: "Email inválido!" }),
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

const TeacherForm = ({
  type,
  data,
  onSuccess,
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Preencher formulário no modo de edição
  useEffect(() => {
    if (type === "update" && data) {
      const copy = { ...data };
      delete copy.id;
      delete copy.foto;
      reset(copy);
      if (data.foto) {
        setPreviewUrl(`http://localhost:8000${data.foto}`);
      }
    }
  }, [type, data, reset]);

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

      const url =
        type === "update" && data?.id
          ? `http://localhost:8000/api/professores/${data.id}/`
          : "http://localhost:8000/api/professores/";

      const method = type === "update" ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatusMsg({
        type: "success",
        msg: type === "update" ? "Professor atualizado com sucesso!" : "Professor cadastrado com sucesso!",
      });

      setTimeout(() => {
        setStatusMsg(null);
        onSuccess?.();
        reset();
        setFotoFile(null);
        setPreviewUrl(null);
      }, 2000);
    } catch (err) {
      console.error("Erro ao salvar professor:", err);
      setStatusMsg({ type: "error", msg: "Erro ao salvar professor. Verifique os dados." });
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold">{type === "create" ? "Criar Professor" : "Atualizar Professor"}</h1>

        <div className="flex justify-between flex-wrap gap-4">
          <InputField label="Nome Completo" name="nome" register={register} error={errors.nome} />
          <InputField label="Email" name="email" register={register} error={errors.email} />
          <InputField label="Formação" name="formacao" register={register} error={errors.formacao} />
          <InputField label="Especialização" name="especializacao" register={register} error={errors.especializacao} />
          <InputField label="Biografia" name="biografia" register={register} error={errors.biografia} />
          <InputField label="Telefone" name="telefone" register={register} error={errors.telefone} />
          <InputField label="Data de Nascimento" name="data_nascimento" type="date" register={register} error={errors.data_nascimento} />
          <InputField label="Nacionalidade" name="nacionalidade" register={register} error={errors.nacionalidade} />
          <InputField label="Naturalidade" name="naturalidade" register={register} error={errors.naturalidade} />
          <InputField label="Endereço" name="endereco_completo" register={register} error={errors.endereco_completo} />
          <InputField label="Bairro" name="bairro" register={register} error={errors.bairro} />
          <InputField label="Cidade" name="cidade" register={register} error={errors.cidade} />
          <InputField label="Código Postal" name="codigo_postal" register={register} error={errors.codigo_postal} />
          <InputField label="Data de Admissão" name="data_admissao" type="date" register={register} error={errors.data_admissao} />

          {/* Gênero */}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Gênero</label>
            <select {...register("genero")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>

          {/* Regime de trabalho */}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Regime de Trabalho</label>
            <select {...register("regime_trabalho")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
              <option value="">Selecione</option>
              <option value="integral">Integral</option>
              <option value="parcial">Parcial</option>
              <option value="horista">Horista</option>
            </select>
          </div>

          {/* Upload de foto */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <label htmlFor="foto" className="text-xs text-gray-500 flex gap-2 cursor-pointer">
              <Image src="/upload.png" alt="upload" width={24} height={24} /> Foto
            </label>
            <input
              type="file"
              id="foto"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFotoFile(file);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                }
              }}
            />
            {previewUrl && (
              <Image src={previewUrl} alt="Preview" width={80} height={80} className="rounded-md mt-2 object-cover" />
            )}
          </div>
        </div>

        {/* Popup de sucesso/erro */}
        {statusMsg && <DeletePopup type={statusMsg.type} message={statusMsg.msg} />}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {type === "create" ? "Criar" : "Atualizar"}
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
