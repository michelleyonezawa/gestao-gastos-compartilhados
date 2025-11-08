
# Gestão de Gastos Compartilhados - API REST

API para gerenciamento de gastos compartilhados entre usuários, grupos e registros de despesas. Desenvolvida em Node.js com Express, autenticação JWT e documentação Swagger.

## Estrutura do Projeto

```
gestao-gastos-compartilhados/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   └── service/
├── resources/
│   └── swagger.json
├── package.json
└── README.md
```

## Instalação e Execução

1. Instale as dependências:
	```bash
	npm install
	```
2. Inicie a API:
	```bash
	npm start
	```
3. Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Autenticação

Utilize o endpoint `/api/login` para obter um token JWT. Inclua o token no header `Authorization: Bearer <token>` para acessar os endpoints protegidos.

## Documentação da API

Consulte o arquivo `resources/swagger.json` ou acesse `/api-docs` para visualizar todos os endpoints, modelos de resposta e códigos de erro.

## Funcionalidades e Regras de Negócio

### 1) Registro de um Usuário
Como um usuário do software,
Eu quero me cadastrar no sistema,
Para que eu possa acessar as funcionalidades de criação e gestão de grupos de gastos.

**Regras de Negócio:**
- O e-mail deve ser único, não podendo existir dois usuários com o mesmo e-mail.
- A senha deve possuir no mínimo 6 caracteres.
- Todos os campos obrigatórios devem ser preenchidos (nome, e-mail e senha).

### 2) Criar um Grupo
Como um usuário autenticado,
Eu quero criar um grupo,
Para que eu possa gerenciar gastos compartilhados com outras pessoas.

**Regras de Negócio:**
- Cada grupo deve possuir um nome único.
- O usuário criador deve ser automaticamente adicionado ao grupo como integrante.
- O grupo deve ter ao menos um usuário vinculado no momento da criação.

### 3) Entrada de um Usuário em um Grupo Existente
Como um usuário já cadastrado,
Eu quero entrar em um grupo já existente,
Para que eu possa acompanhar e registrar gastos compartilhados com seus membros.

**Regras de Negócio:**
- Deve existir um código ou identificador do grupo para entrada.
- O grupo deve estar ativo (não arquivado/excluído).

### 4) Registro de Gasto por Integrante
Como um integrante de um grupo,
Eu quero registrar um gasto que realizei,
Para que os demais membros possam visualizar e considerar esse gasto no balanço do grupo.

**Regras de Negócio:**
- O gasto registrado deve estar associado a um grupo e a um usuário.
- O gasto registrado deve conter informações obrigatórias (data, valor)
- O valor do gasto deve ser maior que zero.
- O usuário só pode registrar gasto em grupos dos quais faça parte.

### 5) Visualização de Gastos do Grupo
Como um integrante de um grupo,
Eu quero visualizar os gastos realizados por cada membro,
Para que eu possa acompanhar o fluxo financeiro e entender o total gasto.

**Regras de Negócio:**
- O usuário só pode visualizar gastos de grupos dos quais participa.
- Deve ser possível visualizar o gasto detalhado (valor, data, autor e descrição).
- O sistema deve permitir visualizar o total de gastos por integrante e o total do grupo.

1) Funcionalidade: Registro de um Usuário
Como um usuário do software,
Eu quero me cadastrar no sistema,
Para que eu possa acessar as funcionalidades de criação e gestão de grupos de gastos.

Regras de Negócio:
- O e-mail deve ser único, não podendo existir dois usuários com o mesmo e-mail.
- A senha deve possuir no mínimo 6 caracteres.
- Todos os campos obrigatórios devem ser preenchidos (nome, e-mail e senha).

2) Funcionalidade: Criar um Grupo
Como um usuário autenticado,
Eu quero criar um grupo,
Para que eu possa gerenciar gastos compartilhados com outras pessoas.

Regras de Negócio:
- Cada grupo deve possuir um nome único.
- O usuário criador deve ser automaticamente adicionado ao grupo como integrante.
- O grupo deve ter ao menos um usuário vinculado no momento da criação.

3) Funcionalidade: Entrada de um Usuário em um Grupo Existente
Como um usuário já cadastrado,
Eu quero entrar em um grupo já existente,
Para que eu possa acompanhar e registrar gastos compartilhados com seus membros.

Regras de Negócio:
- Deve existir um código ou identificador do grupo para entrada.
- O grupo deve estar ativo (não arquivado/excluído).

4) Funcionalidade: Registro de Gasto por Integrante
Como um integrante de um grupo,
Eu quero registrar um gasto que realizei,
Para que os demais membros possam visualizar e considerar esse gasto no balanço do grupo.

Regras de Negócio:
- O gasto registrado deve estar associado a um grupo e a um usuário.
- O gasto registrado deve conter informações obrigatórias (data, valor)
- O valor do gasto deve ser maior que zero.
- O usuário só pode registrar gasto em grupos dos quais faça parte.

5) Funcionalidade: Visualização de Gastos do Grupo
Como um integrante de um grupo,
Eu quero visualizar os gastos realizados por cada membro,
Para que eu possa acompanhar o fluxo financeiro e entender o total gasto.

Regras de Negócio:
- O usuário só pode visualizar gastos de grupos dos quais participa.
- Deve ser possível visualizar o gasto detalhado (valor, data, autor e descrição).
- O sistema deve permitir visualizar o total de gastos por integrante e o total do grupo.
