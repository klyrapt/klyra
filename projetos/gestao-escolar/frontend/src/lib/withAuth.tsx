"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ComponentType, JSX } from "react";

export function withAuth<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>
) {
  return function AuthWrapper(props: T) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/sign-in");
        return;
      }

      try {
        const payloadBase64 = token.split(".")[1];
        const decoded = JSON.parse(atob(payloadBase64));
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp < now) {
          // Token expirado
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("usuario");
          document.cookie = "accessToken=; Max-Age=0";
          document.cookie = "refreshToken=; Max-Age=0";
          router.push("/sign-in");
        }
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        router.push("/sign-in");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
