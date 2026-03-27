export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL || "https://media.nasbu.edu.ua";

export function getMediaUrl(filename: string): string {
  if (!filename) return "";
  // If already a full URL, return as-is
  if (filename.startsWith("http")) return filename;
  return `${MEDIA_BASE_URL}/uploads/${filename}`;
}
