import { Router } from "express";
import { getAllArticles, getArticleById } from "../services/storage.js";

const router = Router();

// Home Page
router.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.render("guest/home", { title: "Home", articles });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Single Article
router.get("/article/:id", async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).render("guest/404", { title: "Page Not Found" });
    }
    res.render("guest/article", { title: article.title, article });
  } catch (error) {
    console.error("Error loading article:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Login Page
router.get("/login", (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/admin/dashboard");
  res.render("login", { title: "Login", error: null });
});

// Login POST
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect("/admin/dashboard"));
  } else {
    res.render("login", { title: "Login", error: "Invalid password." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

export default router;
