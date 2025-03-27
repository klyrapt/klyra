
import os
from pathlib import Path

def criar_estrutura_projeto(nome_projeto):
    base = Path(__file__).parent / "projetos" / nome_projeto

    backend = base / "backend"
    frontend = base / "frontend"
    docs = base / "docs"

    # Criar diretórios
    backend.mkdir(parents=True, exist_ok=True)
    frontend.mkdir(parents=True, exist_ok=True)
    docs.mkdir(parents=True, exist_ok=True)

    # Criar README.md básico
    readme_path = base / "README.md"
    readme_path.write_text(f"""# {nome_projeto.capitalize()}

Este projeto faz parte da plataforma Klyra.

## Estrutura
- `backend/`: API e lógica de servidor
- `frontend/`: Interface do usuário
- `docs/`: Documentação específica do projeto

## Descrição
(Adicione aqui uma descrição detalhada do propósito do projeto.)
""")

    print(f"Estrutura criada em: {base.resolve()}")

if __name__ == "__main__":
    nome = input("Digite o nome do projeto: ")
    criar_estrutura_projeto(nome)
