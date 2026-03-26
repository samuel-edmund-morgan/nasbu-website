import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NewsItem {
  slug: string;
  id: number;
  title_uk: string;
  title_en: string;
  date: string;
  excerpt_uk: string;
  excerpt_en: string;
  content_uk: string;
  content_en: string;
  image: string;
  images: string[];
  category: number;
  hide: boolean;
  views: number;
  important: boolean;
  highlight: boolean;
  translation_needed: boolean;
}

const newsDirectory = path.join(process.cwd(), "content", "news");

let cachedNews: NewsItem[] | null = null;

function parseMarkdownContent(content: string): {
  content_uk: string;
  content_en: string;
} {
  const uaMarker = "<!-- UA -->";
  const enMarker = "<!-- EN -->";

  let content_uk = "";
  let content_en = "";

  const uaIndex = content.indexOf(uaMarker);
  const enIndex = content.indexOf(enMarker);

  if (uaIndex !== -1 && enIndex !== -1) {
    content_uk = content
      .substring(uaIndex + uaMarker.length, enIndex)
      .trim();
    content_en = content.substring(enIndex + enMarker.length).trim();
  } else if (uaIndex !== -1) {
    content_uk = content.substring(uaIndex + uaMarker.length).trim();
  } else {
    // No markers — treat the whole body as Ukrainian
    content_uk = content.trim();
  }

  return { content_uk, content_en };
}

export function getAllNews(): NewsItem[] {
  if (cachedNews) return cachedNews;

  const fileNames = fs.readdirSync(newsDirectory).filter((f) => f.endsWith(".md"));

  const allNews: NewsItem[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { content_uk, content_en } = parseMarkdownContent(content);

    return {
      slug,
      id: data.id ?? 0,
      title_uk: data.title_uk ?? "",
      title_en: data.title_en ?? "",
      date: data.date ?? "",
      excerpt_uk: data.excerpt_uk ?? "",
      excerpt_en: data.excerpt_en ?? "",
      content_uk,
      content_en,
      image: data.image ?? "",
      images: data.images ?? [],
      category: data.category ?? 0,
      hide: data.hide ?? false,
      views: data.views ?? 0,
      important: data.important ?? false,
      highlight: data.highlight ?? false,
      translation_needed: data.translation_needed ?? false,
    };
  });

  // Sort by date descending
  allNews.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  cachedNews = allNews;
  return allNews;
}

export function getVisibleNews(): NewsItem[] {
  return getAllNews().filter((item) => !item.hide);
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((item) => item.slug === slug);
}

export function getLatestNews(count: number): NewsItem[] {
  return getVisibleNews().slice(0, count);
}
