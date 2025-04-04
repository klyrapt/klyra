// src/services/api.ts
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true, // se estiver usando JWT com cookies
})

export default api
