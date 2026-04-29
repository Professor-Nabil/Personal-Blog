# TODO-Phase-1.md | Infrastructure & Static Mockups

This phase is about getting the "Skeleton" of the blog ready.
By the end of this,
you will be able to click through all 5 pages,
even if the data is just hardcoded for now.

- [x] **Commit 1: Project Initialization**
  - [x] Initialize `npm` and install core dependencies (`express`, `ejs`, `dotenv`).
  - [x] Install dev dependencies (`typescript`, `tsx`, `@types/node`, `@types/express`).
  - [x] Configure `tsconfig.json` for ESM.
  - [x] Create the folder structure: `src/views/guest`, `src/views/admin`, `src/views/partials`, `public/css`, `src/data`.

- [x] **Commit 2: Server Boilerplate**
  - [x] Set up `src/server.ts` with EJS config and static file middleware.
  - [x] Create a basic "Hello World" route to test the setup.

- [ ] **Commit 3: Master Layout & Partials**
  - [ ] Create `src/views/partials/header.ejs` (Navigation for Home).
  - [ ] Create `src/views/partials/footer.ejs` (Copyright & Simple links).
  - [ ] Create `public/css/style.css` with base typography (Serif fonts for that blog feel).

- [ ] **Commit 4: Guest Section Mockups**
  - [ ] Create `src/views/guest/home.ejs` with dummy list of articles.
  - [ ] Create `src/views/guest/article.ejs` to show a single dummy post.
  - [ ] Map routes `/` and `/article/:id` in `server.ts`.

- [ ] **Commit 5: Admin Layout & Dashboard Mockup**
  - [ ] Create `src/views/admin/dashboard.ejs` with a table of posts and "Edit/Delete" buttons.
  - [ ] Add an "Admin" version of the navigation to differentiate from the guest view.

- [ ] **Commit 6: Admin Form Mockups (New & Edit)**
  - [ ] Create `src/views/admin/new.ejs` with a form (Title, Date, Content).
  - [ ] Create `src/views/admin/edit.ejs` (same form, but pre-filled with dummy text).
  - [ ] Map routes `/admin/dashboard`, `/admin/new`, and `/admin/edit/:id`.

- [ ] **Commit 7: Article Data Schema Definition**
  - [ ] Create a `src/types.ts` file.
  - [ ] Define the `Article` interface (id, title, content, date, slug).
  - [ ] Create a `sample.json` in `src/data/` to use as a reference.
