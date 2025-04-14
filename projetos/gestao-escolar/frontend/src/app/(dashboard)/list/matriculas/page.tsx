"use client";

import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Matricula } from "./types";
import { MatriculaForm } from "./MatriculaForm";
import { MatriculaViewModal } from "./MatriculaViewModal";
import { MatriculaDeleteDialog } from "./MatriculaDeleteDialog";
import { Button } from "@/components/ui/button";
import { Plus, FileDown } from "lucide-react";

import {
  getMatriculas,
  createMatricula,
  updateMatricula,
  deleteMatricula,
} from "@/lib/api/matriculas";

import { getTurmas } from "@/lib/api/turmas";
import { getAlunos } from "@/lib/api/alunos";

export default function MatriculaPage() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Matricula | null>(null);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [alunos, setAlunos] = useState<{ id: string; nome_completo: string }[]>([]);
  const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [matriculasData, alunosData, turmasData] = await Promise.all([
        getMatriculas(),
        getAlunos(),
        getTurmas(),
      ]);
      setMatriculas(matriculasData);
      setAlunos(Array.isArray(alunosData) ? alunosData : alunosData.results || []);
      setTurmas(Array.isArray(turmasData) ? turmasData : turmasData.results || []);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportPDF = () => {
    console.log("Exportar PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exportar Excel...");
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selected) {
        await updateMatricula(selected.id, data);
      } else {
        await createMatricula(data);
      }
      await fetchData();
      setOpenForm(false);
      setSelected(null);
    } catch (err) {
      console.error("Erro ao salvar matrícula", err);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteMatricula(selected.id);
      await fetchData();
      setOpenDelete(false);
      setSelected(null);
    } catch (err) {
      console.error("Erro ao excluir matrícula", err);
    }
  };

  const columns = getColumns({
    onView: (matricula) => {
      setSelected(matricula);
      setOpenView(true);
    },
    onEdit: (matricula) => {
      setSelected({
        ...matricula,
        aluno: (matricula as any).aluno?.id || "", // necessário para edição
        turma: (matricula as any).turma?.id || "",
      });
      setOpenForm(true);
    },
    onDelete: (matricula) => {
      setSelected(matricula);
      setOpenDelete(true);
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Matrículas</h2>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline">
            <FileDown className="w-4 h-4 mr-2" /> PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline">
            <FileDown className="w-4 h-4 mr-2" /> Excel
          </Button>
          <Button
            onClick={() => {
              setSelected(null);
              setOpenForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Nova Matrícula
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={matriculas}
        searchKey="aluno.nome_completo"
        isLoading={loading}
      />

      <MatriculaForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
        initialData={selected}
        turmas={turmas}
        alunos={alunos}
      />


      <MatriculaViewModal
        open={openView}
        onClose={() => setOpenView(false)}
        data={selected}
      />

      <MatriculaDeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        alunoNome={selected?.aluno?.nome_completo}
      />
    </div>
  );
}
