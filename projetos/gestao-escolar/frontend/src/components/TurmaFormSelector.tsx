"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import type { StepNivelFormProps } from "../components/turma/StepNivelForm";
import type { StepSalaFormProps } from "../components/turma/StepSalaForm";

// Forms
const TurmaForm = dynamic(() => import("./forms/TurmaForm"));
const MultiStepTurmaForm = dynamic(() => import("../components/turma/MultiStepTurmaForm"));
const StepNivelForm = dynamic<StepNivelFormProps>(() =>
  import("../components/turma/StepNivelForm").then((mod) => mod.default)
);
const StepSalaForm = dynamic<StepSalaFormProps>(() =>
  import("../components/turma/StepSalaForm").then((mod) => mod.default)
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function TurmaFormSelector({ open, onOpenChange, onSuccess }: Props) {
  const [step, setStep] = useState<"select" | "turma" | "multi">("select");
  const [showNivelForm, setShowNivelForm] = useState(false);
  const [showSalaForm, setShowSalaForm] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {step === "select" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-lg font-semibold">O que você deseja fazer?</h2>
            <div className="flex gap-4">
              <Button className="bg-[#6A5FE7] text-white" onClick={() => setStep("turma")}>
                Criar Turma Direto
              </Button>
              <Button className="bg-[#e7dc5f] text-white" onClick={() => setStep("multi")}>
                Criar (Nível, Sala, Turma)
              </Button>
            </div>
          </div>
        )}

        {step === "turma" && (
          <div className="space-y-4">
            <TurmaForm
              type="create"
              onSuccess={onSuccess}
              onClose={() => setStep("select")}
              showNivelLink={() => setShowNivelForm(true)}
              showSalaLink={() => setShowSalaForm(true)}
            />
            <Button variant="ghost" onClick={() => setStep("select")}>
              Voltar
            </Button>
          </div>
        )}

        {step === "multi" && (
          <div className="space-y-4">
            <MultiStepTurmaForm
              onSuccess={onSuccess}
              onClose={() => setStep("select")}
            />
            <Button variant="ghost" onClick={() => setStep("select")}>
              Voltar
            </Button>
          </div>
        )}

        {showNivelForm && (
          <Dialog open onOpenChange={() => setShowNivelForm(false)}>
            <DialogContent>
              <StepNivelForm
                onCreated={() => setShowNivelForm(false)}
                onClose={() => setShowNivelForm(false)}
              />
            </DialogContent>
          </Dialog>
        )}

        {showSalaForm && (
          <Dialog open onOpenChange={() => setShowSalaForm(false)}>
            <DialogContent>
              <StepSalaForm
                onCreated={() => setShowSalaForm(false)}
                onClose={() => setShowSalaForm(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
