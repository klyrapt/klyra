// app/sign-up/page.tsx
"use client";

import CadastroInstituicao from "@/components/cadastro/CadastroInstituicao";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#0b1c35] flex items-center justify-center p-4">
      <CadastroInstituicao />
    </main>
  );
}
