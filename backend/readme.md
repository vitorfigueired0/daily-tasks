# Task Management API

Este projeto é uma API RESTful desenvolvida em Node.js para gerenciamento de tarefas, utilizando o framework Express.js, Sequelize como ORM e PostgreSQL como banco de dados.

## Requisitos

- Node.js v21.6.1
- Docker e Docker Compose
- PostgreSQL

## Configuração do Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo `.env` antes de iniciar o projeto. As variáveis necessárias são:

```
NODE_ENV=
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

## Instalação e Uso

### 1. Instale as Dependências

```sh
npm install
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis descritas anteriormente.

### 3. Execute as Migrações do Banco de Dados

```sh
npm run migrate
```

### 4. Inicie o Servidor

Para iniciar em modo de desenvolvimento:

```sh
npm run dev
```

Para iniciar em modo de produção:

```sh
npm start
```

### 5. Executando com Docker Compose

O projeto inclui um arquivo `docker-compose.yml` que configura um container PostgreSQL para desenvolvimento. Para executar o PostgreSQL usando Docker Compose, utilize o seguinte comando:

```sh
docker-compose up -d
```

Isso iniciará o container `postgresdb` com a imagem do PostgreSQL.

## Scripts Disponíveis

- **dev**: Inicia o servidor em modo de desenvolvimento usando `nodemon`.
- **start**: Inicia o servidor em modo de produção.
- **migrate**: Executa as migrações do banco de dados.
- **migration:generate**: Gera uma nova migração para o banco de dados.
- **migration:undo**: Desfaz a última migração.

## Dependências

- **bcrypt**: ^5.1.1
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.21.1
- **jsonwebtoken**: ^9.0.2
- **pg**: ^8.13.0
- **pg-hstore**: ^2.3.4
- **sequelize**: ^6.37.4

### Dependências de Desenvolvimento

- **nodemon**: ^3.1.7
- **sequelize-cli**: ^6.6.2

## Docker Compose

O projeto inclui um arquivo `docker-compose.yml` para facilitar a configuração do ambiente de desenvolvimento.

```yaml
version: '3.8'

services:
  postgresdb:
    image: postgres
    restart: always
    ports:
      - '5432:5432'
    volumes:
      - task-manager-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=PizzadeCupimAoAlho23#G4P
      - POSTGRES_DB=task-manager
      - POSTGRES_USER=root

volumes:
  task-manager-data:
```

Este serviço cria um container PostgreSQL para o ambiente de desenvolvimento, facilitando o teste e o uso da aplicação.

--- 

Esse README cobre as dependências e configurações necessárias para o backend do projeto. Se precisar de mais ajustes, estou à disposição!