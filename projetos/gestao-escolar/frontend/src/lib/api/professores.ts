import axios from "@/lib/axios";
import { Professor } from "@/app/(dashboard)/list/teachers/types";

// Buscar lista de professores (com paginação e busca, se necessário)
export async function getProfessores(params = {}): Promise<Professor[]> {
  const res = await axios.get("/professores/", { params });
  return res.data.results || res.data;
}

// Criar professor
export async function createProfessor(data: any) {
  return axios.post("/professores/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Atualizar professor
export async function updateProfessor(id: string | number, data: any) {
  return axios.put(`/professores/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Deletar professor
export async function deleteProfessor(id: string | number) {
  return axios.delete(`/professores/${id}/`);
}
