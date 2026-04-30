## TODO-Phase-3.md | Admin Actions (Write/Update/Delete)

This phase turns the static forms into a working Content Management System (CMS).

### 🛠️ Step 1: Storage Service Enhancements

Before we can use the routes, we need the logic to write data to the disk.

- [x] **Commit 1: Create & Update Logic**
  - [x] Implement `saveArticle(article: Article)` in `src/services/storage.ts`.
  - [x] Use `fs.writeFile` to save the article as a JSON string.
  - [x] Ensure it can handle both new articles and overwriting existing ones.

- [x] **Commit 2: Delete Logic**
  - [x] Implement `deleteArticle(id: string)` in `src/services/storage.ts`.
  - [x] Use `fs.unlink` to remove the file.
  - [x] Add error handling to check if the file exists before deleting.

---

### 📝 Step 2: Implementation (Routes & Logic)

Now we connect the service to the Express routes.

- [ ] **Commit 3: Create Article Integration**
  - [ ] Create `POST /admin/new` route in `server.ts`.
  - [ ] Logic to generate a unique `id` (timestamp) and a `slug` (URL-friendly title).
  - [ ] Extract `excerpt` from the beginning of the content.
  - [ ] Redirect to `/admin/dashboard` on success.

- [ ] **Commit 4: Update Article Integration**
  - [ ] Create `POST /admin/edit/:id` route in `server.ts`.
  - [ ] Fetch the existing article, update its fields with form data, and save.
  - [ ] Redirect to `/admin/dashboard`.

- [ ] **Commit 5: Delete Article Integration**
  - [ ] Create `POST /admin/delete/:id` route in `server.ts`.
  - [ ] Call the delete service.
  - [ ] Redirect to `/admin/dashboard`.

---

### ✅ Step 3: Final Touches

- [ ] **Commit 6: UX & Validation**
  - [ ] Add basic validation (e.g., ensure title is not empty).
  - [ ] Clean up `sample.json` and test the full flow: **Create -> View -> Edit -> Delete**.

---

### Important Planning Notes

1. **Slug Generation**: We'll need a simple helper to turn "Hello World" into "hello-world".
2. **Redirects**: Every "Write" operation should end with a redirect to prevent users from accidentally re-submitting forms on page refresh.
3. **Data Consistency**: We must ensure the `id` in the JSON file always matches the filename.

**Ready to start with Commit 1 of Phase 3 (The `saveArticle` service)?**
