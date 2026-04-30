# TODO-Phase-5.md | Final Polish & Refactoring

### 🏗️ Step 1: Architectural Cleanup

Moving logic out of `server.ts` to keep the entry point clean and organized.

- [x] **Commit 1: Middleware Migration**
  - [x] Create `src/middleware/auth.ts`.
  - [x] Extract `checkAuth` and the `express-session` type augmentation to this new file.
  - [x] Update `server.ts` to import the middleware.

---

### 🎨 Step 2: User Experience (UX) Enhancements

Making the data more readable and the navigation more robust.

- [ ] **Commit 2: Human-Readable Dates**
  - [ ] Create a utility function (or use `Intl.DateTimeFormat`) to convert `YYYY-MM-DD` to `Month DD, YYYY`.
  - [ ] Update `guest/home.ejs` and `guest/article.ejs` to use this formatted date.
  - [ ] _Optional:_ Keep the ISO format in the Admin Dashboard for easy sorting.

- [ ] **Commit 3: Global 404 & Error Handling**
  - [ ] Create a `src/views/guest/404.ejs` template.
  - [ ] Add a "Catch-all" route at the bottom of `server.ts` to render the 404 page for any undefined URL.
  - [ ] Refactor the article logic to redirect to this 404 page if `getArticleById` returns null.

---

### 🧹 Step 4: Production Readiness

Final cleanup before you consider the MVP "Done."

- [ ] **Commit 4: Environmental Sanity**
  - [ ] Ensure `.env.example` is updated with all current keys (`PORT`, `ADMIN_PASSWORD`, `SESSION_SECRET`).
  - [ ] Remove any remaining `console.log` statements used for debugging during development.
  - [ ] Run a final `npm run check` and `npm run build` to ensure the TypeScript project compiles perfectly.

---

### 💡 Suggestions for "Small Extra Steps"

1. **Dynamic Navbar**:
   Update `header.ejs` to show a "Dashboard" link
   if the user is logged in, and a "Login" link if they aren't.

2. **Empty State**:
   Add a check in `home.ejs`—if there are no articles,
   show a friendly "No posts yet. Stay tuned!" message instead of an empty white space.

3. **Favicon**:
   Add a simple favicon to the `public/` folder
   to remove that annoying 404 error in the browser console.
