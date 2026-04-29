# 🗺️ PLAN.md

**Project: Personal Blog (SSR)**

### Phase 1: Infrastructure & Static Mockups

- Project initialization (Express, TS, EJS).
- Defining the **Article Schema** (JSON structure).
- Creating the "Shell" (Header/Footer partials) that works for both Guest and Admin sections.
- Building static EJS views for all 5 pages (Home, Article, Dashboard, New, Edit) with dummy data.

### Phase 2: The Filesystem Database (The "Storage" Layer)

- Creating a `Storage Service` to handle CRUD (Create, Read, Update, Delete) on JSON files.
- Implementing the "Read" logic: Fetching all articles for the Home page and one article for the Article page.

### Phase 3: Admin Actions (Write/Update/Delete)

- Implementing the "Create" logic: Handling the form in the "New Article" page.
- Implementing the "Update" logic: Populating the "Edit" form and saving changes.
- Implementing the "Delete" logic: Removing files from the system via the Dashboard.

### Phase 4: Security & Authentication

- Creating a Login page.
- Implementing Session management (Express-session).
- Protecting all `/admin` routes with a middleware "Gatekeeper."

### Phase 5: Final Polish

- Date formatting (making "2024-08-07" look like "August 7, 2024").
- Error handling (404 pages for missing articles).
