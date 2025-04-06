"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { withAuth } from "@/lib/withAuth";


type Disciplina = {
  id: number;
  nome: string;
  carga_horaria: number;
  instituicao: number;
};

const columns = [
  { header: "Nome da Disciplina", accessor: "nome" },
  { header: "Carga Horária", accessor: "carga_horaria" },
  { header: "Ações", accessor: "action" },
];

const DisciplinaListPage = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8000/api/disciplinas/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisciplinas(res.data);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, []);

  const renderRow = (disciplina: Disciplina) => (
    <tr
      key={disciplina.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{disciplina.nome}</td>
      <td>{disciplina.carga_horaria}h</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={disciplina} />
              <FormModal table="subject" type="delete" id={disciplina.id} />

            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Disciplinas</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" &&  <FormModal table="subject" type="create" />}

          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-10">Carregando disciplinas...</p>
      ) : (
        <>
          <Table columns={columns} renderRow={renderRow} data={disciplinas} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default withAuth(DisciplinaListPage);
