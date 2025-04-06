"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthExpiration() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);

      if (exp < now) {
        // Token expirado
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("usuario");
        document.cookie = "accessToken=; Max-Age=0";
        document.cookie = "refreshToken=; Max-Age=0";
        router.push("/sign-in");
      }
    } catch (e) {
      // Token malformado ou erro
      router.push("/sign-in");
    }
  }, [router]);
}
