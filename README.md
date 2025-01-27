# Teste de Desenvolvimento Fullstack

## Objetivo
Avaliar suas habilidades no desenvolvimento de aplicações fullstack utilizando **C#** no backend e **React** no frontend.

---

## Requisitos do Teste

### Backend
**Tecnologia Obrigatória**: C#
**Funcionalidades Necessárias**:
Desenvolver um CRUD básico para as seguintes entidades:

- **Produto**
  - Nome

- **Item**
  - Produto (relacionamento com a entidade Produto)
  - Quantidade
  - Unidade de Medida

- **Carrinho**
  - Identificador
  - ItensCarrinho (relacionamento com a entidade Item, gerando uma entidade relacional)

---

### Frontend
**Tecnologias Obrigatórias**:
- **React** (com Vite)
- **Biblioteca MUI** para componentes de interface

**Funcionalidades Necessárias**:
- **Telas**:
  - Listagem, Cadastro e Atualização para **Produto**, **Item** e **Carrinho**.
  - Todas as telas de listagem devem possuir um campo de busca que permita filtrar por pelo menos uma coluna.
  - **Dashboard**: mostrar a quantidade de registros cadastrados para **Produto**, **Item** e **Carrinho**.

---

### Observação
- O atributo **Produto** na entidade **Item** refere-se ao relacionamento entre **Item** e **Produto**.
- A propriedade **ItensCarrinho** na entidade **Carrinho** refere-se ao relacionamento entre **Carrinho** e **Item**, o qual gera uma **entidade relacional**.

