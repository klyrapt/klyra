import axios from "@/lib/axios";
import { Matricula } from "@/app/(dashboard)/list/matriculas/types";

export async function getMatriculas(): Promise<Matricula[]> {
  const res = await axios.get("/matriculas/");
  return res.data.results || res.data;
}

export async function createMatricula(data: any) {
  return axios.post("/matriculas/", data);
}

export async function deleteMatricula(id: string | number) {
  return axios.delete(`/matriculas/${id}/`);
}


export async function updateMatricula(id: string | number, data: any) {
  return  axios.put(`/matriculas/${id}/`, data);
  
}