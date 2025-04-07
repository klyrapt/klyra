"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DeletePopup from "../DeletePopup";

const TeacherAssignmentForm = ({
  professorId,
  onSuccess,
  onClose, // <-- novo!
}: {
  professorId: number;
  onSuccess: () => void;
  onClose: () => void; // <-- novo!
}) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [formData, setFormData] = useState({ disciplina: "", turma: "" });
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const [discRes, turmaRes] = await Promise.all([
          axios.get("http://localhost:8000/api/disciplinas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/turmas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDisciplinas(discRes.data.results || discRes.data);
        setTurmas(turmaRes.data.results || turmaRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://localhost:8000/api/ensinos/",
        {
          professor: professorId,
          disciplina: formData.disciplina,
          turma: formData.turma,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPopup({ type: "success", message: "Atribuição feita com sucesso!" });

      setTimeout(() => {
        setPopup(null);
        onSuccess();
        onClose(); // <-- Fecha o modal
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao atribuir:", error);
      const msg = error.response?.data?.detail || "Erro ao atribuir.";
      setPopup({ type: "error", message: msg });
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <div>
        <label className="block font-medium mb-1">Disciplina</label>
        <select
          name="disciplina"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione</option>
          {disciplinas.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Turma</label>
        <select
          name="turma"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione</option>
          {turmas.map((t: any) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-lamaSky text-white px-4 py-2 rounded hover:bg-blue-700">
        Atribuir
      </button>
    </form>
  );
};

export default TeacherAssignmentForm;
