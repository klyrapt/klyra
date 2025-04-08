"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import DisciplinaTableSearch from "@/components/DisciplinaTableSearch";
import { role } from "@/lib/data";
import { withAuth } from "@/lib/withAuth";

type Disciplina = {
  codigo: string;
  id: number;
  nome: string;
  carga_horaria: number;
};

const columns = [
  { header: "Código", accessor: "codigo" },
  { header: "Nome da Disciplina", accessor: "nome" },
  { header: "Carga Horária", accessor: "carga_horaria" },
  { header: "Ações", accessor: "action" },
];

const DisciplinaListPage = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDisciplinas = async (page = 1, search = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/api/disciplinas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, search },
      });

      setDisciplinas(res.data.results);
      setCount(res.data.count);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao carregar disciplinas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      fetchDisciplinas(1, value);
    }, 500);
    setSearchTimeout(timeout);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTimeout) clearTimeout(searchTimeout);
      fetchDisciplinas(1, searchTerm);
    }
  };


  const renderRow = (disciplina: Disciplina) => (
    <tr
      key={disciplina.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{disciplina.codigo}</td>
      <td>{disciplina.nome}</td>
      <td>{disciplina.carga_horaria}h</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={disciplina} onSuccess={() => fetchDisciplinas(currentPage, searchTerm)} />

              <FormModal table="disciplina" type="delete" id={disciplina.id} onSuccess={() => fetchDisciplinas(currentPage, searchTerm)} />
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
        <DisciplinaTableSearch
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" onSuccess={() => fetchDisciplinas(currentPage)} />}
          </div>
        </div>
      </div>

           {/* LISTAGEM */}
      {loading ? (
        <p className="text-center py-10">Carregando disciplinas...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={disciplinas} />
      )}

      {!loading && disciplinas.length === 0 && (
        <p className="text-center py-6 text-gray-500">Nenhuma disciplina encontrada.</p>
      )}
      

      <Pagination
        currentPage={currentPage}
        totalItems={count}
        pageSize={10}
        onPageChange={(page) => fetchDisciplinas(page, searchTerm)}
      />
    
      

    



    </div>
  );
};

export default withAuth(DisciplinaListPage);
