"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthToken } from "@/lib/auth";

const TurmaForm = ({
  type,
  data,
  onSuccess,
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
}) => {
  const [formData, setFormData] = useState({
    nome: data?.nome || "",
    ano_letivo: data?.ano_letivo || "",
    capacidade: data?.capacidade || "",
    nivel: data?.nivel?.id || data?.nivel || data?.nivel_id || "",
    diretor_turma:
      data?.diretor_turma?.id || data?.diretor_turma || data?.diretor_turma_id || "",
  });

  const [niveis, setNiveis] = useState([]);
  const [professores, setProfessores] = useState([]);

  const token = getAuthToken();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [nivRes, profRes] = await Promise.all([
          axios.get("http://localhost:8000/api/niveis/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/professores/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setNiveis(nivRes.data);
        setProfessores(profRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchOptions();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url =
        type === "create"
          ? "http://localhost:8000/api/turmas/"
          : `http://localhost:8000/api/turmas/${data.id}/`;
      const method = type === "create" ? axios.post : axios.put;

      const payload = {
        ...formData,
        capacidade: Number(formData.capacidade),
        nivel: Number(formData.nivel),
        diretor_turma: formData.diretor_turma
          ? Number(formData.diretor_turma)
          : null,
      };

      await method(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="nome">Nome da Turma</Label>
        <Input
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="ano_letivo">Ano Letivo</Label>
        <Input
          id="ano_letivo"
          name="ano_letivo"
          type="number"
          value={formData.ano_letivo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="capacidade">Capacidade</Label>
        <Input
          id="capacidade"
          name="capacidade"
          type="number"
          value={formData.capacidade}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="nivel">Nível</Label>
        <select
          id="nivel"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecione um nível</option>
          {niveis.map((nivel: any) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="diretor_turma">Diretor da Turma</Label>
        <select
          id="diretor_turma"
          name="diretor_turma"
          value={formData.diretor_turma}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Selecione um professor</option>
          {professores.map((prof: any) => (
            <option key={prof.id} value={prof.id}>
              {prof.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right">
        <Button type="submit">
          {type === "create" ? "Criar" : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
};

export default TurmaForm;
