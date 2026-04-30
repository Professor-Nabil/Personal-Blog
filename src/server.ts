import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import {
  initStorage,
  getAllArticles,
  getArticleById,
  saveArticle,
  deleteArticle,
} from "./services/storage.js";
import { Article } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-for-dev",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);

// Add this helpful TypeScript augmentation so the compiler knows about our custom session property
declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
  }
}

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

// --- Auth Routes ---

app.get("/login", (req, res) => {
  // If already logged in, skip the login page
  if (req.session.isLoggedIn) {
    return res.redirect("/admin/dashboard");
  }
  res.render("login", { title: "Login", error: null });
});

// --- Admin Routes ---

// 1. Dashboard
app.get("/admin/dashboard", async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      articles,
    });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 2. New Article (GET - The one that was missing/broken)
app.get("/admin/new", (req, res) => {
  res.render("admin/new", { title: "New Article" });
});

// 3. New Article (POST - Logic from Commit 3)
app.post("/admin/new", async (req, res) => {
  try {
    const { title, date, content } = req.body;

    // --- Basic Validation ---
    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return res
        .status(400)
        .send("Validation Error: Title and Content are required.");
    }

    const id = Date.now().toString();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const excerpt =
      content.length > 150 ? content.substring(0, 150) + "..." : content;

    const newArticle: Article = { id, title, slug, date, content, excerpt };
    await saveArticle(newArticle);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).send("Failed to create article.");
  }
});

// 4. Edit Article (GET)
app.get("/admin/edit/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (!article) return res.status(404).send("Article not found");

  res.render("admin/edit", {
    title: "Update Article",
    article,
  });
});

// 5. Update Article (POST)
app.post("/admin/edit/:id", async (req, res) => {
  try {
    const { title, date, content } = req.body;

    // --- Basic Validation ---
    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return res
        .status(400)
        .send("Validation Error: Title and Content are required.");
    }

    const { id } = req.params;

    // 1. Check if the article exists
    const existingArticle = await getArticleById(id);
    if (!existingArticle) {
      return res.status(404).send("Article not found");
    }

    // 2. Prepare the updated object
    // We keep the original ID and Slug, but update Title, Date, Content, and Excerpt
    const updatedArticle: Article = {
      ...existingArticle, // preserve id and slug
      title,
      date,
      content,
      excerpt:
        content.length > 150 ? content.substring(0, 150) + "..." : content,
    };

    // 3. Save (Overwrites the existing file)
    await saveArticle(updatedArticle);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).send("Failed to update article.");
  }
});

// 6. Delete Article (POST)
app.post("/admin/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Call the service to remove the file from src/data
    await deleteArticle(id);

    console.log(`🗑️ Article ${id} deleted successfully.`);

    // Redirect back to the dashboard to show the updated list
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).send("Failed to delete the article.");
  }
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
