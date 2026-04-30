# Personal Blog MVP

A lightweight, type-safe blog engine built with Node.js, Express, and EJS. This project uses a file-based JSON storage system, making it easy to deploy without a complex database setup.

## 🚀 Features

- **Public Feed**: View all articles sorted by date.
- **Admin Dashboard**: Secure CRUD (Create, Read, Update, Delete) operations.
- **Session Auth**: Password-protected admin area.
- **MVC Architecture**: Clean separation of Routes, Controllers, and Services.
- **Type Safety**: Built entirely with TypeScript.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Language**: TypeScript
- **Templates**: EJS
- **Styling**: Plain CSS
- **Testing**: Vitest + Supertest

## 📦 Setup & Installation

1. **Clone the repo**:

   ```bash
   git clone <your-repo-url>
   cd Personal-Blog
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your credentials.

   ```bash
   cp .env.example .env
   ```

4. **Run Development Mode**:

   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 🧪 Testing

Run the test suite using:

```bash
npm test
```

---

[Roadmap.sh](https://roadmap.sh/projects/personal-blog)
