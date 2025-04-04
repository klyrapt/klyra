"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SuccessPopup from "@/components/SuccessPopup";

const VerificarEmailPage = () => {
  const [codigo, setCodigo] = useState<string[]>(["", "", "", "", "", ""]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const chars = pasted.split("");
    const novoCodigo = [...codigo];
    chars.forEach((char, i) => {
      if (i < 6) novoCodigo[i] = char;
    });
    setCodigo(novoCodigo);

    // Focar no último campo preenchido
    const lastIndex = Math.min(chars.length, 6) - 1;
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const codigoFinal = codigo.join("");
    const email = localStorage.getItem("emailConfirmacao");
    if (!email) {
      setErro("Email não encontrado.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/verificar-email/", {
        email,
        codigo: codigoFinal,
      });

      setSucesso(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2500);
    } catch (err) {
      setErro("Código inválido ou expirado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1c35] p-4 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center relative"
      >
        {sucesso && (
          <SuccessPopup
            type="success"
            message="Email verificado com sucesso!"
            onClose={() => {}}
          />
        )}

        <h2 className="text-xl font-semibold mb-4 text-[#0b1c35]">
          Verificar E-mail
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Digite o código de 6 dígitos enviado ao seu e-mail
        </p>

        <div className="flex justify-center gap-6">
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={codigo[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md"
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
            />
            
            ))}
          </div>
          <div className="flex gap-2">
            {[3, 4, 5].map((index) => (
              <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={codigo[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md"
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
            />
            
            ))}
          </div>
        </div>

        {erro && <p className="text-red-500 text-sm mt-4">{erro}</p>}

        <Button
          type="submit"
          className="mt-6 w-full bg-[#0b1c35] text-white hover:bg-[#09172b]"
        >
          Confirmar Código
        </Button>
      </form>
    </div>
  );
};

export default VerificarEmailPage;
