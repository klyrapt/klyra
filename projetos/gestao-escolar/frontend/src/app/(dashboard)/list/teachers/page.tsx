"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { withAuth } from "@/lib/withAuth";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { BASE_URL } from "@/lib/constants";
import DeletePopup from "@/components/DeletePopup";

type Professor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco_completo: string;
  foto?: string;
  biografia?: string;
  disciplinas?: string[];
  turmas?: string[];
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Disciplinas", accessor: "disciplinas", className: "hidden md:table-cell" },
  { header: "Turmas", accessor: "turmas", className: "hidden md:table-cell" },
  { header: "Telefone", accessor: "telefone", className: "hidden lg:table-cell" },
  { header: "Morada", accessor: "endereco_completo", className: "hidden lg:table-cell" },
  { header: "Ações", accessor: "action" },
];

const TeacherListPage = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  const fetchProfessores = async (page = 1, search = "") => {
    try {
      const token = localStorage.getItem("accessToken");

      const [profRes, ensinoRes] = await Promise.all([
        axios.get("http://localhost:8000/api/professores/", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, search },
        }),
        axios.get("http://localhost:8000/api/ensinos/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const ensinos = ensinoRes.data;

      const professoresComDados = profRes.data.results.map((prof: any) => {
        const ensinosDoProfessor = ensinos.filter((e: any) => e.professor === prof.id);
        return {
          ...prof,
          disciplinas: Array.from(new Set(ensinosDoProfessor.map((e: any) => e.disciplina_nome))),
          turmas: Array.from(new Set(ensinosDoProfessor.map((e: any) => e.turma_nome))),
        };
      });

      setProfessores(professoresComDados);
      setCount(profRes.data.count);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao carregar professores:", error);
      setPopup({ type: "error", message: "Erro ao carregar professores." });
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      fetchProfessores(1, value);
    }, 500);
    setSearchTimeout(timeout);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTimeout) clearTimeout(searchTimeout);
      fetchProfessores(1, searchTerm);
    }
  };

  const renderRow = (item: Professor) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 px-4 py-3 min-w-[200px]">
        <Image
          src={item.foto?.startsWith("http") ? item.foto : `${BASE_URL}${item.foto}`}
          alt="Foto do professor"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.nome}</h3>
          <p className="text-xs text-gray-500 break-words">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell px-4 py-3 whitespace-pre-line break-words min-w-[150px]">
        {item.disciplinas?.join(", ") || "-"}
      </td>
      <td className="hidden md:table-cell px-4 py-3 whitespace-pre-line break-words min-w-[120px]">
        {item.turmas?.join(", ") || "-"}
      </td>
      <td className="hidden md:table-cell px-4 py-3">{item.telefone || "-"}</td>
      <td className="hidden md:table-cell px-4 py-3">{item.endereco_completo || "-"}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <FormModal table="teacher" type="update" data={item} onSuccess={() => fetchProfessores(currentPage, searchTerm)} />
          <FormModal table="teacher" type="delete" id={item.id} onSuccess={() => fetchProfessores(currentPage, searchTerm)} />
          <FormModal table="teacherAssignment" type="create" data={{ professor: item.id }} onSuccess={() => fetchProfessores(currentPage, searchTerm)} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Todos os Professores</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
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
            {popup && <DeletePopup type={popup.type} message={popup.message} />}
            <FormModal table="teacher" type="create" onSuccess={() => fetchProfessores(currentPage, searchTerm)} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
          {professores.length > 0 ? (
            <Table columns={columns} renderRow={renderRow} data={professores} />
          ) : (
            <p className="text-center text-sm text-red-600 mt-4">
              Nenhum professor encontrado com esse nome.
            </p>
          )}
      </div>


      <Pagination
        currentPage={currentPage}
        totalItems={count}
        pageSize={10}
        onPageChange={(page) => fetchProfessores(page, searchTerm)}
      />
    </div>
  );
};

export default withAuth(TeacherListPage);
