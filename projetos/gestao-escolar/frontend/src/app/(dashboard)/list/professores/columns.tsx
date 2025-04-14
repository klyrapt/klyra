import { ColumnDef } from "@tanstack/react-table";
import { Professor } from "./types";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  onView: (prof: Professor) => void;
  onEdit: (prof: Professor) => void;
  onDelete: (prof: Professor) => void;
};

export const getColumns = ({ onView, onEdit, onDelete }: Props): ColumnDef<Professor>[] => [
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => (
      <div className="font-semibold">{row.original.nome}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "disciplinas",
    header: "Disciplinas",
    cell: ({ row }) => (
      <div className="text-sm break-words">
        {row.original.disciplinas?.join(", ") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "turmas",
    header: "Turmas",
    cell: ({ row }) => (
      <div className="text-sm break-words">
        {row.original.turmas?.join(", ") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.telefone || "-"}</div>
    ),
  },
  {
    accessorKey: "endereco_completo",
    header: "Morada",
    cell: ({ row }) => (
      <div className="text-sm break-words">{row.original.endereco_completo || "-"}</div>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const prof = row.original;

      return (
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={() => onView(prof)}>
            <Eye size={16} />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(prof)}>
            <Pencil size={16} />
          </Button>
          <Button size="icon" variant="destructive" onClick={() => onDelete(prof)}>
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
