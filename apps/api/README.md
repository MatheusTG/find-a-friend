# 🔌 Find A Friend — API

This API is responsible for handling authentication, business rules, and data persistence
for the Find A Friend platform.

## 📜 Functional Requirements

Functional requirements describe what the system must do.

- [x] **FR001 - ORGs:** The system must allow organizations to be created.
- [x] **FR002 - ORGs:** The system must allow organizations to authenticate.
- [x] **FR003 - Authentication:** The system must identify the authenticated ORG across requests (e.g., tokens).
- [x] **FR004 - Pets:** The system must allow registering a pet with the following information:
  - [x] Name
  - [x] Description
  - [x] Age
  - [x] Size
  - [x] Energy level
  - [x] Independence level
  - [x] City
  - [x] Additional characteristics
- [x] **FR005 - Pets:** The system must allow listing all pets available for adoption by city.
- [x] **FR006 - Pets:** The system must allow filtering pets by characteristics.
- [x] **FR007 - Pets:** The system must allow viewing a specific pet.
- [ ] **FR008 - Adoption:** The system must provide the ORG’s contact information for adoption.

---

## 📐 Business Rules

Business rules define mandatory constraints and behaviors.

- [x] **BR001 - Ownership:** Each pet must belong to exactly one ORG.
- [x] **BR002 - Access Control:** Only authenticated ORGs can register or manage pets.
- [ ] **BR003 - Data Privacy:** ORGs can only manage pets they have created.
- [x] **BR004 - Mandatory City:** City is required when listing pets.
- [ ] **BR005 - Direct Contact:** Adoption contact must be made directly with the ORG.

---

## ⚙️ Non-Functional Requirements

Non-functional requirements describe how the system should operate.

- [x] **NFR001 - Architecture:** The API must follow RESTful principles.
- [x] **NFR002 - Security:** The system must ensure secure authentication and authorization using JWT (JSON Web Tokens).
- [x] **NFR003 - Data Management:** Data must be persisted in a PostgreSQL relational database.
- [x] **NFR004 - Maintainability:** The codebase must be clean and maintainable.
- [x] **NFR005 - Testability:** The application must support automated tests.
- [x] **NFR006 - Performance:** The API must efficiently handle concurrent requests.
