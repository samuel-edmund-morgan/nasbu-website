#!/usr/bin/env python3
"""Convert extracted news from news.json into Markdown files for Next.js static site."""

import json
import os
import re
import html
from datetime import datetime

# --- Configuration ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "content", "news")
DATA_DIR = os.path.join(SCRIPT_DIR, "output")

# --- Ukrainian transliteration map ---
UA_TRANSLIT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'yu', 'я': 'ya', '\u0027': '', '\u2019': '',
    '\u00ab': '', '\u00bb': '', '\u2013': '-', '\u2014': '-',
}
# Add uppercase versions
UA_TRANSLIT.update({k.upper(): v.capitalize() if len(v) > 1 else v.upper()
                     for k, v in UA_TRANSLIT.items() if k.isalpha()})


def transliterate(text):
    """Transliterate Ukrainian text to Latin characters."""
    result = []
    for ch in text:
        if ch in UA_TRANSLIT:
            result.append(UA_TRANSLIT[ch])
        elif ch.isascii():
            result.append(ch)
        else:
            result.append('')
    return ''.join(result)


def make_slug(title, max_len=80):
    """Generate a URL-friendly slug from a Ukrainian title."""
    if not title.strip():
        return 'untitled'
    slug = transliterate(title).lower()
    # Replace spaces and non-alphanumeric with hyphens
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    # Collapse multiple hyphens
    slug = re.sub(r'-+', '-', slug)
    # Trim hyphens from ends
    slug = slug.strip('-')
    # Truncate
    if len(slug) > max_len:
        slug = slug[:max_len].rstrip('-')
    return slug or 'untitled'


def escape_yaml_string(s):
    """Escape a string for YAML double-quoted value."""
    if not s:
        return '""'
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    s = s.replace('\n', ' ')
    s = s.replace('\r', '')
    s = s.strip()
    return f'"{s}"'


# --- HTML to Markdown conversion ---

def decode_entities(text):
    """Decode HTML entities."""
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&amp;', '&')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    text = text.replace('&quot;', '"')
    text = text.replace('&laquo;', '\u00ab')
    text = text.replace('&raquo;', '\u00bb')
    text = text.replace('&ndash;', '\u2013')
    text = text.replace('&mdash;', '\u2014')
    text = text.replace('&rsquo;', '\u2019')
    text = text.replace('&lsquo;', '\u2018')
    text = text.replace('&rdquo;', '\u201d')
    text = text.replace('&ldquo;', '\u201c')
    # Decode any remaining numeric entities
    text = html.unescape(text)
    return text


def html_to_markdown(html_text):
    """Convert HTML content to Markdown."""
    if not html_text:
        return ''

    text = html_text

    # Normalize line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')

    # Check if content contains <table> - keep tables as HTML
    has_table = bool(re.search(r'<table', text, re.IGNORECASE))

    # Handle tables: extract them and keep as-is
    table_placeholders = {}
    if has_table:
        table_pattern = re.compile(r'(<table[\s\S]*?</table>)', re.IGNORECASE)
        for i, match in enumerate(table_pattern.finditer(text)):
            placeholder = f'__TABLE_PLACEHOLDER_{i}__'
            table_placeholders[placeholder] = match.group(1)
            text = text.replace(match.group(1), placeholder, 1)

    # Handle images before stripping tags
    text = re.sub(r'<img\s+[^>]*src=["\']([^"\']*)["\'][^>]*/?>',
                  r'![](\1)', text, flags=re.IGNORECASE)

    # Handle links
    text = re.sub(r'<a\s+[^>]*href=["\']([^"\']*)["\'][^>]*>([\s\S]*?)</a>',
                  r'[\2](\1)', text, flags=re.IGNORECASE)

    # Handle headings
    for level in range(6, 0, -1):
        tag = f'h{level}'
        hashes = '#' * level
        text = re.sub(
            rf'<{tag}[^>]*>([\s\S]*?)</{tag}>',
            rf'\n\n{hashes} \1\n\n',
            text,
            flags=re.IGNORECASE
        )

    # Bold
    text = re.sub(r'<(strong|b)>([\s\S]*?)</\1>', r'**\2**', text, flags=re.IGNORECASE)
    text = re.sub(r'<(strong|b)\s[^>]*>([\s\S]*?)</\1>', r'**\2**', text, flags=re.IGNORECASE)

    # Italic
    text = re.sub(r'<(em|i)>([\s\S]*?)</\1>', r'*\2*', text, flags=re.IGNORECASE)
    text = re.sub(r'<(em|i)\s[^>]*>([\s\S]*?)</\1>', r'*\2*', text, flags=re.IGNORECASE)

    # Handle lists
    # Unordered lists
    text = re.sub(r'<ul[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</ul>', '\n', text, flags=re.IGNORECASE)
    # Ordered lists
    text = re.sub(r'<ol[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</ol>', '\n', text, flags=re.IGNORECASE)
    # List items - use bullet points for simplicity
    text = re.sub(r'<li[^>]*>([\s\S]*?)</li>', r'\n- \1', text, flags=re.IGNORECASE)

    # Handle <br> variants
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)

    # Handle <p> tags
    text = re.sub(r'<p[^>]*>', '\n\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</p>', '\n\n', text, flags=re.IGNORECASE)

    # Handle <div> tags
    text = re.sub(r'<div[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</div>', '\n', text, flags=re.IGNORECASE)

    # Handle <blockquote>
    text = re.sub(r'<blockquote[^>]*>([\s\S]*?)</blockquote>',
                  lambda m: '\n' + '\n'.join('> ' + line for line in m.group(1).strip().split('\n')) + '\n',
                  text, flags=re.IGNORECASE)

    # Handle <hr>
    text = re.sub(r'<hr\s*/?>', '\n\n---\n\n', text, flags=re.IGNORECASE)

    # Strip remaining HTML tags (but keep content)
    text = re.sub(r'<[^>]+>', '', text)

    # Decode HTML entities
    text = decode_entities(text)

    # Restore table placeholders
    for placeholder, table_html in table_placeholders.items():
        text = text.replace(placeholder, f'\n\n{table_html}\n\n')

    # Clean up whitespace
    # Collapse multiple blank lines to two newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove trailing whitespace per line
    text = '\n'.join(line.rstrip() for line in text.split('\n'))
    text = text.strip()

    return text


def main():
    # Load data
    with open(os.path.join(DATA_DIR, 'news.json'), 'r', encoding='utf-8') as f:
        news_items = json.load(f)

    with open(os.path.join(DATA_DIR, 'files.json'), 'r', encoding='utf-8') as f:
        files = json.load(f)

    with open(os.path.join(DATA_DIR, 'news_categories.json'), 'r', encoding='utf-8') as f:
        news_categories = json.load(f)

    # Build file lookup: news_id -> list of files
    news_files = {}
    for f_item in files:
        if f_item.get('module') == 'news' and f_item.get('img') == 1:
            nid = f_item['module_id']
            if nid not in news_files:
                news_files[nid] = []
            news_files[nid].append(f_item)

    # Build category lookup: news_id -> list of page_ids
    news_cat_pages = {}
    for cat in news_categories:
        nid = cat['news_id']
        if nid not in news_cat_pages:
            news_cat_pages[nid] = []
        news_cat_pages[nid].append(cat['page_id'])

    # Ensure output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Track slug usage for deduplication
    used_filenames = {}

    # Stats
    total = 0
    with_en = 0
    without_en = 0
    hidden_count = 0
    dates = []

    for news in news_items:
        nid = news['id']
        ua_title = news.get('ua_title', '') or ''
        en_title = news.get('en_title', '') or ''
        ua_text = news.get('ua_text', '') or ''
        en_text = news.get('en_text', '') or ''
        ua_desc = news.get('ua_description', '') or ''
        en_desc = news.get('en_description', '') or ''
        date_publish = news.get('date_publish', '')
        category = news.get('category', 0)
        is_hidden = news.get('hide', 0) == 1
        views = news.get('view', 0)
        important = news.get('important', 0) == 1
        highlight = news.get('highlight', 0) == 1

        # Handle date
        if date_publish.startswith('0000'):
            # No valid date and no add_date field - skip this item
            continue

        try:
            dt = datetime.strptime(date_publish, '%Y-%m-%d %H:%M:%S')
            date_str = dt.strftime('%Y-%m-%d')
        except (ValueError, TypeError):
            continue

        # Generate slug
        slug = make_slug(ua_title)

        # Build filename with deduplication
        base_filename = f"{date_str}-{slug}"
        filename = base_filename
        counter = 2
        while filename in used_filenames:
            filename = f"{base_filename}-{counter}"
            counter += 1
        used_filenames[filename] = True

        # Get associated files/images
        item_files = news_files.get(nid, [])
        # Sort by priority
        item_files.sort(key=lambda x: x.get('priority', 999))
        image_links = [f_item['link'] for f_item in item_files]
        main_image = image_links[0] if image_links else ''

        # Get category pages
        cat_pages = news_cat_pages.get(nid, [])

        # Determine translation_needed
        translation_needed = (not en_title.strip()) and (not en_text.strip())

        # Convert HTML to markdown
        ua_md = html_to_markdown(ua_text)
        en_md = html_to_markdown(en_text)

        # Build frontmatter
        images_yaml = json.dumps(image_links, ensure_ascii=False) if image_links else '[]'
        cat_pages_yaml = json.dumps(cat_pages) if cat_pages else '[]'

        frontmatter = f"""---
id: {nid}
title_uk: {escape_yaml_string(ua_title)}
title_en: {escape_yaml_string(en_title)}
date: "{date_str}"
excerpt_uk: {escape_yaml_string(ua_desc)}
excerpt_en: {escape_yaml_string(en_desc)}
image: "{main_image}"
images: {images_yaml}
category: {category}
categories_pages: {cat_pages_yaml}
hide: {'true' if is_hidden else 'false'}
views: {views}
important: {'true' if important else 'false'}
highlight: {'true' if highlight else 'false'}
translation_needed: {'true' if translation_needed else 'false'}
---"""

        # Build body
        body_parts = ['<!-- UA -->', ua_md, '', '<!-- EN -->', en_md]
        body = '\n'.join(body_parts)

        # Write file
        filepath = os.path.join(OUTPUT_DIR, f"{filename}.md")
        with open(filepath, 'w', encoding='utf-8') as out:
            out.write(frontmatter + '\n\n' + body + '\n')

        # Update stats
        total += 1
        if is_hidden:
            hidden_count += 1
        if translation_needed:
            without_en += 1
        else:
            with_en += 1
        dates.append(date_str)

    # Print stats
    dates.sort()
    print(f"{'='*50}")
    print(f"News to Markdown Conversion Complete")
    print(f"{'='*50}")
    print(f"Total files created:        {total}")
    print(f"With EN translation:        {with_en}")
    print(f"Without EN (needs transl.): {without_en}")
    print(f"Hidden:                     {hidden_count}")
    print(f"Date range:                 {dates[0]} to {dates[-1]}")
    print(f"{'='*50}")


if __name__ == '__main__':
    main()
