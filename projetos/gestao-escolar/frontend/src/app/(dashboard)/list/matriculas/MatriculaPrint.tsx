import React, { forwardRef } from "react";

type Props = {
  data: {
    id: string | number;
    numero_matricula: string;
    ano_letivo: string;
    data_matricula: string;
    aluno: {
      nome_completo: string;
      data_nascimento: string;
    };
    turma: {
      nome: string;
      nivel: string;
    };
    responsavel?: {
      nome: string;
      cpf?: string;
    };
    status: "confirmada" | "pendente" | "cancelada";
    instituicao?: {
      nome: string;
      endereco?: string;
      telefone?: string;
      logo?: string;
      cnpj?: string;
    };
  };
};

export const MatriculaPrint = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div ref={ref} className="bg-white p-6 rounded-md shadow-sm text-gray-800 font-sans">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">{data.instituicao?.nome}</h1>
          <p className="text-sm text-gray-600">{data.instituicao?.endereco}</p>
          <p className="text-sm text-gray-600">{data.instituicao?.telefone}</p>
        </div>
        {data.instituicao?.logo && (
          <img src={data.instituicao.logo} alt="Logo da Instituição" className="w-16 h-16 object-contain" />
        )}
      </div>

      {/* Dados principais */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h2 className="text-blue-600 font-bold text-sm mb-1">Aluno</h2>
          <p>{data.aluno.nome_completo}</p>
          <p>Data Nasc.: {formatDate(data.aluno.data_nascimento)}</p>
        </div>
        <div>
          <h2 className="text-blue-600 font-bold text-sm mb-1">Turma</h2>
          <p>{data.turma.nome}</p>
          <p>Nível: {data.turma.nivel}</p>
        </div>
        <div>
          <h2 className="text-blue-600 font-bold text-sm mb-1">Matrícula</h2>
          <p>{data.numero_matricula}</p>
          <p>Data: {formatDate(data.data_matricula)}</p>
        </div>
      </div>

      {/* Tabela fake */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">Qtd</th>
            <th className="p-2 text-left">Descrição</th>
            <th className="p-2 text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">1</td>
            <td className="p-2">Matrícula {data.ano_letivo}</td>
            <td className="p-2 text-right">-</td>
          </tr>
        </tbody>
      </table>

      {/* Status */}
      <div className="mb-6">
        <h2 className="text-blue-600 font-bold text-sm mb-1">Status</h2>
        <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            data.status === "confirmada"
              ? "bg-green-100 text-green-800"
              : data.status === "pendente"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {data.status}
        </p>
      </div>

      {/* Responsável */}
      {data.responsavel && (
        <div className="mb-6">
          <h2 className="text-blue-600 font-bold text-sm mb-1">Responsável</h2>
          <p>{data.responsavel.nome}</p>
          {data.responsavel.cpf && <p>CPF: {data.responsavel.cpf}</p>}
        </div>
      )}
    </div>
  );
});

MatriculaPrint.displayName = "MatriculaPrint";
