import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  saveArticle,
  deleteArticle,
} from "../services/storage.js";
import { checkAuth } from "../middleware/auth.js";
import { Article } from "../types.js";

const router = Router();

// Apply checkAuth to ALL routes in this file
router.use(checkAuth);

// Dashboard
router.get("/dashboard", async (req, res) => {
  const articles = await getAllArticles();
  res.render("admin/dashboard", { title: "Admin Dashboard", articles });
});

// New Article (GET)
router.get("/new", (req, res) => {
  res.render("admin/new", { title: "New Article" });
});

// New Article (POST)
router.post("/new", async (req, res) => {
  const { title, date, content } = req.body;
  const id = Date.now().toString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const excerpt = content.substring(0, 150) + "...";

  const newArticle: Article = { id, title, slug, date, content, excerpt };
  await saveArticle(newArticle);
  res.redirect("/admin/dashboard");
});

// Edit Article (GET)
router.get("/edit/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (!article)
    return res.status(404).render("guest/404", { title: "Not Found" });
  res.render("admin/edit", { title: "Update Article", article });
});

// Update Article (POST)
router.post("/edit/:id", async (req, res) => {
  const existing = await getArticleById(req.params.id);
  if (!existing) return res.status(404).send("Not found");

  const updated: Article = {
    ...existing,
    ...req.body,
    excerpt: req.body.content.substring(0, 150) + "...",
  };
  await saveArticle(updated);
  res.redirect("/admin/dashboard");
});

// Delete Article
router.post("/delete/:id", async (req, res) => {
  await deleteArticle(req.params.id);
  res.redirect("/admin/dashboard");
});

export default router;
