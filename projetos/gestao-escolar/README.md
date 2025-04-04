# 🎓 Gestão Escolar — Klyra

Sistema completo de gestão escolar desenvolvido pela **Klyra**, com foco em escolas do ensino básico e secundário. A plataforma foi criada para atender instituições de pequeno a grande porte, oferecendo uma solução flexível, moderna e acessível.

---

## 🌐 Visão Geral

A plataforma é composta por **módulos separados para cada tipo de usuário**:
- 🎓 Aluno
- 👨‍🏫 Professor
- 👨‍👩‍👧 Encarregado de Educação (Pai/Mãe)
- 🧑‍💼 Funcionário
- 🛠️ Administrador

Com funcionalidades como:
- Matrículas e turmas
- Lançamento e boletim de notas
- Controle de presença
- Acesso dos pais/responsáveis
- Painel administrativo
- Comunicação interna
- Sistema de permissões e segurança
- Personalização por escola

---

## ⚙️ Estrutura do Projeto

```
gestao-escolar/
├── backend/       # API construída com Django REST Framework
├── frontend/      # Interface web com Next.js + Tailwind + ShadCN
├── docs/          # Documentações técnicas e funcionais
└── README.md      # Este arquivo
```

---

## 🔐 Autenticação

O sistema utiliza autenticação baseada em **JWT** para segurança das rotas e controle de sessão.  
Há verificação de tipo de usuário, confirmação de e-mail e regras de acesso específicas para cada perfil.

---

## 🚀 Tecnologias

> Cada módulo (back-end ou front-end) possui seu próprio `README.md` com detalhes sobre as tecnologias e dependências utilizadas.

- **Back-end:** Django, Django REST Framework, JWT, MySQL
- **Front-end:** Next.js, Tailwind CSS, ShadCN, Axios
- **Real-time (futuro):** Django Channels (WebSockets)
- **Armazenamento:** Cloudinary ou AWS S3 (para imagens, perfis)

---

## 📦 Como rodar localmente

Veja os `README.md` dentro de `backend/` e `frontend/` para instruções completas.

---

## 🛠️ Contribuindo

Deseja participar do projeto?  
Consulte o guia de contribuição em [`../../docs/contribuicao.md`](../../docs/contribuicao.md) e siga as boas práticas de desenvolvimento.

---

## 🧑‍💼 Desenvolvido por

**Klyra — Soluções com impacto**  
🔗 GitHub: [klyrapt](https://github.com/klyrapt)

---

> “Educar com tecnologia é preparar o futuro.” — Klyra

