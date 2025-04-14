// src/app/(dashboard)/list/matriculas/types.ts

export type Matricula = {
  id: string;
  aluno: {
    nome_completo: string;
    email: string;
    data_nascimento: string;
    telefone?: string;
  };
  turma: {
    nome: string;
    nivel: string;
  };
  responsavel?: {
    nome: string;
    email?: string;
    telefone?: string;
  };
  numero_matricula: string;
  ano_letivo: string;
  valor: number;
  data_matricula: string;
  status: "pendente" | "confirmada" | "cancelada";
};
