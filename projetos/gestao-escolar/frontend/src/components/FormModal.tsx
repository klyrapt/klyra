"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import DeletePopup from "./DeletePopup";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const SubjectForm = dynamic(() => import("../components/forms/SubjectForm"));

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "disciplina"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
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
      await axios.delete(`http://localhost:8000/api/disciplinas/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPopup({ type: "success", message: "Disciplina excluída com sucesso!" });
      setTimeout(() => {
        setPopup(null);
        setOpen(false);
        window.location.reload();
      }, 2500);
    } catch (err) {
      console.error("Erro ao deletar:", err);
      setPopup({ type: "error", message: "Erro ao excluir a disciplina!" });
      setTimeout(() => setPopup(null), 2500);
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <div className="p-4 flex flex-col gap-4 items-center justify-center text-center relative">
        {popup && <DeletePopup type={popup.type} message={popup.message} />}
        <span className="text-center font-medium">
          Todos os dados serão perdidos. Tem certeza que deseja excluir esta disciplina?
        </span>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-700 text-white py-2 px-6 rounded-md hover:bg-red-800"
        >
          Deletar
        </button>
      </div>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Formulário não encontrado"
    );
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
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
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
