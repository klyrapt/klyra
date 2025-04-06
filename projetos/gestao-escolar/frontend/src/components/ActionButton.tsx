// components/ActionButton.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  type: "create" | "update" | "delete";
  onClick?: () => void;
}

const ActionButton = ({ type, onClick }: Props) => {
  const getLabel = () => {
    if (type === "create") return "Nova Turma";
    if (type === "update") return "Editar";
    if (type === "delete") return "Excluir";
  };

  const getIcon = (): string => {
    if (type === "create") return "/create.png";
    if (type === "update") return "/update.png";
    if (type === "delete") return "/delete.png";
    return "/default.png"; // fallback se quiser
  };
  
  return (
    <Button onClick={onClick} variant="outline" size="sm" className="flex items-center gap-2">
      <Image src={getIcon()} alt={type} width={16} height={16} />
      {getLabel()}
    </Button>
  );
};

export default ActionButton;
