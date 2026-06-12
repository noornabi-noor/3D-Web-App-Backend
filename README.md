# 3D Web App Backend

This repository contains the backend for a 3D Web Application project built for a summer technical round.

## Overview

The backend is an Express.js API with MongoDB and JWT authentication. It supports:

- user registration and login
- JWT-based protected routes
- saving and loading 3D scene object data
- adding and updating object positions

The frontend is expected to be a separate Next.js application that uses Three.js to render the scene and communicates with this backend.

## Built With

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- CORS
- bcrypt
- uuid

## Environment Variables

Copy the `.env` file and set these values before running the server:

```env
PORT=5000
APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:5000
DB_USER=<your-mongodb-username>
DB_PASSWORD=<your-mongodb-password>
DB_NAME=<your-mongodb-database-name>
JWT_SECRET=<your-jwt-secret>
```

`APP_URL` is used for CORS to allow the frontend running on `http://localhost:3000`.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install the required `cors` package (already included in `package.json`):

```bash
npm install cors
```

## Running the Backend

Start the backend in development mode:

```bash
npm run dev
```

Or start the server normally:

```bash
npm start
```

The backend will listen on the value of `PORT` (default `5000`).

## API Endpoints

### Auth

- `POST /api/auth/register`
  - Request body: `{ name, email, password }`
  - Creates a new user.

- `POST /api/auth/login`
  - Request body: `{ email, password }`
  - Returns a JWT token if credentials are valid.

- `POST /api/auth/logout`
  - Returns a simple logout response.

### Scene

All scene endpoints are protected and require `Authorization: Bearer <token>` in request headers.

- `GET /api/scene/load`
  - Loads the saved scene objects for the authenticated user.

- `POST /api/scene/save`
  - Request body: `{ objects: [...] }`
  - Saves the complete scene object list for the authenticated user.

- `POST /api/scene/add-object`
  - Request body: `{ type, position, rotation, scale }`
  - Adds a new object to the user's scene.

- `POST /api/scene/update-object-position`
  - Request body: `{ objectId, position }`
  - Updates an existing object position in the user's scene.

## Frontend Notes

The frontend should be implemented as a separate Next.js application using Three.js (recommended via `@react-three/fiber`). The application should:

- provide signup and login screens
- store the JWT token securely in local storage or cookies
- redirect authenticated users to a 3D scene page
- render scene objects using Three.js
- allow adding cube, sphere, and custom objects
- allow dragging and repositioning objects
- call backend APIs to save/load scene data

A frontend plan was created in `frontend.txt` for step-by-step implementation.

## CORS Configuration

CORS is enabled in `src/app/server.js` using `APP_URL` from `.env`.

```js
app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

## Fixes and Notes

A recent bug in `src/app/models/scene/scene.controller.js` was fixed where a stray object definition referenced undefined variables.

## License

This project is provided as-is for technical round development and evaluation.
