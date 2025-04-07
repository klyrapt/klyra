"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { withAuth } from "@/lib/withAuth";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

const SingleTeacherPage = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState<any>(null);
  const [ensinos, setEnsinos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const [profRes, ensinoRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/professores/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/ensinos/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dadosEnsino = ensinoRes.data.filter((e: any) => e.professor === Number(id));

        setProfessor(profRes.data);
        setEnsinos(dadosEnsino);
      } catch (err) {
        console.error("Erro ao buscar dados do professor:", err);
      }
    };

    fetchData();
  }, [id]);

  const disciplinasUnicas = Array.from(new Set(ensinos.map((e: any) => e.disciplina_nome)));
  const turmasUnicas = Array.from(new Set(ensinos.map((e: any) => e.turma_nome)));

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOPO */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky p-6 rounded-md flex flex-col sm:flex-row items-center gap-4 w-full lg:w-2/3">
          <Image
              src={
                professor?.foto
                  ? professor.foto.startsWith("http")
                    ? professor.foto
                    : `${BASE_URL}${professor.foto.startsWith("/") ? "" : "/"}${professor.foto}`
                  : "/placeholder.png" // imagem padrão se não houver foto
              }
              alt="Foto do professor"
              width={120}
              height={120}
              className="rounded-full w-32 h-32 object-cover"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold">{professor?.nome}</h1>
              <p className="text-gray-600 text-sm">{professor?.biografia}</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-black">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{professor?.genero}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{professor?.data_nascimento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{professor?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{professor?.telefone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* MINI CARDS */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="bg-white p-4 rounded-md flex items-center gap-4">
              <Image src="/singleLesson.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">{disciplinasUnicas.length}</h1>
                <span className="text-sm text-gray-400">Disciplinas</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4">
              <Image src="/singleClass.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">{turmasUnicas.length}</h1>
                <span className="text-sm text-gray-400">Turmas</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4">
              <Image src="/absence.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">0</h1>
                <span className="text-sm text-gray-400">Faltas</span>
              </div>
            </div>
          </div>
        </div>

        {/* CALENDÁRIO */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold mb-4">Agenda do Professor</h1>
          <BigCalendar />
        </div>
      </div>

      {/* DIREITA */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-4">Atalhos</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="p-2 bg-lamaSkyLight rounded">Turmas</span>
            <span className="p-2 bg-lamaPurpleLight rounded">Alunos</span>
            <span className="p-2 bg-lamaYellowLight rounded">Aulas</span>
            <span className="p-2 bg-pink-100 rounded">Exames</span>
            <span className="p-2 bg-lamaSkyLight rounded">Tarefas</span>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default withAuth(SingleTeacherPage);
