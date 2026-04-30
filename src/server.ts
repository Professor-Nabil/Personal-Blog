import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
// Added getArticleById to the imports
import {
  initStorage,
  getAllArticles,
  getArticleById,
} from "./services/storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Guest Routes ---

app.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.render("guest/home", { title: "Home", articles });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Logic for Single Article Page
app.get("/article/:id", async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).render("guest/article", {
        title: "Not Found",
        article: null,
      });
    }

    res.render("guest/article", {
      title: article.title,
      article,
    });
  } catch (error) {
    console.error("Error loading article:", error);
    res.status(500).send("Internal Server Error");
  }
});

// --- Admin Routes (Still using mock data temporarily for the dashboard) ---
// We will fix the Admin Dashboard in the next commit

app.get("/admin/dashboard", async (req, res) => {
  // We'll update this properly in Commit 6, but let's make it real now
  const articles = await getAllArticles();
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    articles,
  });
});

app.get("/admin/new", (req, res) => {
  res.render("admin/new", { title: "New Article" });
});

app.get("/admin/edit/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
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
