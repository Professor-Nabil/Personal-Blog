import { Router } from "express";
import * as adminController from "../controllers/adminController.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

router.use(checkAuth);

router.get("/dashboard", adminController.getDashboard);
router.get("/new", adminController.getNewArticle);
router.post("/new", adminController.postNewArticle);
router.get("/edit/:id", adminController.getEditArticle);
router.post("/edit/:id", adminController.postEditArticle);
router.post("/delete/:id", adminController.postDeleteArticle);

export default router;
