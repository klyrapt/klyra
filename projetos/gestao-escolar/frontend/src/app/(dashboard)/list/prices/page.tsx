"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { BASE_URL } from "@/lib/constants";
import { role } from "@/lib/data";

const columns = [
  { header: "Nível", accessor: "nivel" },
  { header: "Tipo", accessor: "tipo" },
  { header: "Valor (€)", accessor: "valor" },
  {
    header: "Descrição",
    accessor: "descricao",
    className: "hidden md:table-cell max-w-[300px] truncate",
  },
  { header: "Ações", accessor: "action" },
];

const PriceListPage = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${BASE_URL}/api/precos/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      });
      setPrices(res.data.results);
      setCount(res.data.count);
      setCurrentPage(page);
    } catch (err) {
      console.error("Erro ao buscar preços:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const renderRow = (item: any) => (
    <tr key={item.id}  className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">

      <td className="p-4 font-medium text-gray-800">{item.nivel_nome || "-"}</td>
      <td className="p-4 capitalize text-gray-700">{item.tipo}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{parseFloat(item.valor).toFixed(2)} €</td>

      <td className="p-4 hidden md:table-cell text-gray-600 max-w-[250px] truncate">{item.descricao || "-"}</td>
      <td className="p-4">

        {role === "admin" && (
          <div className="flex items-center gap-2">
            <FormModal table="price" type="update" data={item} onSuccess={() => fetchPrices(currentPage)} />
            <FormModal table="price" type="delete" id={item.id} onSuccess={() => fetchPrices(currentPage)} />
          </div>
        )}
      </td>
    </tr>
  );
  

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Preços Cadastrados</h1>
        {role === "admin" && (
          <FormModal
            table="price"
            type="create"
            onSuccess={() => fetchPrices(currentPage)}
          />
        )}
      </div>

      {loading ? (
        <p className="text-center py-10">Carregando preços...</p>
      ) : (
        <>
          <Table columns={columns} renderRow={renderRow} data={prices} />
          <Pagination
            currentPage={currentPage}
            totalItems={count}
            pageSize={10}
            onPageChange={(page) => fetchPrices(page)}
          />
        </>
      )}
    </div>
  );
};

export default PriceListPage;
