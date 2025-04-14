"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

import { MatriculaComprovativoModal } from "./MatriculaComprovativoModal";

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    id: string;
    numero_matricula: string;
    aluno: {
      nome_completo: string;
      email: string;
      data_nascimento: string;
      telefone?: string;
    };
    turma: {
      nome: string;
      nivel: string;
    };
    ano_letivo: string;
    valor: number;
    data_matricula: string;
    status: "confirmada" | "pendente" | "cancelada";
    responsavel?: {
      nome: string;
      telefone?: string;
      email?: string;
    };
    instituicao?: {
      nome: string;
      endereco?: string;
      telefone?: string;
    };
  } | null;
};

export function MatriculaViewModal({ open, onClose, data }: Props) {
  const [showComprovativo, setShowComprovativo] = useState(false);

  if (!data) return null;

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmada":
        return "success";
      case "pendente":
        return "secondary";
      case "cancelada":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatAnoLetivo = (ano: string) => {
    const start = parseInt(ano);
    return isNaN(start) ? ano : `${start}/${start + 1}`;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">📘 Detalhes da Matrícula</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Informações completas da matrícula do aluno.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[420px] pr-2 mt-4">
            <div className="space-y-6 text-sm">
              <section className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-1">📌 Nº Matrícula</h3>
                  <p className="font-mono text-blue-600">{data.numero_matricula}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-1">📅 Ano Letivo</h3>
                  <p>{formatAnoLetivo(data.ano_letivo)}</p>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="font-semibold text-muted-foreground mb-2">👤 Aluno</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Nome:</strong> {data.aluno.nome_completo}</p>
                  <p><strong>Email:</strong> {data.aluno.email}</p>
                  <p><strong>Nascimento:</strong> {data.aluno.data_nascimento}</p>
                  {data.aluno.telefone && <p><strong>Telefone:</strong> {data.aluno.telefone}</p>}
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="font-semibold text-muted-foreground mb-2">🏫 Turma</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Turma:</strong> {data.turma.nome}</p>
                  <p><strong>Nível:</strong> {data.turma.nivel}</p>
                </div>
              </section>

              <Separator />

              <section className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-1">📌 Status</h3>
                  <Badge variant={getBadgeVariant(data.status)} className="capitalize">
                    {data.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-1">📅 Data da Matrícula</h3>
                  <p>{data.data_matricula}</p>
                </div>
              </section>

              {data.responsavel && (
                <>
                  <Separator />
                  <section>
                    <h3 className="font-semibold text-muted-foreground mb-2">👨‍👩‍👧 Responsável</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>Nome:</strong> {data.responsavel.nome}</p>
                      {data.responsavel.email && <p><strong>Email:</strong> {data.responsavel.email}</p>}
                      {data.responsavel.telefone && <p><strong>Telefone:</strong> {data.responsavel.telefone}</p>}
                    </div>
                  </section>
                </>
              )}

              <div className="pt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowComprovativo(true)}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir Comprovativo
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <MatriculaComprovativoModal
        open={showComprovativo}
        onClose={() => setShowComprovativo(false)}
        data={data}
      />
    </>
  );
}
