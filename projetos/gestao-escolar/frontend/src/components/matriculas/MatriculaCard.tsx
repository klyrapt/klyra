// src/components/matriculas/MatriculaCard.tsx
import React from "react";

interface MatriculaCardProps {
  aluno: string;
  turma: string;
  anoLetivo: string;
  status: string;
}

export default function MatriculaCard({ aluno, turma, anoLetivo, status }: MatriculaCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-900">
      <h2 className="font-semibold text-lg">{aluno}</h2>
      <p className="text-sm text-muted-foreground">Turma: {turma}</p>
      <p className="text-sm text-muted-foreground">Ano Letivo: {anoLetivo}</p>
      <p className="text-sm mt-2">
        Status: <span className="font-medium">{status}</span>
      </p>
    </div>
  );
}
