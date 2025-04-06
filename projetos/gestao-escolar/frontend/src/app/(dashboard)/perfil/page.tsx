"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { withAuth } from "@/lib/withAuth";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Mail,
  KeyRound,
  Settings,
  Building2,
  Users,
  UserCog,
} from "lucide-react";

  const  PerfilAdminPage = () => {
  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState({
    nome: "John Doe",
    email: "admin@klyra.com",
    criado_em: "2025-03-27",
    ultimo_acesso: "2025-03-28",
  });

  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
  });

  const handleSalvar = () => {
    console.log("Salvando dados:", dados);
    setEditando(false);
  };

  const handleAlterarSenha = () => {
    console.log("Alterando senha:", senha);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Perfil do Administrador</h1>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões</TabsTrigger>
          <TabsTrigger value="logs">Atividades</TabsTrigger>
        </TabsList>

        {/* Aba Informacoes */}
        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bloco de Perfil */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/avatar.png"
                  alt="Foto de Perfil"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">{dados.nome}</p>
                  <p className="text-sm text-gray-500">Administrador</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Nome</label>
                  <Input
                    value={dados.nome}
                    onChange={(e) =>
                      setDados({ ...dados, nome: e.target.value })
                    }
                    disabled={!editando}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">E-mail</label>
                  <Input
                    value={dados.email}
                    onChange={(e) =>
                      setDados({ ...dados, email: e.target.value })
                    }
                    disabled={!editando}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Criado em</label>
                  <Input value={dados.criado_em} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium">Último acesso</label>
                  <Input value={dados.ultimo_acesso} disabled />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                {editando ? (
                  <>
                    <Button onClick={handleSalvar}>Salvar</Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditando(true)}>Editar Perfil</Button>
                )}
              </div>
            </div>

            {/* Bloco Alterar Senha */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium">Senha Atual</label>
                  <Input
                    type="password"
                    value={senha.atual}
                    onChange={(e) =>
                      setSenha({ ...senha, atual: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Nova Senha</label>
                  <Input
                    type="password"
                    value={senha.nova}
                    onChange={(e) =>
                      setSenha({ ...senha, nova: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button className="mt-4" onClick={handleAlterarSenha}>
                Alterar Senha
              </Button>
            </div>
          </div>

          {/* Atalhos */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">Atalhos Rápidos</h2>
            <div className="flex flex-wrap gap-6 text-sm text-blue-600">
              <Link href="/instituicoes" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Ver Instituições
              </Link>
              <Link href="/usuarios" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Gerenciar Usuários
              </Link>
              <Link href="/perfil" className="flex items-center gap-2">
                <UserCog className="w-4 h-4" /> Editar Perfil
              </Link>
              <Link href="/redefinir-senha" className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" /> Alterar Senha
              </Link>
            </div>
          </div>
        </TabsContent>

        {/* Aba Permissões */}
        <TabsContent value="permissoes">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Permissões do administrador serão exibidas aqui.</p>
          </div>
        </TabsContent>

        {/* Aba Logs */}
        <TabsContent value="logs">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Histórico de atividades será exibido aqui.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(PerfilAdminPage);
