// lib/api/turmas.ts
import axios from "@/lib/axios";

export async function getTurmas() {
  const res = await axios.get("/turmas/");
  return res.data;
}