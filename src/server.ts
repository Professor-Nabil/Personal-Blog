import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic Test Route
app.get("/", (req, res) => {
  // We'll point this to guest/home later, but for now, let's just test.
  res.send(
    "<h1>Blog Server is Live! 🚀</h1><p>Express and ESM are working perfectly.</p>",
  );
});

app.listen(PORT, () => {
  console.log(`
    ========================================
    🟢 Server is running on port ${PORT}
    🔗 URL: http://localhost:${PORT}
    ========================================
    `);
});
