## TODO-Phase-2.md | The Filesystem Database

This phase focuses on building a **Service Layer**.
This means we write the logic for talking to the filesystem
in one place (`storage.ts`) so our routes stay clean and simple.

- [x] **Commit 1: Storage Service Foundation**
  - [x] Create `src/services/storage.ts`.
  - [x] Import `fs/promises` and `path`.
  - [x] Define the constant path to the `src/data` folder.
  - [x] Add a helper function to ensure the data directory exists.

- [x] **Commit 2: Read All Articles Logic**
  - [x] Implement `getAllArticles()` function.
  - [x] Logic to read the `src/data` directory.
  - [x] Logic to parse each `.json` file into an `Article` object.
  - [x] Sort articles by date (newest first).

- [x] **Commit 3: Read Single Article Logic**
  - [x] Implement `getArticleById(id: string)` or `getArticleBySlug(slug: string)`.
  - [x] Add error handling if a file is missing.

- [ ] **Commit 4: Integration - Home Page**
  - [ ] Update the `GET /` route in `server.ts`.
  - [ ] Replace `mockArticles` with a call to the `Storage Service`.
  - [ ] Verify that the Home page displays data from `sample.json`.

- [ ] **Commit 5: Integration - Article Details**
  - [ ] Update the `GET /article/:id` route in `server.ts`.
  - [ ] Call the `Storage Service` to fetch a specific post.
  - [ ] Verify that clicking a post on the home page opens the correct content.

- [ ] **Commit 6: Integration - Admin Dashboard**
  - [ ] Update the `GET /admin/dashboard` route in `server.ts`.
  - [ ] Ensure the admin table is now populated with real file data instead of mock data.
