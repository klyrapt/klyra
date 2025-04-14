import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Matricula } from "./types";

type Props = {
  onView: (matricula: Matricula) => void;
  onEdit: (matricula: Matricula) => void;
  onDelete: (matricula: Matricula) => void;
};

export const getColumns = ({ onView, onEdit, onDelete }: Props): ColumnDef<Matricula>[] => [

  {
    accessorKey: "numero_matricula",
    header: "Nº Matrícula",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.numero_matricula}</span>
    ),
  },
  
  {
    header: "Aluno",
    accessorKey: "aluno.nome_completo",
    cell: ({ row }) => <span>{row.original.aluno.nome_completo}</span>,
  },

  {
    header: "Turma",
    accessorKey: "turma.nome",
    cell: ({ row }) => <span>{row.original.turma.nome}</span>,
  },
  {
    header: "Nível",
    accessorKey: "turma.nivel",
    cell: ({ row }) => <span>{row.original.turma.nivel}</span>,
  },
  {
    accessorKey: "ano_letivo",
    header: "Ano Letivo",
    cell: ({ row }) => {
      const ano = row.original.ano_letivo;
      return `${ano}/${Number(ano) + 1}`;
    },
  },
  
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "confirmada"
              ? "success"
              : status === "cancelada"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => {
      const matricula = row.original;

      return (
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={() => onView(matricula)}>
            <Eye size={16} />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(matricula)}>
            <Pencil size={16} />
          </Button>
          <Button size="icon" variant="destructive" onClick={() => onDelete(matricula)}>
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
