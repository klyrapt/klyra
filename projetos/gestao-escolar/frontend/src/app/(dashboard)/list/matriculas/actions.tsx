// src/app/(dashboard)/list/matriculas/actions.tsx

import { Eye, Pencil, Trash2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MatriculaActions({ id }: { id: number }) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon">
        <Eye className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Pencil className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <FileDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
