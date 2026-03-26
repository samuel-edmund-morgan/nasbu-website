# Content Directory

Ця директорія містить весь контент сайту у форматі Markdown з YAML frontmatter.

## Структура

- `news/` — новини (867 записів з діючого сайту + нові)
- `pages/` — статичні сторінки (200 записів)
- `galleries/` — фотогалереї (54 записів)

## Формат файлу новини

```markdown
---
title_ua: "Заголовок українською"
title_en: "Title in English"
date: "2025-01-15"
excerpt_ua: "Короткий опис"
excerpt_en: "Short description"
image: "https://r2-url/path/to/image.jpg"
category: 1
hide: false
translation_needed: false
---

<!-- UA Content -->
Текст новини українською...

<!-- EN Content -->
News text in English...
```

## Двомовність

Кожен файл містить контент обома мовами (UA + EN). Файли з порожнім EN контентом мають прапорець `translation_needed: true`.
