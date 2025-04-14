"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { withAuth } from "@/lib/withAuth";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";
import { BASE_URL } from "@/lib/constants";

const SingleStudentPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8000/api/alunos/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <p className="p-4">Carregando aluno...</p>;

  const fotoUrl = student.foto_perfil
    ? student.foto_perfil.startsWith("http")
      ? student.foto_perfil
      : `${BASE_URL}${student.foto_perfil}`
    : "/avatar.png";

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={fotoUrl}
                alt={student.nome_completo}
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">{student.nome_completo}</h1>
              <p className="text-sm text-gray-100">
                {student.endereco_completo || "Endereço não informado"}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium text-white">
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.telefone || "Sem telefone"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{student.data_nascimento || "Sem data de nascimento"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/pin.png" alt="" width={14} height={14} />
                  <span>{student.cidade || "Sem cidade"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <MiniCard icon="/singleAttendance.png" label="Presença" value="90%" />
            <MiniCard icon="/singleBranch.png" label="Classe" value="6ª" />
            <MiniCard icon="/singleLesson.png" label="Aulas" value="18" />
            <MiniCard icon="/singleClass.png" label="Turma" value="6A" />
          </div>
        </div>

        {/* CALENDAR */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Horário do Aluno</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Acessos Rápidos</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="#">
              Aulas do Aluno
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="#">
              Professores
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="#">
              Provas
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="#">
              Tarefas
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="#">
              Resultados
            </Link>
          </div>
        </div>

        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

const MiniCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
    <Image src={icon} alt="" width={24} height={24} className="w-6 h-6" />
    <div>
      <h1 className="text-xl font-semibold">{value}</h1>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  </div>
);

export default withAuth(SingleStudentPage);
