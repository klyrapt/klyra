'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  InputField2  from "@/components/InputField2";
import axios from "axios";
import { getAuthToken } from "@/lib/auth";
import ActionButton from "@/components/ActionButton";

interface FormModalProps {
  type: "create" | "update" | "delete";
  table: "class";
  data?: any;
  id?: number;
  onSuccess?: () => void;
}

const FormModal = ({ type, table, data, id, onSuccess }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    ano_letivo: "",
    capacidade: "",
  });

  useEffect(() => {
    if (type === "update" && data) {
      setFormData({
        nome: data.nome || "",
        ano_letivo: data.ano_letivo?.toString() || "",
        capacidade: data.capacidade?.toString() || "",
      });
    }
  }, [type, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        ...formData,
        ano_letivo: parseInt(formData.ano_letivo),
        capacidade: parseInt(formData.capacidade),
      };

      if (type === "create") {
        await axios.post("/api/turmas/", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "update" && id) {
        await axios.put(`/api/turmas/${id}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "delete" && id) {
        await axios.delete(`/api/turmas/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="sm">
        <ActionButton type="create" onClick={() => setOpen(true)} />
        <ActionButton type="update" onClick={() => setOpen(true)} />
        <ActionButton type="delete" onClick={() => setOpen(true)} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type === "create" && "Criar Turma"}
              {type === "update" && "Editar Turma"}
              {type === "delete" && "Confirmar Exclusão"}
            </DialogTitle>
          </DialogHeader>

          {type === "delete" ? (
            <div className="space-y-4">
              <p>Tem certeza que deseja excluir esta turma?</p>
              <Button onClick={handleSubmit} className="w-full" variant="destructive">
                Confirmar Exclusão
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <InputField2
                label="Nome da Turma"
                name="nome"
                placeholder="Ex: 10A"
                value={formData.nome}
                onChange={handleChange}
              />



              <InputField2
                label="Ano Letivo"
                name="ano_letivo"
                type="number"
                value={formData.ano_letivo}
                onChange={handleChange}
              />
              <InputField2
                label="Capacidade"
                name="capacidade"
                type="number"
                value={formData.capacidade}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit} className="w-full">
                {type === "create" ? "Criar" : "Salvar"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormModal;
