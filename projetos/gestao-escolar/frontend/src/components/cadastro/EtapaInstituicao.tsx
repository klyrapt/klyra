// EtapaInstituicao.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EtapaInstituicao = ({ register, errors, onNext }: any) => (
  <>
    <div className="mb-4">
      <label className="text-sm">Nome da Instituição</label>
      <Input {...register("nome")} placeholder="Nome da escola" />
      {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
    </div>

    <Button onClick={onNext} type="button" className="w-full bg-[#0b1c35] text-white mt-4">
      Próximo
    </Button>
  </>
);

export default EtapaInstituicao;
