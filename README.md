# 🐾 Find A Friend — Monorepo

Find A Friend is a portfolio project designed to demonstrate a scalable and well-structured monorepo architecture.
The platform connects organizations (ORGs) that rescue pets with people interested in adoption.

This repository contains multiple applications that share configuration, tooling, and architectural principles.

---

## 📦 Apps

- [**API** – In development](https://github.com/MatheusTG/find-a-friend/tree/main/apps/api)
- [**Web** – Planned (coming soon)](https://github.com/MatheusTG/find-a-friend/tree/main/apps/web)


---

## 🏗️ Architecture Overview

- Monorepo-based structure
- Clear separation of responsibilities
- Shared tooling and configuration
- Independent evolution of API and Web applications

---

## 📂 Project Structure

```text
apps/
  api/   → REST API (business rules, authentication, persistence)
  web/   → Web application (UI and user experience)
packages/
  config/ → Shared configuration and tooling
```

---

## 📜 Global Functional Scope

- Organizations (ORGs) can register and authenticate.
- ORGs can register pets available for adoption.
- Users can search for pets by city.
- Users can filter pets by characteristics.
- Adoption contact is made directly with the ORG.

---

## 📐 Global Business Rules

- Every pet must belong to exactly one ORG.
- City is mandatory when searching for pets.
- Adoption contact is handled directly between users and ORGs.
- Only authenticated ORGs can manage pets.

---

## ⚙️ Global Non-Functional Requirements

- [x] **NFR001 - Architecture:** The system must follow a modular and scalable architecture.
- [x] **NFR002 - Monorepo:** The application must be organized as a monorepo with shared configuration and tooling.
- [x] **NFR003 - Maintainability:** The codebase must follow clean code and SOLID principles.
- [x] **NFR004 - Scalability:** The system must be prepared for future growth.
- [x] **NFR005 - Developer Experience:** The project must enable fast setup and consistent development workflows.
- [x] **NFR006 - Documentation:** Each application must have its own clear and detailed README.
