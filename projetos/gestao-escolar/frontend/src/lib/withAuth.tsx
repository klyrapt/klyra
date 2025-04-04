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
      }
    }, [router]);

    return <Component {...props} />;
  };
}
