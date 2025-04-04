// components/CtaSection.tsx

import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section id="contato" className="w-full py-20 bg-[#0b1c35] text-white text-center">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Pronto para transformar a gestão da sua escola?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Agende uma demonstração gratuita e descubra como podemos ajudar sua instituição.
        </p>

        <Button size="lg" className="text-[#0b1c35] bg-white hover:bg-white/90 font-semibold">
          Agendar demonstração
        </Button>

        <p className="mt-4 text-sm text-white/90">
          Ou entre em contato pelo telefone <span className="font-bold text-yellow-400">+351927-201-201</span>
        </p>
      </div>
    </section>
  )
}
