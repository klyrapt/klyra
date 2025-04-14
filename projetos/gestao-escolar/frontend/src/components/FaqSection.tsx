"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"


const faqs = [
  {
    question: "Quanto tempo leva para implementar o sistema na minha escola?",
    answer:
      "A implementação do Klyra é rápida e pode ser concluída em apenas 1 semana. Nossa equipe de suporte acompanha todo o processo, desde a migração de dados até o treinamento da sua equipe.",
  },
  {
    question: "É possível migrar dados do meu sistema atual?",
    answer:
      "Sim, oferecemos serviços de migração de dados para facilitar a transição do seu sistema atual para o Klyra. Nossa equipe técnica trabalha para garantir que todos os dados sejam transferidos com segurança e precisão.",
  },
  {
    question: "O sistema funciona em dispositivos móveis?",
    answer:
      "Sim, o Klyra é totalmente responsivo e pode ser acessado em qualquer dispositivo com acesso à internet. Além disso, oferecemos aplicativos nativos para iOS e Android para professores, pais e alunos.",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer:
      "Oferecemos suporte técnico por email, chat e telefone, dependendo do seu plano. Nosso tempo médio de resposta é de menos de 2 horas em dias úteis, e contamos com uma extensa base de conhecimento e tutoriais em vídeo.",
  },
  {
    question: "O sistema atende às exigências do MEC?",
    answer:
      "Sim, o Klyra foi desenvolvido em conformidade com todas as exigências e regulamentações do Ministério da Educação, garantindo que sua escola esteja sempre em dia com as obrigações legais.",
  },
  {
    question: "Posso personalizar o sistema para as necessidades específicas da minha escola?",
    answer:
      "Sim, o Klyra oferece diversas opções de personalização, desde a aparência da plataforma até campos e relatórios específicos. Para personalizações mais avançadas, nosso plano Enterprise inclui desenvolvimento sob medida.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Perguntas frequentes</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre a plataforma Klyra.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 rounded-xl overflow-hidden bg-white/5 px-6"
                >
                  <AccordionTrigger className="text-lg font-medium text-white py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 mb-4">Não encontrou o que procurava?</p>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Entre em contato com nosso suporte
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

