// ✅ components/turma/StepNivelForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/lib/auth";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import DeletePopup from "@/components/DeletePopup";

export type StepNivelFormProps = {
  onCreated: (id: number) => void;
  onClose?: () => void;
};

export default function StepNivelForm({ onCreated, onClose }: StepNivelFormProps) {
  const [form, setForm] = useState({ nome: "", descricao: "" });
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);
  const token = getAuthToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/niveis/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopup({ type: "success", message: "Nível criado com sucesso!" });
      setTimeout(() => {
        setPopup(null);
        onCreated(res.data.id);
        onClose?.();
      }, 1200);
    } catch (err) {
      setPopup({ type: "error", message: "Erro ao criar nível." });
      setTimeout(() => setPopup(null), 2000);
    }
  };

  return (
    <form className="space-y-4 relative" onSubmit={handleSubmit}>
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <h3 className="text-xl font-semibold text-white">1. Criar Nível</h3>

      <div>
        <Label htmlFor="nome">Nome do Nível</Label>
        <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-[#6A5FE7] text-white hover:bg-[#594fd4]">
        Salvar Nível
      </Button>
    </form>
  );
}
