![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-in%20development-darkgreen)
![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-ef4444)

# 🐾 Find A Friend — Monorepo

Find A Friend is a portfolio project designed to demonstrate a scalable and well-structured monorepo architecture.
The platform connects organizations (ORGs) that rescue pets with people interested in adoption.

This repository contains multiple applications that share configuration, tooling, and architectural principles.

---

## 🚀 Technologies Used

| Technology                                                                                                             | Description                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)               | JavaScript runtime environment designed for building scalable server-side applications.                       |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)      | Strongly typed superset of JavaScript that improves code quality, safety, and maintainability.                |
| ![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)               | High-performance, low-overhead web framework for building RESTful APIs with Node.js.                           |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)                 | Modern ORM for Node.js and TypeScript, providing type-safe database access and schema-driven development.     |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)                 | Containerization platform used to ensure consistent development and production environments.                 |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | Relational database system used to store and manage application data with reliability and performance. |
| ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)        | High-performance build system for JavaScript/TypeScript monorepos, enabling efficient task orchestration.    |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)                           | Type-safe schema validation library used to ensure data integrity and reliable input parsing.                 |
| ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)                  | Modern and fast testing framework designed for unit and end-to-end testing.                                   |

---

## 🎯 Purpose

This project was built to demonstrate:
- Clean architecture following DDD and SOLID principles
- A scalable and well-structured monorepo setup
- A containerized development environment using Docker for improved Developer Experience (DX)

---

## 📋 Requirements

Before running the project locally, make sure your environment meets the following requirements:

### 🧰 System & Runtime
- **Node.js ≥ 20**  
  Required for Turborepo, Prisma 7.x, and modern TypeScript tooling.
- **pnpm ≥ 10**  
  Monorepo package manager used across the entire project.

### 🐳 Infrastructure
- **Docker & Docker Compose**  
  Used to run PostgreSQL and ensure a consistent development environment.

### 🗄️ Database
- **PostgreSQL ≥ 14**  
  Relational database accessed via Prisma ORM.

### 🧑‍💻 Development Environment (Optional but Recommended)

- Visual Studio Code

- **VS Code Dev Containers extension**  
  Enables running the project inside a preconfigured development container, ensuring a consistent environment across machines.

---

## 🛠️ Installation & Usage

Follow the steps below to run the project locally.

### 1️⃣ Create a projects directory (WSL)

Open your WSL Ubuntu terminal and create a directory to store your projects:

```bash
mkdir -p ~/projects
cd ~/projects
```

### 2️⃣ Clone the repository

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/MatheusTG/find-a-friend.git
cd find-a-friend
```

### 3️⃣ Open the project in VS Code

From the project root, open the workspace in VS Code:

```bash
code .
```

### 4️⃣ Configure environment variables

Create a `.env` file inside `apps/api`:

```bash
DATABASE_URL="postgresql://docker:docker@postgres:5432/findafriend"
JWT_SECRET=your-secret-key # development only
```

### 5️⃣ Open the project in a Dev Container

Reopen the workspace inside a Dev Container to ensure a fully configured development environment:

- Open the Command Palette (Ctrl + Shift + P)

- Select Dev Containers: Open Folder in Container

### 6️⃣ Run the project

Using pnpm, start the development environment:

```bash
pnpm turbo start:dev
```

---

> ℹ️ Make sure you have **Docker**, **pnpm**, and the **Dev Containers** extension installed in Visual Studio Code.
> This project is intended to run inside a Dev Container for consistency across environments.

---

## 📜 Available Scripts

- `pnpm turbo start:dev` – Starts all applications in development mode (persistent task, no cache)
- `pnpm turbo prisma:generate` – Generates the Prisma Client for all dependent apps
- `pnpm turbo test:unit` – Runs unit tests across the monorepo
- `pnpm turbo test:e2e` – Runs end-to-end tests (depends on Prisma Client generation)
- `pnpm turbo format` – Formats the codebase
- `pnpm turbo format:check` – Checks code formatting without applying changes

---

## 📦 Apps

- [**API** – In development](https://github.com/MatheusTG/find-a-friend/tree/main/apps/api)
- [**Web** – Planned (coming soon)](https://github.com/MatheusTG/find-a-friend/tree/main/apps/web)

---

## 📁 Project Structure

```bash
apps/
├── api/
│   ├── e2e/                          # End-to-end tests
│   ├── prisma/
│   │   ├── migrations/               # Database migration files
│   │   ├── vite-environment/
│   │   │   └── test-environment.ts   # Isolated database setup for Prisma per E2E test run
│   │   └── schema.prisma             # Prisma schema definition
│   ├── rest-client/                  # HTTP client configs (REST testing / requests)
│   └── src/
│       ├── @types/                   # Global and custom TypeScript typings
│       ├── env/                      # Environment variable validation and loading
│       ├── http/                     # HTTP layer (controllers, routes, middlewares)
│       ├── lib/                      # Shared libraries and helpers
│       ├── modules/                  # Application modules (DDD-style structure)
│       │   ├── orgs/
│       │   │   ├── controllers/      # HTTP controllers
│       │   │   ├── dtos/             # Data Transfer Objects
│       │   │   ├── entities/         # Domain entities
│       │   │   ├── factories/        # Factory functions
│       │   │   ├── repositories/     # Repository implementations
│       │   │   ├── tests/            # Unit and integration tests
│       │   │   ├── use-cases/        # Business rules / application logic
│       │   │   └── orgs.routes.ts    # Routes for orgs module
│       │   └── pets/
│       ├── utils/                    # Utility functions
│       ├── app.ts                    # App bootstrap and configuration
│       └── server.ts                 # HTTP server entry point
└── web/                              # Frontend application (planned)
```

---

## 📜 Global Functional Scope

- [x] Organizations (ORGs) can register and authenticate.
- [x] ORGs can register pets available for adoption.
- [x] Users can search for pets by city.
- [x] Users can filter pets by characteristics.
- [x] Adoption contact is made directly with the ORG.

---

## 📐 Global Business Rules

- [x] Every pet must belong to exactly one ORG.
- [x] City is mandatory when searching for pets.
- [x] Adoption contact is handled directly between users and ORGs.
- [x] Only authenticated ORGs can manage pets.

---

## ⚙️ Global Non-Functional Requirements

- [x] **NFR001 - Architecture:** The system must follow a modular and scalable architecture.
- [x] **NFR002 - Monorepo:** The application must be organized as a monorepo with shared configuration and tooling.
- [x] **NFR003 - Maintainability:** The codebase must follow clean code and SOLID principles.
- [x] **NFR004 - Scalability:** The system must be prepared for future growth.
- [x] **NFR005 - Developer Experience:** The project must enable fast setup and consistent development workflows.
- [x] **NFR006 - Documentation:** Each application must have its own clear and detailed README.

---

## 🤝 Contributing

Contributions are welcome and appreciated!

If you want to contribute to this project, please follow the steps below:

1. Fork the repository
2. Create a new branch (`git checkout -b feat/your-feature-name`)
3. Make your changes
4. Commit your changes following the Conventional Commits standard
5. Push your branch (`git push origin feat/your-feature-name`)
6. Open a Pull Request

---

### Commit Convention

This project follows the Conventional Commits specification:

- feat: A new feature
- fix: A bug fix
- refactor: Code refactoring without behavior change
- test: Adding or updating tests
- chore: Maintenance tasks and tooling changes
- docs: Documentation changes

Please make sure your code is well-tested and follows the existing project structure and linting rules.

## 📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software, provided that the original copyright
and license notice are included in all copies or substantial portions of the software.
