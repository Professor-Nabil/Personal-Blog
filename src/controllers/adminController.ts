import { Request, Response } from "express";
import {
  getAllArticles,
  getArticleById,
  saveArticle,
  deleteArticle,
} from "../services/storage.js";
import { Article } from "../types.js";

export const getDashboard = async (req: Request, res: Response) => {
  const articles = await getAllArticles();
  res.render("admin/dashboard", { title: "Admin Dashboard", articles });
};

export const getNewArticle = (req: Request, res: Response) => {
  res.render("admin/new", { title: "New Article" });
};

export const postNewArticle = async (req: Request, res: Response) => {
  const { title, date, content } = req.body;
  const id = Date.now().toString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const excerpt = content.substring(0, 150) + "...";

  const newArticle: Article = { id, title, slug, date, content, excerpt };
  await saveArticle(newArticle);
  res.redirect("/admin/dashboard");
};

export const getEditArticle = async (req: Request, res: Response) => {
  const article = await getArticleById(req.params.id as string);
  if (!article)
    return res.status(404).render("guest/404", { title: "Not Found" });
  res.render("admin/edit", { title: "Update Article", article });
};

export const postEditArticle = async (req: Request, res: Response) => {
  const existing = await getArticleById(req.params.id as string);
  if (!existing) return res.status(404).send("Not found");

  const updated: Article = {
    ...existing,
    ...req.body,
    excerpt: req.body.content.substring(0, 150) + "...",
  };
  await saveArticle(updated);
  res.redirect("/admin/dashboard");
};

export const postDeleteArticle = async (req: Request, res: Response) => {
  await deleteArticle(req.params.id as string);
  res.redirect("/admin/dashboard");
};
