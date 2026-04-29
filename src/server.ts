import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mock data (we'll move this to a service later)
const mockArticles = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    date: "2026-04-20",
    excerpt: "Learning how to use types in Node.js...",
  },
  {
    id: "2",
    title: "Why I love Neovim",
    date: "2026-04-25",
    excerpt: "Exploring the best PDE for backend developers...",
  },
];

// --- Guest Routes ---
app.get("/", (req, res) => {
  res.render("guest/home", { title: "Home", articles: mockArticles });
});

app.get("/article/:id", (req, res) => {
  const article = mockArticles.find((a) => a.id === req.params.id);
  res.render("guest/article", {
    title: article?.title || "Not Found",
    article,
  });
});

// --- Admin Routes ---
app.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    articles: mockArticles,
  });
});

// ... app.listen remains the same

app.listen(PORT, () => {
  console.log(`
    ========================================
    🟢 Server is running on port ${PORT}
    🔗 URL: http://localhost:${PORT}
    ========================================
    `);
});
