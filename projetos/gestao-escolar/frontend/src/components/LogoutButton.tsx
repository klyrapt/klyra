// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export async function executarLogout(router?: any) {
  const refreshToken = Cookies.get("refreshToken");

  try {
    if (refreshToken) {
      await axios.post("http://localhost:8000/api/auth/logout/", {
        refresh_token: refreshToken,
      });
    }
  } catch (error) {
    console.warn("Erro ao deslogar:", error);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("usuario");

  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  if (router) router.push("/sign-in");
}

// Componente opcional (se quiser usar em outro lugar)
const LogoutButton = () => {
  const router = useRouter();

  const handleClick = () => {
    executarLogout(router);
  };

  return (
    <button onClick={handleClick} className="text-sm text-red-600 hover:underline">
      Sair
    </button>
  );
};

export default LogoutButton;
