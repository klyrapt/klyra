"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import DeletePopup from "./DeletePopup";

// Dynamically import the form components
const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const SubjectForm = dynamic(() => import("../components/forms/SubjectForm"));
const TurmaForm = dynamic(() => import("../components/forms/TurmaForm"));
const TeacherAssignmentForm = dynamic(() => import("../components/forms/TeacherAssignmentForm"));

// Map forms to each table
const forms: Record<
  string,
  (
    type: "create" | "update",
    data?: any,
    onSuccess?: () => void,
    onClose?: () => void
  ) => JSX.Element
> = {
  teacher: (type, data, onSuccess, onClose) => (
    <TeacherForm type={type} data={data} onSuccess={onSuccess} onClose={onClose} />
  ),
  student: (type, data, onSuccess, onClose) => (
    <StudentForm type={type} data={data} onSuccess={onSuccess} onClose={onClose} />
  ),
  subject: (type, data, onSuccess, onClose) => (
    <SubjectForm type={type} data={data} onSuccess={onSuccess} onClose={onClose} />
  ),
  class: (type, data, onSuccess, onClose) => (
    <TurmaForm type={type} data={data} onSuccess={onSuccess} onClose={onClose} />
  ),
  teacherAssignment: (type, data, onSuccess, onClose) => (
    <TeacherAssignmentForm
      professorId={data.professor}
      onSuccess={onSuccess || (() => {})}
      onClose={onClose || (() => {})}
    />
  ),
};


// Map logical table names to real API endpoint names
const endpointMap: Record<string, string> = {
  teacher: "professores",
  student: "alunos",
  subject: "disciplinas",
  class: "turmas",
  turmas: "turmas",
  disciplina: "disciplinas",
  lesson: "aulas",
  exam: "exames",
  assignment: "tarefas",
  result: "resultados",
  attendance: "presencas",
  event: "eventos",
  announcement: "avisos",
  parent: "pais",
  ensino: "ensinos",
};

const FormModal = ({
  table,
  type,
  data,
  id,
  onSuccess,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "disciplina"
    | "turmas"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement"
    | "class"
    | "ensino"
    | "teacherAssignment";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number ;
  onSuccess?: () => void;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const endpoint = endpointMap[table];
      if (!endpoint) throw new Error(`Endpoint não mapeado para: ${table}`);

      await axios.delete(`http://localhost:8000/api/${endpoint}/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPopup({ type: "success", message: "Registro excluído com sucesso!" });
      setTimeout(() => {
        setPopup(null);
        setOpen(false);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      console.error("Erro ao deletar:", err);
      setPopup({ type: "error", message: "Erro ao excluir!" });
      setTimeout(() => setPopup(null), 2000);
    }
  };

const Form = () => {
  if (type === "delete" && id) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center justify-center text-center relative">
        {popup && <DeletePopup type={popup.type} message={popup.message} />}
        <span className="text-center font-medium">
          Todos os dados serão perdidos. Tem certeza que deseja excluir?
        </span>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-700 text-white py-2 px-6 rounded-md hover:bg-red-800"
        >
          Deletar
        </button>
      </div>
    );
  }

  if ((type === "create" || type === "update") && typeof forms[table] === "function") {
    return forms[table](type, data, onSuccess, () => setOpen(false));
  }

  return <p>Formulário não encontrado.</p>;
};


  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
         <div className="bg-white p-4 rounded-md relative w-full max-w-4xl mx-auto overflow-y-auto max-h-[90vh]">


            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={16} height={16} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
