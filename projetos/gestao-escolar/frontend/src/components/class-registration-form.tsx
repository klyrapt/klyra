"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CalendarDays, Users, Clock, Home, User, ClipboardList, CheckCircle } from "lucide-react"

interface DeletePopupProps {
  type: string
  message: string
}

interface ClassRegistrationFormProps {
  type: "create" | "edit"
  niveis: any[]
  salas: any[]
  professores: any[]
  showNivelLink: () => void
  showSalaLink: () => void
  theme?: {
    colors: {
      primaryGradient: string
    }
  }
}

export default function ClassRegistrationForm({
  type = "create",
  niveis = [],
  salas = [],
  professores = [],
  showNivelLink,
  showSalaLink,
  theme = { colors: { primaryGradient: "bg-gradient-to-r from-blue-600 to-indigo-600" } },
}: ClassRegistrationFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    ano_letivo: new Date().getFullYear(),
    capacidade: 30,
    nivel: "",
    turno: "manha",
    sala: "",
    diretor_turma: "",
    ativa: true,
    observacoes: "",
  })

  const [popup, setPopup] = useState<DeletePopupProps | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Your existing submit logic
  }

  const DeletePopup = ({ type, message }: DeletePopupProps) => (
    <div className="absolute top-0 left-0 right-0 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md shadow-md">
      {message}
    </div>
  )

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="h-6 w-6" />
          Formulário de Cadastro de Turma
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6 relative">
          {popup && <DeletePopup type={popup.type} message={popup.message} />}

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    Nome da Turma
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Turma A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ano_letivo" className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    Ano Letivo
                  </Label>
                  <Input
                    id="ano_letivo"
                    name="ano_letivo"
                    type="number"
                    value={formData.ano_letivo}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacidade" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    Capacidade
                  </Label>
                  <Input
                    id="capacidade"
                    name="capacidade"
                    type="number"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    Nível
                  </Label>
                  <Select value={formData.nivel} onValueChange={(value) => handleSelectChange("nivel", value)}>
                    <SelectTrigger id="nivel" className="w-full">
                      <SelectValue placeholder="Selecione um nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Selecione um nível</SelectItem>
                      {niveis.map((nivel: any) => (
                        <SelectItem key={nivel.id} value={nivel.id.toString()}>
                          {nivel.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {niveis.length === 0 && showNivelLink && (
                    <p
                      className="text-sm mt-1 text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
                      onClick={showNivelLink}
                    >
                      <span className="text-xs">+</span> Nenhum nível encontrado. Clique para cadastrar.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="turno" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    Turno
                  </Label>
                  <Select value={formData.turno} onValueChange={(value) => handleSelectChange("turno", value)}>
                    <SelectTrigger id="turno" className="w-full">
                      <SelectValue placeholder="Selecione um turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noite">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sala" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-gray-500" />
                    Sala
                  </Label>
                  <Select value={formData.sala} onValueChange={(value) => handleSelectChange("sala", value)}>
                    <SelectTrigger id="sala" className="w-full">
                      <SelectValue placeholder="Selecione uma sala (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Selecione uma sala (opcional)</SelectItem>
                      {salas.map((sala: any) => (
                        <SelectItem key={sala.id} value={sala.id.toString()}>
                          {sala.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {salas.length === 0 && showSalaLink && (
                    <p
                      className="text-sm mt-1 text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
                      onClick={showSalaLink}
                    >
                      <span className="text-xs">+</span> Nenhuma sala encontrada. Clique para cadastrar.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diretor_turma" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  Diretor da Turma
                </Label>
                <Select
                  value={formData.diretor_turma}
                  onValueChange={(value) => handleSelectChange("diretor_turma", value)}
                >
                  <SelectTrigger id="diretor_turma" className="w-full">
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Selecione um professor</SelectItem>
                    {professores.map((prof: any) => (
                      <SelectItem key={prof.id} value={prof.id.toString()}>
                        {prof.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="ativa"
                  checked={formData.ativa}
                  onCheckedChange={(checked) => setFormData({ ...formData, ativa: checked as boolean })}
                />
                <Label htmlFor="ativa" className="flex items-center gap-2 cursor-pointer font-medium">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  Turma Ativa
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-gray-500" />
                  Observações
                </Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                  placeholder="Informações adicionais sobre a turma..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-gray-50 p-6 flex justify-between rounded-b-lg">
          <Button type="button" variant="outline" className="hover:bg-gray-100" onClick={() => window.history.back()}>
            Voltar
          </Button>
          <Button
            type="submit"
            className={`${theme?.colors?.primaryGradient || "bg-gradient-to-r from-blue-600 to-indigo-600"} text-white hover:opacity-90 transition-opacity`}
          >
            {type === "create" ? "Criar Turma" : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
