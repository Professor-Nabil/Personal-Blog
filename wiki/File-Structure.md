# 📂 File-Structure.md

```text
.
├── data/               # Your "Database" (JSON files go here)
├── public/             # CSS & Images
├── src/
│   ├── routes/
│   │   ├── guest.ts    # Public routes
│   │   └── admin.ts    # Protected routes
│   ├── services/
│   │   └── storage.ts  # The logic for reading/writing JSON files
│   ├── middleware/
│   │   └── auth.ts     # Security check for admin pages
│   ├── views/          # EJS Templates
│   │   ├── partials/
│   │   ├── admin/      # Dashboard, Edit, New
│   │   └── guest/      # Home, Article
│   └── server.ts       # Entry point
├── PLAN.md
├── TODO.md
└── package.json
```
