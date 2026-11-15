# Axlero Project 1 — Multi-Vendor Marketplace

MERN stack implementation for the Axlero Web Development internship.

## Stack
- MongoDB + Mongoose
- Express.js
- React.js
- Node.js
- JWT + bcrypt

## Architecture
Backend follows Clean Architecture:
- `domain/entities` — business entities
- `application/services` — use cases/business logic
- `infrastructure` — MongoDB/Mongoose
- `interfaces` — controllers, routes, middleware
- `config` — environment/database configuration

## Run locally

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## API
- GET `/api/health`
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/products`
- GET `/api/products/mine`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

## Current implementation
Week 1 foundation + authentication/RBAC and initial storefront/vendor flow are included. Checkout is represented as a mock UI and can be extended during Week 4.
