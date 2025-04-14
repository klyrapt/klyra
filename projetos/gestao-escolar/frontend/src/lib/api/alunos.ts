// lib/api/alunos.ts
import axios from "@/lib/axios";

export async function getAlunos() {
  const res = await axios.get("/alunos/");
  return res.data;
}