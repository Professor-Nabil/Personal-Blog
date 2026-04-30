import { Router } from "express";
import * as guestController from "../controllers/guestController.js";

const router = Router();

router.get("/", guestController.getHome);
router.get("/article/:id", guestController.getArticle);
router.get("/login", guestController.getLogin);
router.post("/login", guestController.postLogin);
router.post("/logout", guestController.logout);

export default router;
