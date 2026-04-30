import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Article } from "../types.js";

// Resolve paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the absolute path to our data folder
// It's located at project_root/src/data
const DATA_DIR = path.join(__dirname, "../data");

/**
 * Ensures the data directory exists.
 * If it doesn't, it creates it to prevent "folder not found" errors.
 */
export const initStorage = async (): Promise<void> => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    console.log("📂 Data directory missing. Creating it now...");
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

/**
 * Helper to get the full path for a specific article file
 */
export const getFilePath = (id: string): string => {
  return path.join(DATA_DIR, `${id}.json`);
};

/**
 * Reads all JSON files in the data directory and returns an array of Articles.
 */
export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const filenames = await fs.readdir(DATA_DIR);

    // Filter to ensure we only try to read .json files
    const jsonFiles = filenames.filter((file) => file.endsWith(".json"));

    const articles = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(DATA_DIR, file);
        const content = await fs.readFile(filePath, "utf-8");
        return JSON.parse(content) as Article;
      }),
    );

    // Sort by date: Newest first (Descending order)
    return articles.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error reading articles from disk:", error);
    return [];
  }
};

/**
 * Fetches a single article by its ID.
 * Returns null if the article is not found or the file is corrupted.
 */
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const filePath = getFilePath(id);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as Article;
  } catch (error) {
    // We treat "file not found" as a null return rather than a crash
    console.error(`Could not find article with ID: ${id}`);
    return null;
  }
};
