"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode";

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    id: string | number;
    valor: string | number;
    numero_matricula: string;
    ano_letivo: string;
    data_matricula: string;
    aluno: {
      nome_completo: string;
      data_nascimento: string;
    };
    turma: {
      nome: string;
      nivel: string;
    };
    responsavel?: {
      nome: string;
      cpf?: string;
    };
    status: "confirmada" | "pendente" | "cancelada";
    instituicao?: {
      nome: string;
      endereco?: string;
      telefone?: string;
      logo?: string;
      cnpj?: string;
    };
  } | null;
};

export function MatriculaComprovativoModal({ open, onClose, data }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [codigoVerificacao, setCodigoVerificacao] = useState<string>("");
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data && isClient) {
      const codigo = `MAT-${data.ano_letivo}-${String(data.id).padStart(4, "0")}-VERIF`;
      setCodigoVerificacao(codigo);
      const link = `https://sua-escola.com/verificar/${codigo}`;
      QRCode.toDataURL(link).then((url) => setQrCodeUrl(url));
    }
  }, [data, isClient]);

  const gerarOpcoes = (tipo: "download" | "imprimir" | "visualizar") => ({
    margin: 10,
    filename: `comprovativo_matricula_${data?.aluno.nome_completo || "aluno"}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    ...(tipo === "visualizar" && { output: "bloburl" }),
  });

  const handlePDF = (tipo: "download" | "imprimir" | "visualizar") => {
    if (!componentRef.current) return;
    const opt = gerarOpcoes(tipo);
    const worker = html2pdf().from(componentRef.current).set(opt);

    if (tipo === "imprimir") {
      worker.outputPdf("dataurlnewwindow").then((url: string) => {
        const win = window.open(url, "_blank");
        win?.addEventListener("load", () => {
          win.focus();
          win.print();
        });
      });
    } else if (tipo === "visualizar") {
      worker.outputPdf("bloburl").then((url: string) => {
        window.open(url, "_blank");
      });
    } else {
      worker.save();
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-PT", options);
  };

  if (!data || !isClient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Comprovativo de Matrícula</DialogTitle>
          <DialogDescription>
            Visualize, imprima ou baixe o comprovativo de matrícula do aluno
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-2 no-print">
          <Button onClick={() => handlePDF("download")}>
            <Printer className="w-4 h-4 mr-2" /> Baixar PDF
          </Button>
          <Button variant="secondary" onClick={() => handlePDF("visualizar")}>
            Visualizar
          </Button>
          <Button variant="outline" onClick={() => handlePDF("imprimir")}>
            Imprimir
          </Button>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div
            ref={componentRef}
            className="bg-white p-6 rounded-md shadow-sm text-gray-800 font-sans print:p-0 print:shadow-none"
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  {data.instituicao?.nome || "Nome da Instituição"}
                </h1>
                <p className="text-sm text-gray-600">
                  {data.instituicao?.endereco || "Endereço da Instituição"}
                </p>
                <p className="text-sm text-gray-600">
                  {data.instituicao?.telefone || "Telefone da Instituição"}
                </p>
              </div>
              {data.instituicao?.logo ? (
                <img
                  src={data.instituicao.logo}
                  alt="Logo da Instituição"
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center text-white">
                  <span>LOGO</span>
                </div>
              )}
            </div>

            {/* Informações do Aluno */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Aluno</h2>
                <p className="text-sm">{data.aluno.nome_completo}</p>
                <p className="text-sm">
                  Data Nasc.: {formatDate(data.aluno.data_nascimento)}
                </p>
              </div>
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Turma</h2>
                <p className="text-sm">{data.turma.nome}</p>
                <p className="text-sm">Nível: {data.turma.nivel}</p>
              </div>
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Comprovativo #</h2>
                <p className="text-sm">{data.numero_matricula}</p>
                <h2 className="text-blue-600 font-bold text-sm mt-2 mb-1">Data da matrícula</h2>
                <p className="text-sm">{formatDate(data.data_matricula)}</p>
              </div>
            </div>

            {/* Tabela */}
            <div className="mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-2 px-3 text-left">Qtd</th>
                    <th className="py-2 px-3 text-left">Descrição</th>
                    <th className="py-2 px-3 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">#</td>
                    <td className="py-2 px-3">Matrícula {data.ano_letivo}</td>
                    <td className="py-2 px-3 text-right">{data.valor}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status e ano letivo */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Status da Matrícula</h2>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === "confirmada"
                      ? "bg-green-100 text-green-800"
                      : data.status === "pendente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </p>
              </div>
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Ano Letivo</h2>
                <p className="text-sm">{data.ano_letivo}</p>
              </div>
            </div>

            {/* Responsável */}
            {data.responsavel && (
              <div className="mb-6">
                <h2 className="text-blue-600 font-bold text-sm mb-1">Responsável</h2>
                <p className="text-sm">{data.responsavel.nome}</p>
                {data.responsavel.cpf && <p className="text-sm">CPF: {data.responsavel.cpf}</p>}
              </div>
            )}

            {/* Observações */}
            <div className="mt-8 mb-6">
              <h2 className="text-blue-600 font-bold text-sm mb-1">Termos e Condições</h2>
              <p className="text-xs text-gray-600">
                Este documento comprova a matrícula do aluno na instituição para o ano letivo
                indicado. A matrícula está sujeita às normas e regulamentos da instituição.
              </p>
            </div>

            {/* Assinatura */}
            <div className="mt-12 mb-6">
              <div className="border-t border-gray-400 w-64 mx-auto"></div>
              <p className="text-center text-sm mt-2">Assinatura</p>
            </div>

            {/* Código de verificação + QR Code */}
            <div className="mt-12 flex items-center justify-between border-t pt-6">
              <div>
                <h2 className="text-blue-600 font-bold text-sm mb-1">Código de Verificação</h2>
                <p className="text-sm font-mono">{codigoVerificacao}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Emitido em: {new Date().toLocaleDateString("pt-PT")} às{" "}
                  {new Date().toLocaleTimeString("pt-PT")}
                </p>
              </div>
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-24 h-24 border border-gray-300 p-1 rounded-md"
                />
              )}
            </div>

            
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
