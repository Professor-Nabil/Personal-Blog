import { Request, Response } from "express";
import { getAllArticles, getArticleById } from "../services/storage.js";

export const getHome = async (req: Request, res: Response) => {
  try {
    const articles = await getAllArticles();
    res.render("guest/home", { title: "Home", articles });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const getArticle = async (req: Request, res: Response) => {
  const article = await getArticleById(req.params.id as string);
  if (!article)
    return res.status(404).render("guest/404", { title: "Not Found" });
  res.render("guest/article", { title: article.title, article });
};

export const getLogin = (req: Request, res: Response) => {
  if (req.session.isLoggedIn) return res.redirect("/admin/dashboard");
  res.render("login", { title: "Login", error: null });
};

export const postLogin = (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect("/admin/dashboard"));
  } else {
    res.render("login", { title: "Login", error: "Invalid password." });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
