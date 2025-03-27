
# 🎓 Front-end — Gestão Escolar (Klyra)

Este é o front-end do sistema **Gestão Escolar**, desenvolvido pela [Klyra](https://github.com/klyrapt), com foco em acessibilidade, performance e usabilidade. A plataforma atende alunos, professores, pais e gestores escolares, oferecendo uma experiência integrada e intuitiva.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** — Framework React para SSR/SSG
- **Tailwind CSS** — Utilitário para estilização moderna e responsiva
- **ShadCN/UI** — Conjunto de componentes acessíveis e bonitos
- **Lucide Icons** — Ícones modernos via SVG
- **Axios** — Comunicação com a API
- **Zod / React Hook Form** — Validação de formulários (opcional)
- **JWT Auth** — Integração com autenticação via API do back-end

---

## 📁 Estrutura do Projeto

```
frontend/
├── app/              # Páginas e rotas (Next.js 13+)
├── components/       # Componentes reutilizáveis (botões, cards, inputs)
├── lib/              # Configuração de API, autenticação, temas
├── public/           # Imagens e arquivos estáticos
├── styles/           # Arquivos CSS globais
├── .env.local        # Variáveis de ambiente (NÃO COMITAR)
├── .gitignore
└── README.md
```

---

## ⚙️ Instalação e Uso

```bash
# Instale as dependências
npm install

# Rode o servidor local
npm run dev
```

> O front-end espera que a API esteja rodando e acessível via URL definida no `.env.local`.

---

## 🔐 Autenticação

Este projeto usa **JWT Token Authentication** integrada ao back-end em Django REST Framework.

Configure sua variável de ambiente:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
```

> Você receberá o token após o login e ele será armazenado em cookies ou localStorage.

---

## 📦 Build para produção

```bash
npm run build
```

---

## 🧪 Testes (opcional)

Se forem implementados testes com Jest, Cypress ou Vitest:

```bash
npm run test
```

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Push (`git push origin minha-feature`)
5. Crie um Pull Request

---

## 🧑‍💼 Desenvolvido por

**Klyra — Soluções com impacto**  
🔗 GitHub: [klyrapt](https://github.com/klyrapt)

---

> “Educar com tecnologia é preparar o futuro.” — Klyra
