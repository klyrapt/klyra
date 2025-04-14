"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {pt} from "date-fns/locale/pt";

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    foto?: string;
    formacao?: string;
    especializacao?: string;
    biografia?: string;
    genero?: "M" | "F" | "O";
    data_nascimento?: string;
    nacionalidade?: string;
    naturalidade?: string;
    endereco_completo?: string;
    bairro?: string;
    cidade?: string;
    codigo_postal?: string;
    data_admissao?: string;
    regime_trabalho?: string;
    disciplinas?: string[];
    turmas?: string[];
  } | null;
};

export function ProfessorViewModal({ open, onClose, data }: Props) {
  if (!data) return null;

  const formatarData = (value?: string) => {
    if (!value) return "-";
    try {
      return format(new Date(value), "dd/MM/yyyy", { locale: pt });
    } catch {
      return value;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perfil do Professor</DialogTitle>
          <DialogDescription>Informações detalhadas sobre o professor</DialogDescription>
        </DialogHeader>

        <ScrollArea className="pr-4">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={data.foto?.startsWith("http") ? data.foto : `${process.env.NEXT_PUBLIC_API_URL}${data.foto}`}
              alt="Foto do professor"
              width={80}
              height={80}
              className="rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">{data.nome}</h2>
              <p className="text-sm text-gray-500">{data.email}</p>
              {data.telefone && <p className="text-sm">{data.telefone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Formação:</strong> {data.formacao || "-"}
            </div>
            <div>
              <strong>Especialização:</strong> {data.especializacao || "-"}
            </div>
            <div>
              <strong>Data de Nascimento:</strong> {formatarData(data.data_nascimento)}
            </div>
            <div>
              <strong>Gênero:</strong>{" "}
              {data.genero === "M" ? "Masculino" : data.genero === "F" ? "Feminino" : data.genero === "O" ? "Outro" : "-"}
            </div>
            <div>
              <strong>Nacionalidade:</strong> {data.nacionalidade || "-"}
            </div>
            <div>
              <strong>Naturalidade:</strong> {data.naturalidade || "-"}
            </div>
            <div>
              <strong>Data de Admissão:</strong> {formatarData(data.data_admissao)}
            </div>
            <div>
              <strong>Regime de Trabalho:</strong>{" "}
              {data.regime_trabalho === "integral"
                ? "Integral"
                : data.regime_trabalho === "parcial"
                ? "Parcial"
                : data.regime_trabalho === "horista"
                ? "Horista"
                : "-"}
            </div>
            <div className="md:col-span-2">
              <strong>Endereço:</strong> {data.endereco_completo || "-"}
              {data.bairro && `, ${data.bairro}`}
              {data.cidade && `, ${data.cidade}`}
              {data.codigo_postal && ` - ${data.codigo_postal}`}
            </div>
            {data.biografia && (
              <div className="md:col-span-2">
                <strong>Biografia:</strong>
                <p className="text-sm mt-1 text-gray-600">{data.biografia}</p>
              </div>
            )}
          </div>

          {/* Disciplinas e Turmas */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Disciplinas</h3>
              <div className="flex flex-wrap gap-2">
                {data.disciplinas?.length ? (
                  data.disciplinas.map((d, i) => (
                    <Badge key={i} variant="secondary">
                      {d}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhuma disciplina atribuída</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Turmas</h3>
              <div className="flex flex-wrap gap-2">
                {data.turmas?.length ? (
                  data.turmas.map((t, i) => (
                    <Badge key={i} variant="secondary">
                      {t}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhuma turma atribuída</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
