// components/turma/MultiStepTurmaForm.tsx
"use client";

import { useState } from "react";
import StepNivelForm from "./StepNivelForm";
import StepSalaForm from "./StepSalaForm";
import TurmaForm from "@/components/forms/TurmaForm";

type Props = {
  onSuccess?: () => void;
  onClose?: () => void; 
};

export default function MultiStepTurmaForm({ onSuccess, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [nivelId, setNivelId] = useState<number | null>(null);
  const [salaId, setSalaId] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-[#1E293B] p-4 rounded-md max-h-[90vh] overflow-y-auto">
      {step === 1 && (
        <StepNivelForm
          onCreated={(id) => {
            setNivelId(id);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepSalaForm
          onCreated={(id) => {
            setSalaId(id);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <TurmaForm
          type="create"
          data={{ nivel: nivelId, sala: salaId }}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      )}
    </div>
  );
}
