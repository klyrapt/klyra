"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import AlunoTableSearch from "@/components/AlunoTableSearch";
import { withAuth } from "@/lib/withAuth";
import { BASE_URL } from "@/lib/constants";
import { role } from "@/lib/data";

type Aluno = {
  id: number;
  numero_aluno: string;
  nome_completo: string;
  email?: string;
  telefone?: string;
  endereco_completo?: string;
  foto_perfil?: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Nº Aluno", accessor: "numero_aluno", className: "hidden md:table-cell" },
  { header: "Telefone", accessor: "telefone", className: "hidden md:table-cell" },
  { header: "Endereço", accessor: "endereco_completo", className: "hidden lg:table-cell" },
  { header: "Ações", accessor: "action" },
];

const StudentListPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchAlunos = async (page = 1, search = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/api/alunos/", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, search },
      });
      setAlunos(res.data.results);
      setCount(res.data.count);
      setCurrentPage(page);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => fetchAlunos(1, value), 500);
    setSearchTimeout(timeout);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTimeout) clearTimeout(searchTimeout);
      fetchAlunos(1, searchTerm);
    }
  };

  const renderRow = (item: Aluno) => (
    <tr key={item.id} className="border-b even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        {item.foto_perfil ? (
          <Image
            src={item.foto_perfil.startsWith("http") ? item.foto_perfil : `${BASE_URL}${item.foto_perfil}`}
            alt="Foto do aluno"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
            N/A
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.nome_completo}</h3>
          <p className="text-xs text-gray-500">{item.email || "Sem email"}</p>
        </div>
      </td>




      <td className="hidden md:table-cell">{item.numero_aluno}</td>
      <td className="hidden md:table-cell">{item.telefone || "-"}</td>
      <td className="hidden lg:table-cell">{item.endereco_completo || "-"}</td>
      <td>
        <div className="flex gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="ver" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="student" type="update" data={item} onSuccess={() => fetchAlunos(currentPage, searchTerm)} />
              <FormModal table="student" type="delete" id={item.id} onSuccess={() => fetchAlunos(currentPage, searchTerm)} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Todos os Alunos</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <AlunoTableSearch
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filtro" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Ordenar" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="student" type="create" onSuccess={() => fetchAlunos(currentPage, searchTerm)} />
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-10">Carregando alunos...</p>
      ) : (
        <>
          <Table columns={columns} renderRow={renderRow} data={alunos} />
          <Pagination
            currentPage={currentPage}
            totalItems={count}
            pageSize={10}
            onPageChange={(page) => fetchAlunos(page, searchTerm)}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(StudentListPage);
