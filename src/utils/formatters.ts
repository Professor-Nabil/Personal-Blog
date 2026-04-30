/**
 * Converts a date string (YYYY-MM-DD) into a human-friendly format.
 * Example: "2024-08-07" -> "August 7, 2024"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat for a professional, localized look
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
