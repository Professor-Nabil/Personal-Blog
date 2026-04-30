export interface Article {
  id: string; // Unique identifier (UUID or timestamp)
  title: string; // The display title
  slug: string; // URL-friendly version of title (e.g., "my-first-post")
  date: string; // ISO format string (YYYY-MM-DD)
  content: string; // The full text of the article
  excerpt: string; // A short summary for the home page
}
