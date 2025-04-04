// EtapaAdministrador.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EtapaAdministrador = ({ register, errors, onBack }: any) => (
  <>
    <div className="mb-4">
      <label className="text-sm">Nome do Administrador</label>
      <Input {...register("nome_admin")} placeholder="Nome completo" />
      {errors.nome_admin && <p className="text-red-500 text-xs mt-1">{errors.nome_admin.message}</p>}
    </div>

    <div className="mb-4">
      <label className="text-sm">Email</label>
      <Input {...register("email_admin")} placeholder="email@exemplo.com" />
      {errors.email_admin && <p className="text-red-500 text-xs mt-1">{errors.email_admin.message}</p>}
    </div>

    <div className="mb-4">
      <label className="text-sm">Senha</label>
      <Input type="password" {...register("senha_admin")} />
      {errors.senha_admin && <p className="text-red-500 text-xs mt-1">{errors.senha_admin.message}</p>}
    </div>

    <div className="mb-4">
      <label className="text-sm">Confirmar Senha</label>
      <Input type="password" {...register("confirmar_senha")} />
      {errors.confirmar_senha && <p className="text-red-500 text-xs mt-1">{errors.confirmar_senha.message}</p>}
    </div>

    <div className="flex justify-between gap-4 mt-4">
      <Button onClick={onBack} type="button" variant="outline" className="w-full">
        Voltar
      </Button>
      <Button type="submit" className="w-full bg-[#0b1c35] text-white">
        Cadastrar
      </Button>
    </div>

    <p className="text-sm text-center text-gray-600 mt-6">
      Já tem uma conta?{" "}
      <a href="/login" className="text-blue-600 hover:underline font-medium">
        Faça login
      </a>
    </p>
  </>
);

export default EtapaAdministrador;
