"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const TeacherAssignmentForm = ({ professorId, onSuccess }: { professorId: number; onSuccess: () => void }) => {
  const [disciplinas, setDisciplinas] = useState<any[] | null>(null);
  const [turmas, setTurmas] = useState<any[] | null>(null);
  const [formData, setFormData] = useState({ disciplina: "", turma: "" });
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOptions = async () => {
    try {
      const token = Cookies.get("accessToken");
      const [disciplinaRes, turmaRes] = await Promise.all([
        axios.get("http://localhost:8000/api/disciplinas/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/turmas/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setDisciplinas(disciplinaRes.data.results || disciplinaRes.data);
      setTurmas(turmaRes.data.results || turmaRes.data);
    } catch (error) {
      console.error("Erro ao carregar opções:", error);
      setStatusMsg({ type: "error", msg: "Erro ao carregar disciplinas ou turmas." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("accessToken");
      await axios.post(
        "http://localhost:8000/api/ensinos/",
        {
          professor: professorId,
          disciplina: formData.disciplina,
          turma: formData.turma,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatusMsg({ type: "success", msg: "Atribuição realizada com sucesso!" });
      setFormData({ disciplina: "", turma: "" });
      onSuccess?.();
    } catch (error: any) {
      console.error("Erro ao atribuir ensino:", error);
      const msg = error.response?.data?.detail || "Erro ao atribuir ensino.";
      setStatusMsg({ type: "error", msg });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Atribuir Disciplina e Turma</h2>

      {loading && <p>Carregando opções...</p>}

      {!loading && (
        <>
          <div>
            <label className="text-sm text-gray-600">Disciplina</label>
            <select
              name="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione</option>
              {disciplinas?.map((d: any) => (
                <option key={d.id} value={d.id}>{d.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Turma</label>
            <select
              name="turma"
              value={formData.turma}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione</option>
              {turmas?.map((t: any) => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
          </div>

          {statusMsg && (
            <p className={`text-sm ${statusMsg.type === "error" ? "text-red-500" : "text-green-600"}`}>
              {statusMsg.msg}
            </p>
          )}

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Atribuir
          </button>
        </>
      )}
    </form>
  );
};

export default TeacherAssignmentForm;