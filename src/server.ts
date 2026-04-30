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

// ==============================================================================
// --- Middleware ---
import { Request, Response, NextFunction } from "express";
/**
 * The Gatekeeper: Checks if the user is authenticated.
 * If not, redirects to the login page.
 */
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    // User is authenticated, proceed to the next function
    return next();
  }
  // User is not authenticated, kick them back to login
  res.redirect("/login");
};
// ==============================================================================

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

app.post("/login", (req, res) => {
  const { password } = req.body;
  const masterPassword = process.env.ADMIN_PASSWORD;

  if (password === masterPassword) {
    // Grant access
    req.session.isLoggedIn = true;

    // Ensure the session is saved before redirecting
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/admin/dashboard");
    });
  } else {
    // Deny access
    res.render("login", {
      title: "Login",
      error: "Invalid password. Please try again.",
    });
  }
});

// --- Admin Routes ---

// 1. Dashboard
app.get("/admin/dashboard", checkAuth, async (req, res) => {
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
app.get("/admin/new", checkAuth, (req, res) => {
  res.render("admin/new", { title: "New Article" });
});

// 3. New Article (POST - Logic from Commit 3)
app.post("/admin/new", checkAuth, async (req, res) => {
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
app.get("/admin/edit/:id", checkAuth, async (req, res) => {
  const article = await getArticleById(req.params.id as string);
  // ├╴  Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
  // │      Type 'string[]' is not assignable to type 'string'. ts (2345) [187, 40]
  if (!article) return res.status(404).send("Article not found");

  res.render("admin/edit", {
    title: "Update Article",
    article,
  });
});

// 5. Update Article (POST)
app.post("/admin/edit/:id", checkAuth, async (req, res) => {
  try {
    const { title, date, content } = req.body;

    // --- Basic Validation ---
    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return res
        .status(400)
        .send("Validation Error: Title and Content are required.");
    }

    const id = req.params.id as string;

    // 1. Check if the article exists
    const existingArticle = await getArticleById(id);
    // ├╴  Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
    // │      Type 'string[]' is not assignable to type 'string'. ts (2345) [213, 50]
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
app.post("/admin/delete/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id as string;

    // Call the service to remove the file from src/data
    await deleteArticle(id);
    // ├╴  Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
    // │      Type 'string[]' is not assignable to type 'string'. ts (2345) [247, 25]

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
