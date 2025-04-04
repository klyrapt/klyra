"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    pergunta: "Quanto tempo leva para implementar o sistema?",
    resposta:
      "A implementação básica pode ser feita em apenas 1 semana. Para escolas maiores ou com necessidades específicas, o processo completo pode levar de 2 a 4 semanas, incluindo migração de dados e treinamento.",
  },
  {
    pergunta: "É possível migrar dados do nosso sistema atual?",
    resposta:
      "Sim, oferecemos serviços de migração de dados para os principais sistemas do mercado. Nossa equipe técnica irá analisar seu caso específico e propor a melhor estratégia de migração.",
  },
  {
    pergunta: "O sistema funciona em dispositivos móveis?",
    resposta:
      "Sim, nossa plataforma é totalmente responsiva e funciona em qualquer dispositivo. Além disso, oferecemos aplicativos nativos para iOS e Android para pais, alunos e professores.",
  },
  {
    pergunta: "Vocês oferecem treinamento para a equipe?",
    resposta:
      "Sim, todos os planos incluem treinamento inicial. Para os planos Profissional e Enterprise, oferecemos treinamentos personalizados e contínuos para toda a equipe.",
  },
  {
    pergunta: "Como funciona o suporte técnico?",
    resposta:
      "Oferecemos suporte por e-mail, chat e telefone em horário comercial. Clientes do plano Enterprise contam com suporte 24/7 e um gerente de conta dedicado.",
  },
];

export default function FaqSection() {
  const [ativo, setAtivo] = useState<number | null>(null);

  const toggle = (index: number) => {
    setAtivo(ativo === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#09172b] text-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="bg-yellow-400 text-[#0b1c35] px-3 py-1 rounded-full text-sm font-medium">
            FAQ
          </span>
          <h2 className="text-4xl font-bold mt-4">Perguntas frequentes</h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-2">
            Respostas para as dúvidas mais comuns sobre nossa plataforma.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/5 p-4 shadow-md"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left text-lg font-medium"
              >
                {faq.pergunta}
                <motion.div
                  animate={{ rotate: ativo === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {ativo === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/80 mt-3 text-sm">
                      {faq.resposta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
