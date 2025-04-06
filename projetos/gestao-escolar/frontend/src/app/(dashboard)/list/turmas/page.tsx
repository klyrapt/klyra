"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { getAuthToken } from "@/lib/auth";
import { withAuth } from "@/lib/withAuth";


type Turma = {
  id: number;
  nome: string;
  ano_letivo: number;
  capacidade?: number;
  diretor_turma_nome?: string; // <- campo retornado do serializer via to_representation
};

const columns = [
  {
    header: "Nome da Turma",
    accessor: "nome",
  },
  {
    header: "Ano Letivo",
    accessor: "ano_letivo",
    className: "hidden md:table-cell",
  },
  {
    header: "Capacidade",
    accessor: "capacidade",
    className: "hidden md:table-cell",
  },
  {
    header: "Diretor de Turma",
    accessor: "diretor_turma_nome",
    className: "hidden md:table-cell",
  },
  {
    header: "Ações",
    accessor: "action",
  },
];

const ClassListPage = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTurmas = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8000/api/turmas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  const renderRow = (item: Turma) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.nome}</td>
      <td className="hidden md:table-cell">{item.ano_letivo}</td>
      <td className="hidden md:table-cell">{item.capacidade ?? "-"}</td>
      <td className="hidden md:table-cell">{item.diretor_turma_nome ?? "-"}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormModal
            table="class"
            type="update"
            data={item}
            onSuccess={fetchTurmas}
          />
          <FormModal
            table="class"
            type="delete"
            id={item.id}
            onSuccess={fetchTurmas}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOPO */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Todas as Turmas</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filtro" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Ordenar" width={14} height={14} />
            </button>
            <FormModal table="class" type="create" onSuccess={fetchTurmas} />
          </div>
        </div>
      </div>

      {/* LISTAGEM */}
      {loading ? (
        <p className="text-center py-10">Carregando turmas...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={turmas} />
      )}

      {/* PAGINAÇÃO */}
      <Pagination />
    </div>
  );
};

export default withAuth(ClassListPage);
