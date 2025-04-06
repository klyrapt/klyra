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
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  const fetchProfessores = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/api/professores/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfessores(res.data);
    } catch (error) {
      console.error("Erro ao carregar professores:", error);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  const renderRow = (item: Professor) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={`${BASE_URL}${item.foto?.startsWith("/") ? "" : "/"}${item.foto}`}
          alt="Foto do professor"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.nome}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.disciplinas?.join(", ") || "-"}</td>
      <td className="hidden md:table-cell">{item.turmas?.join(", ") || "-"}</td>
      <td className="hidden md:table-cell">{item.telefone || "-"}</td>
      <td className="hidden md:table-cell">{item.endereco_completo || "-"}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <FormModal table="teacher" type="update" data={item} onSuccess={fetchProfessores} />
          <FormModal table="teacher" type="delete" id={item.id} onSuccess={fetchProfessores} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Todos os Professores</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {popup && <DeletePopup type={popup.type} message={popup.message} />}
            <FormModal table="teacher" type="create" onSuccess={fetchProfessores} />
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={professores} />

      <Pagination />
    </div>
  );
};

export default withAuth(TeacherListPage);
