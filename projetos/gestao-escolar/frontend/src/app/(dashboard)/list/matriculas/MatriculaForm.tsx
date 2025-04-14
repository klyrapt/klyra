"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  turmas: { id: string; nome: string }[];
  alunos: { id: string; nome_completo: string }[];
};

export function MatriculaForm({
  open,
  onClose,
  onSubmit,
  initialData,
  turmas,
  alunos,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      aluno: "",
      turma: "",
      ano_letivo: "",
      status: "confirmada",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        aluno: initialData.aluno?.id?.toString() ?? "",
        turma: initialData.turma?.id?.toString() ?? "",
        ano_letivo: initialData.ano_letivo ?? "",
        status: initialData.status ?? "confirmada",
      });
    }
  }, [initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Matrícula" : "Nova Matrícula"}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Aluno */}
            <div className="grid gap-2">
              <Label>Aluno</Label>
              <Select
                defaultValue={initialData?.aluno?.id?.toString()}
                onValueChange={(val) => setValue("aluno", val)}

              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {alunos.map((aluno) => (
                    <SelectItem key={aluno.id} value={aluno.id.toString()}>
                      {aluno.nome_completo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Turma */}
            <div className="grid gap-2">
              <Label>Turma</Label>
              <Select
                defaultValue={initialData?.turma?.id?.toString()}
                onValueChange={(val) => setValue("turma", val)}

              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  {turmas.map((turma) => (
                    <SelectItem key={turma.id} value={turma.id.toString()}>
                      {turma.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ano Letivo */}
            <div className="grid gap-2">
              <Label>Ano Letivo</Label>
              <Input {...register("ano_letivo")} placeholder="Ex: 2025" />
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                defaultValue={initialData?.status ?? "confirmada"}
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {initialData ? "Salvar Alterações" : "Criar Matrícula"}
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
