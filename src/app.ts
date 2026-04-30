import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { formatDate } from "./utils/formatters.js";
import guestRoutes from "./routes/guest.js";
import adminRoutes from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.locals.formatDate = formatDate;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  }),
);

app.use("/", guestRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).render("guest/404", { title: "Page Not Found" });
});

export default app; // Export the app for testing
