export type Professor = {
    id: number;
    nome: string;
    email: string;
    formacao?: string;
    especializacao?: string;
    biografia?: string;
    telefone?: string;
    data_nascimento?: string;
    genero?: "M" | "F" | "O";
    nacionalidade?: string;
    naturalidade?: string;
    endereco_completo?: string;
    bairro?: string;
    cidade?: string;
    codigo_postal?: string;
    data_admissao?: string;
    regime_trabalho?: "integral" | "parcial" | "horista";
    foto?: string;
  
    // Dados relacionados, normalmente preenchidos via join
    turmas?: string[];         // ex: ["Turma A", "Turma B"]
    disciplinas?: string[];    // ex: ["Matemática", "Física"]
  };
  