import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios"; // 👈 Usa seu axios com baseURL
import Cookies from "js-cookie";

type AuthResponse = {
  token: string;
  refresh_token: string;
  nome: string;
  tipo: string;
};

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<AuthResponse>("/auth/login/", {
        email,
        password,
      });

      const { token, refresh_token, nome, tipo } = res.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("usuario", JSON.stringify({ nome, tipo }));

      Cookies.set("accessToken", token, { expires: 1 });
      Cookies.set("refreshToken", refresh_token);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.push("/admin");
    } catch (err) {
      setError("Email ou senha inválidos ou conta não confirmada.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
