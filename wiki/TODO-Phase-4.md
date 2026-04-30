## TODO-Phase-4.md | Security & Authentication

### 🛠️ Step 1: Infrastructure & Environment

We need to set up the tools that allow the server to "remember" who we are.

- [x] **Commit 1: Setup Session & Env**
  - [x] Install `express-session` and `@types/express-session`.
  - [x] Create a `.env` file with `ADMIN_PASSWORD` and `SESSION_SECRET`.
  - [x] Configure `express-session` middleware in `server.ts`.

---

### 🔑 Step 2: The Login Flow

Creating the interface and logic to grant access.

- [x] **Commit 2: Login Interface**
  - [x] Create `src/views/login.ejs`.
  - [x] Add a simple CSS section for the login box.
  - [x] Add the `GET /login` route in `server.ts`.

- [x] **Commit 3: Authentication Logic**
  - [x] Create `POST /login` route.
  - [x] Logic: Compare form password with `.env` password.
  - [x] On success: Set `session.isLoggedIn = true` and redirect to dashboard.
  - [x] On failure: Redirect back to login with an error message.

---

### 🛡️ Step 3: The Gatekeeper

Ensuring the admin routes are actually private.

- [x] **Commit 4: Middleware Protection**
  - [x] Create a `checkAuth` middleware function.
  - [x] Apply the middleware to all `/admin/*` routes.
  - [x] Logic: If not logged in, redirect to `/login`.

- [ ] **Commit 5: Logout & Security Polish**
  - [ ] Add `POST /logout` to clear the session.
  - [ ] Add a "Logout" button to the Admin Header.
  - [ ] Final verification: Try accessing `/admin/dashboard` in an Incognito window.

---

### ⚠️ Important Planning Notes

1. **Session Security**:
   Since we are in development,
   we will use the default memory store for sessions.
   (Note: Restaring the server will log you out).

2. **Environment Variables**:
   We must ensure `.env` is in `.gitignore` so your password never reaches GitHub.

3. **No User Database**:
   For this MVP, we aren't creating a `users.json`.
   We are using a single "God Mode" password defined in your environment variables.
