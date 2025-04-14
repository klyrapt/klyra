"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BotaoCadastro() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/cadastro")}
      className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300"
    >
      Experimente Grátis
    </Button>
  );
}
