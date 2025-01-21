## Requirements

- Node.js v21.6.1
- Docker and Docker Compose
- PostgreSQL

## Environment Setup

Ensure you configure the environment variables in the `.env` file before starting the project. The required variables are:

```
NODE_ENV=
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

## Installation and Usage

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment Variables

Create a `.env` file with the variables listed above. Database details can be found in the `docker-compose` file.

### 3. Running with Docker Compose

The project includes a `docker-compose.yml` file that sets up a PostgreSQL container for development. To run PostgreSQL using Docker Compose, use the following command:

```sh
docker-compose up -d
```

This will start the `postgresdb` container with the PostgreSQL image.

### 4. Run Database Migrations

```sh
npm run migrate
```

### 5. Start the Server

To start in development mode:

```sh
npm run dev
```

To start in production mode:

```sh
npm start
```

## Available Scripts

- **dev**: Starts the server in development mode using `nodemon`.
- **start**: Starts the server in production mode.
- **migrate**: Runs the database migrations.
- **migration:generate**: Generates a new database migration.
- **migration:undo**: Reverts the last migration.

## Dependencies

- **bcrypt**: ^5.1.1
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.21.1
- **jsonwebtoken**: ^9.0.2
- **pg**: ^8.13.0
- **pg-hstore**: ^2.3.4
- **sequelize**: ^6.37.4

### Development Dependencies

- **nodemon**: ^3.1.7
- **sequelize-cli**: ^6.6.2

## Docker Compose

The project includes a `docker-compose.yml` file to facilitate the development environment setup.

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

This service creates a PostgreSQL container for the development environment, making testing and application usage easier.

---

This README covers the dependencies and configuration required for the project's backend. Let me know if further adjustments are needed!

