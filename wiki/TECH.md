# TECH.md | Personal Blog

### Core Stack

- **Runtime**: Node.js
- **Language**: TypeScript (Strict Mode)
- **Web Framework**: Express.js
- **View Engine**: EJS (Embedded JavaScript)
- **Styling**: Pure CSS3 (Focusing on a clean, typography-heavy blog look)

### Storage (The "No-DB" Approach)

- **Filesystem (fs/promises)**: To store articles as `.json` files.
- **JSON**: Data format for articles (id, title, content, date).
- **Slugification**: Logic to turn "My First Post" into `my-first-post.json`.

### Security & Session

- **Express-session**: To handle admin login states.
- **Bcrypt**: For hashing the admin password (even if hardcoded, we do it the right way).
- **Middleware**: Custom `isAuthenticated` gatekeeper.
