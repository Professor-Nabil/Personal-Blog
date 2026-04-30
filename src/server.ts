import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import { Article } from "./types.js";
import { initStorage } from "./services/storage.js";
import { getAllArticles } from "./services/storage.js";

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

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    slug: "getting-started-with-typescript",
    date: "2026-04-20",
    content: "Full content here...",
    excerpt: "Learning how to use types in Node.js...",
  },
  {
    id: "2",
    title: "Why I love Neovim",
    slug: "why-i-love-neovim",
    date: "2026-04-25",
    content: "Full content here...",
    excerpt: "Exploring the best PDE for backend developers...",
  },
];

// --- Guest Routes ---
app.get("/", async (req, res) => {
  try {
    // Replace mockArticles with the real service call
    const articles = await getAllArticles();

    res.render("guest/home", {
      title: "Home",
      articles,
    });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/article/:id", (req, res) => {
  const article = mockArticles.find((a) => a.id === req.params.id);
  res.render("guest/article", {
    title: article?.title || "Not Found",
    article,
  });
});

app.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    articles: mockArticles,
  });
});

app.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    articles: mockArticles,
  });
});

app.get("/admin/new", (req, res) => {
  res.render("admin/new", { title: "New Article" });
});

app.get("/admin/edit/:id", (req, res) => {
  const article = mockArticles.find((a) => a.id === req.params.id);
  res.render("admin/edit", {
    title: "Update Article",
    article,
  });
});

// Initialize storage and then start server
initStorage()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🟢 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize storage:", err);
    process.exit(1);
  });
