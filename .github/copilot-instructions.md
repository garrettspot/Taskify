# Copilot instructions for Taskify

This file gives focused, actionable information to make an AI coding agent immediately productive in this repository.

1. Big picture (what runs where)
   - Two apps: `client/` (React + Vite) and `server/` (Node.js + Express + Mongoose).
   - API base: server exposes routes under `/api/*` and listens on PORT (default 5000).
   - DB: MongoDB connection handled in `server/src/config/database.js` using `process.env.MONGODB_URI`.

2. How to run (developer workflow)
   - Backend: `cd server && npm install` then `npm run dev` (uses `nodemon src/index.js`).
   - Frontend: `cd client && npm install` then `npm run dev` (Vite dev server).
   - Production: build client (`cd client && npm run build`) then start server (`cd server && npm start`).

3. Important environment and secrets
   - Server reads `.env` in `server/` with keys: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`.
   - The auth middleware falls back to `'your-secret-key'` if `JWT_SECRET` isn't set — do not rely on this in prod.

4. Key files & conventions to inspect when changing behavior
   - `server/src/index.js` — app bootstrap, route mounting (`/api/auth`, `/api/tasks`), error and 404 handlers.
   - `server/src/config/database.js` — mongoose.connect and exit-on-fail behavior.
   - `server/src/middleware/auth.js` — JWT verification; exports `authenticateToken` used by protected routes.
   - `client/src/services/api.js` — axios instance and interceptors. Base URL is `http://127.0.0.1:5000`; auth token is read from `localStorage['token']` and added as `Authorization: Bearer <token>`.
   - `client/src/contexts/AuthContext.jsx` — client-side auth lifecycle, token storage, and redirect-on-401 behavior.

5. Patterns to follow when editing or adding features
   - Follow MVC on the server: controllers in `server/src/controllers/`, routes in `server/src/routes/`, models in `server/src/models/`.
   - Keep server code CommonJS (`require/module.exports`) — the server `package.json` uses `type: "commonjs"`.
   - Client uses ESM (`type: "module"` in `client/package.json`) and React + Vite conventions.
   - API paths are relative to the axios instance. Use `api.post('/auth/login', ...)` not full URLs.

6. Common pitfalls and how to check them
   - Missing `.env` or wrong `MONGODB_URI` — `server/src/config/database.js` logs error and exits; check console for `Database connection error`.
   - Token problems — client removes token on 401 (see `api.interceptors.response`) and redirects to `/login`.
   - Port mismatch — client default Vite port may differ; the API base in `client/src/services/api.js` points at `127.0.0.1:5000`.

7. Quick examples to reference
   - Protect a route on the server: `const { authenticateToken } = require('../middleware/auth'); router.get('/', authenticateToken, controller.someAction)`
   - Client API call uses axios instance: `import api from '../services/api'; await api.get('/tasks')` (token auto-attached).

8. Tests & linters
   - There are no unit tests in the repo. `client/package.json` has `lint` (ESLint); run `cd client && npm run lint`.
   - Server `package.json` uses `nodemon` for `dev`; `test` currently maps to `npm run dev`.

9. When making PRs
   - Keep changes scoped to one logical purpose (API, model, or UI). Update server `README.md` only if behavior or env keys change.
   - If changing auth or token shape, update `client/src/services/api.js` and `client/src/contexts/AuthContext.jsx` together.

If any of these sections are unclear or you want more examples (route-level edits, adding a new model, or changing the auth flow), tell me which area and I'll expand the doc or add small code examples/tests.
