import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@/lib/constants";
import { getAuthToken } from "@/lib/auth";
import FormModal from "@/components/FormModal";
import DeletePopup from "@/components/DeletePopup";

const BotaoCriarTurmaComValidacao = ({ onSuccess }: { onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

  const token = getAuthToken();

  const verificarNiveis = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/niveis/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const temNiveis = Array.isArray(res.data)
        ? res.data.length > 0
        : res.data.results?.length > 0;

      if (temNiveis) {
        setOpen(true);
      } else {
        setPopup({
          type: "error",
          message: "Antes de cadastrar uma turma, cadastre pelo menos um Nível.",
        });
        setTimeout(() => setPopup(null), 3000);
      }
    } catch (err) {
      console.error("Erro ao verificar níveis:", err);
      setPopup({
        type: "error",
        message: "Erro ao verificar os níveis. Tente novamente.",
      });
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <>
      {popup && <DeletePopup type={popup.type} message={popup.message} />}

      <button
        onClick={verificarNiveis}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
      >
        <Image src="/create.png" alt="Criar" width={16} height={16} />
      </button>

      {open && (
        <FormModal
          table="class"
          type="create"
          onSuccess={() => {
            setOpen(false);
            onSuccess();
          }}
        />
      )}
    </>
  );
};

export default BotaoCriarTurmaComValidacao;
