// components/turma/StepSalaForm.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/lib/auth";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import DeletePopup from "@/components/DeletePopup";

export type StepSalaFormProps = {
  onCreated: (id: number) => void;
  onClose?: () => void;
};

export default function StepSalaForm({ onCreated, onClose }: StepSalaFormProps) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    capacidade: "",
    localizacao: "",
    tipo: "normal",
  });

  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);
  const token = getAuthToken();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        capacidade: form.capacidade ? parseInt(form.capacidade) : null,
      };

      const res = await axios.post(`${BASE_URL}/api/salas/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPopup({ type: "success", message: "Sala criada com sucesso!" });
      setTimeout(() => {
        setPopup(null);
        onCreated(res.data.id);
        onClose?.();
      }, 1200);
    } catch (err) {
      setPopup({ type: "error", message: "Erro ao criar sala." });
      setTimeout(() => setPopup(null), 2000);
    }
  };

  return (
    <form className="space-y-4 relative" onSubmit={handleSubmit}>
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <h3 className="text-xl font-semibold text-white">2. Criar Sala</h3>

      <div>
        <Label htmlFor="nome">Nome da Sala</Label>
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

      <div>
        <Label htmlFor="capacidade">Capacidade</Label>
        <Input
          id="capacidade"
          name="capacidade"
          type="number"
          value={form.capacidade}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="localizacao">Localização</Label>
        <Input id="localizacao" name="localizacao" value={form.localizacao} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="tipo">Tipo</Label>
        <select
          id="tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="normal">Sala Normal</option>
          <option value="laboratorio">Laboratório</option>
          <option value="auditorio">Auditório</option>
        </select>
      </div>

      <Button type="submit" className="w-full bg-[#6A5FE7] text-white hover:bg-[#594fd4]">
        Salvar Sala
      </Button>
    </form>
  );
}
