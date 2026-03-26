# Національна академія Служби безпеки України — Офіційний вебсайт

Статичний двомовний (UA/EN) вебсайт на базі Next.js, хостинг на Cloudflare Pages.

## Архітектура

- **Фронтенд**: Next.js 14 (static export) + Tailwind CSS + TypeScript
- **Хостинг**: Cloudflare Pages (автодеплой при push в main)
- **Медіафайли**: Cloudflare R2 (PDF, зображення)
- **Контент**: Markdown файли з YAML frontmatter у `content/`
- **Адмінка**: Windows EXE (Tauri) — окремий проєкт

## Структура

```
├── app/              # Next.js pages (App Router)
├── components/       # React компоненти
├── content/          # Контент сайту (Markdown)
│   ├── news/         # Новини
│   ├── pages/        # Статичні сторінки
│   └── galleries/    # Фотогалереї
├── data/             # Конфігурація сайту (JSON/TS)
├── public/           # Статичні файли (logo, video)
└── scripts/          # Утиліти для міграції контенту
```

## Розробка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Static export → out/
```

## Деплой

Push в `main` → Cloudflare Pages автоматично білдить і деплоїть на `new.nasbu.edu.ua`.

## Ліцензія

© Національна академія Служби безпеки України
