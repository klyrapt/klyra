"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContatoModal from "@/components/ContatoModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1c35]/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">EduGestão</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm text-white">
          <Link href="#recursos" className="hover:text-yellow-400">Recursos</Link>
          <Link href="#depoimentos" className="hover:text-yellow-400">Depoimentos</Link>
          <Link href="#precos" className="hover:text-yellow-400">Preços</Link>
          <Link href="#faq" className="hover:text-yellow-400">FAQ</Link>
        </nav>

        {/* Botões lado direito */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setModalOpen(true)} className="text-sm hover:text-yellow-400">Contato</button>
          <Button onClick={() => setModalOpen(true)} className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300">
            Experimente Grátis
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#0b1c35] border-t border-white/10 px-6 py-4 flex flex-col gap-4 md:hidden z-50 text-white">
            <Link href="#recursos" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Recursos</Link>
            <Link href="#depoimentos" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Depoimentos</Link>
            <Link href="#precos" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Preços</Link>
            <Link href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">FAQ</Link>
            <button onClick={() => { setModalOpen(true); setMenuOpen(false); }} className="hover:text-yellow-400 text-left">Contato</button>
            <Button onClick={() => { setModalOpen(true); setMenuOpen(false); }} className="bg-yellow-400 text-[#0b1c35] hover:bg-yellow-300 mt-2">
              Experimente Grátis
            </Button>
          </div>
        )}

        {/* Modal de Contato */}
        <ContatoModal open={modalOpen} onClose={() => setModalOpen(false)} tipo="contato" />
      </div>
    </header>
  );
}
