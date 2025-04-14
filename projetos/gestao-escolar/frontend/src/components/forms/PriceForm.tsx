"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeletePopup from "@/components/DeletePopup";

const tipos = [
  { value: "matricula", label: "Matrícula" },
  { value: "mensalidade", label: "Mensalidade" },
  { value: "exame", label: "Exame" },
  { value: "outro", label: "Outro" },
];

type FormProps = {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
  onClose?: () => void;
};

const PriceForm = ({ type, data, onSuccess, onClose }: FormProps) => {
  const [niveis, setNiveis] = useState<{ id: number; nome: string }[]>([]);
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipo: "matricula",
      nivel: "",
      valor: "",
      descricao: "",
    },
  });

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/api/niveis/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNiveis(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erro ao buscar níveis:", err);
        setNiveis([]);
      }
    };
    fetchNiveis();
  }, []);

  useEffect(() => {
    if (type === "update" && data) {
      reset({
        tipo: data.tipo,
        nivel: String(data.nivel_id || data.nivel),
        valor: data.valor,
        descricao: data.descricao || "",
      });
    }
  }, [type, data, reset]);

  const onSubmit = async (formData: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        tipo: formData.tipo,
        nivel: formData.nivel,
        valor: formData.valor,
        descricao: formData.descricao,
      };

      if (type === "create") {
        await axios.post(`${BASE_URL}/api/precos/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "update" && data?.id) {
        await axios.put(`${BASE_URL}/api/precos/${data.id}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setPopup({ type: "success", message: "Preço salvo com sucesso!" });

      setTimeout(() => {
        setPopup(null);
        onSuccess?.();
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar preço:", error);
      setPopup({ type: "error", message: "Erro ao salvar preço!" });
      setTimeout(() => setPopup(null), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 relative">
      {popup && (
        
          <DeletePopup type={popup.type} message={popup.message} />
        
      )}

      <div>
        <Label>Tipo</Label>
        <Select onValueChange={(value) => setValue("tipo", value)} defaultValue={watch("tipo")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {tipos.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Nível</Label>
        <Select onValueChange={(value) => setValue("nivel", value)} defaultValue={watch("nivel")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(niveis) && niveis.length > 0 ? (
              niveis.map((n) => (
                <SelectItem key={n.id} value={String(n.id)}>
                  {n.nome}
                </SelectItem>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-2">Nenhum nível encontrado.</p>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Valor (€)</Label>
        <Input type="number" step="0.01" {...register("valor", { required: true })} />
        {errors.valor && <p className="text-sm text-red-500">Valor é obrigatório.</p>}
      </div>

      <div>
        <Label>Descrição</Label>
        <Textarea {...register("descricao")} rows={3} />
      </div>

      <Button type="submit">{type === "create" ? "Criar" : "Atualizar"}</Button>
    </form>
  );
};

export default PriceForm;
