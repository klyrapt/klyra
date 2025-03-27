# 🗂️ Estrutura do Repositório — Klyra

Este documento apresenta a estrutura organizacional do repositório principal da **Klyra**, com o objetivo de facilitar a navegação, padronizar a organização dos arquivos e orientar colaboradores e visitantes.

---

## 📁 Estrutura Geral

```bash
klyra/
├── projetos/         # Projetos ativos e planejados da empresa
├── docs/             # Documentações internas e institucionais
├── assets/           # Logos, ícones, imagens públicas
├── .gitignore        # Arquivos a serem ignorados pelo Git
├── LICENSE           # Licença de uso (MIT)
└── README.md         # Apresentação do repositório principal
```

### 🔹 `projetos/`
Contém os projetos reais da Klyra. Cada projeto tem sua própria pasta, estrutura e documentação.

Exemplo:
```bash
projetos/
├── marketplace/
├── gestao-escolar/
├── suporte-cliente/
```

Dentro de cada projeto você encontrará:
- `README.md`: Descrição do projeto, objetivo, tecnologias e escopo
- `docs/` (opcional): Documentos técnicos ou funcionais internos
- `src/` ou `backend/` e `frontend/`: Códigos separados por stack (se aplicável)

---

### 🔹 `docs/`
Contém documentações institucionais que valem para todos os projetos:

| Arquivo                     | Descrição                                                  |
|----------------------------|------------------------------------------------------------|
| `estrutura.md`             | Este documento explicando a estrutura do repositório       |
| `roadmap.md`               | Planejamento de fases e projetos da empresa                |
| `contribuicao.md`          | Guia de contribuição para colaboradores e devs externos    |
| `atas/` (opcional)         | Pasta com atas das reuniões de equipe                      |

---

### 🔹 `assets/`
Local reservado para materiais gráficos da Klyra:
- Logos em diferentes formatos
- Ícones de marca
- Banners e imagens institucionais

Esses arquivos podem ser usados em documentos, apresentações, landing pages ou README.md.

---

## ✅ Boas práticas

- Todos os projetos devem conter um `README.md` claro e objetivo
- Commits devem seguir convenção semântica (`feat:`, `fix:`, `docs:`...)
- Evitar arquivos desnecessários na raiz do repositório
- Sempre que possível, documentar as decisões tomadas nas reuniões

---

## 🧭 Acesso rápido

| Item                      | Localização              |
|---------------------------|--------------------------|
| Regras para contribuição | `docs/contribuicao.md`   |
| Planejamento de projetos | `docs/roadmap.md`        |
| Projetos em desenvolvimento | `projetos/`           |
| Recursos gráficos         | `assets/`                |

---

> Dúvidas sobre a estrutura? Fale com o fundador ou abra uma issue no repositório.

**Última atualização:** 27/03/2025

