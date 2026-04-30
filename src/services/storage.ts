import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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
