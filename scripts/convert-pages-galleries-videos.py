#!/usr/bin/env python3
"""
Convert extracted pages, galleries, and videos from JSON to Markdown/JSON files
for the Next.js static site.
"""

import json
import os
import re
import html
from collections import defaultdict

# ─── Paths ───────────────────────────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = os.path.join(SCRIPT_DIR, "output")
CONTENT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "content")

PAGES_DIR = os.path.join(CONTENT_DIR, "pages")
GALLERIES_DIR = os.path.join(CONTENT_DIR, "galleries")
VIDEOS_DIR = os.path.join(CONTENT_DIR, "videos")

# ─── Transliteration ────────────────────────────────────────────────────────

TRANSLIT_MAP = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'yu', 'я': 'ya',
    "'": '', "\u02bc": '',  # apostrophe, ʼ
}

# Add uppercase variants
for k, v in list(TRANSLIT_MAP.items()):
    if k.isalpha():
        TRANSLIT_MAP[k.upper()] = v.capitalize() if v else ''


def transliterate(text):
    """Transliterate Ukrainian text to Latin slug."""
    result = []
    for ch in text:
        if ch in TRANSLIT_MAP:
            result.append(TRANSLIT_MAP[ch])
        else:
            result.append(ch)
    return ''.join(result)


def slugify(title):
    """Create a URL-friendly slug from a Ukrainian title."""
    if not title:
        return ''
    text = transliterate(title.lower())
    # Replace non-alphanumeric with hyphens
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    # Collapse multiple hyphens
    text = re.sub(r'-+', '-', text)
    return text


# ─── HTML → Markdown ────────────────────────────────────────────────────────

def html_to_markdown(html_str):
    """Convert HTML string to Markdown."""
    if not html_str:
        return ''

    text = html_str

    # Normalize line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')

    # Handle headings h1-h6
    for i in range(1, 7):
        prefix = '#' * i
        text = re.sub(
            rf'<h{i}[^>]*>(.*?)</h{i}>',
            lambda m, p=prefix: f'\n{p} {m.group(1).strip()}\n',
            text, flags=re.DOTALL | re.IGNORECASE
        )

    # Handle <br> / <br/>
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)

    # Handle bold
    text = re.sub(r'<(?:strong|b)>(.*?)</(?:strong|b)>', r'**\1**', text, flags=re.DOTALL | re.IGNORECASE)

    # Handle italic
    text = re.sub(r'<(?:em|i)>(.*?)</(?:em|i)>', r'*\1*', text, flags=re.DOTALL | re.IGNORECASE)

    # Handle links
    text = re.sub(
        r'<a\s[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>',
        r'[\2](\1)',
        text, flags=re.DOTALL | re.IGNORECASE
    )

    # Handle images
    text = re.sub(
        r'<img\s[^>]*src=["\']([^"\']*)["\'][^>]*/?>',
        r'![](\1)',
        text, flags=re.IGNORECASE
    )

    # Handle unordered lists
    def convert_ul(match):
        content = match.group(1)
        items = re.findall(r'<li[^>]*>(.*?)</li>', content, flags=re.DOTALL | re.IGNORECASE)
        lines = []
        for item in items:
            item_text = re.sub(r'<[^>]+>', '', item).strip()
            lines.append(f'- {item_text}')
        return '\n' + '\n'.join(lines) + '\n'

    text = re.sub(r'<ul[^>]*>(.*?)</ul>', convert_ul, text, flags=re.DOTALL | re.IGNORECASE)

    # Handle ordered lists
    def convert_ol(match):
        content = match.group(1)
        items = re.findall(r'<li[^>]*>(.*?)</li>', content, flags=re.DOTALL | re.IGNORECASE)
        lines = []
        for idx, item in enumerate(items, 1):
            item_text = re.sub(r'<[^>]+>', '', item).strip()
            lines.append(f'{idx}. {item_text}')
        return '\n' + '\n'.join(lines) + '\n'

    text = re.sub(r'<ol[^>]*>(.*?)</ol>', convert_ol, text, flags=re.DOTALL | re.IGNORECASE)

    # Handle paragraphs
    text = re.sub(r'<p[^>]*>(.*?)</p>', lambda m: f'\n{m.group(1).strip()}\n', text, flags=re.DOTALL | re.IGNORECASE)

    # Keep tables as HTML (don't strip)
    # Strip all remaining tags EXCEPT table-related ones
    text = re.sub(r'<(?!/?(?:table|thead|tbody|tfoot|tr|th|td)\b)[^>]+>', '', text, flags=re.IGNORECASE)

    # Decode HTML entities
    text = html.unescape(text)

    # Clean up excessive blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()

    return text


# ─── YAML helpers ────────────────────────────────────────────────────────────

def yaml_str(value):
    """Format a value for YAML frontmatter."""
    if value is None:
        return '""'
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        if not value:
            return '[]'
        items = ', '.join(f'"{v}"' if isinstance(v, str) else str(v) for v in value)
        return f'[{items}]'
    # String - decode HTML entities and quote it
    s = html.unescape(str(value))
    s = s.replace('\\', '\\\\').replace('"', '\\"')
    return f'"{s}"'


def needs_translation(en_title, en_text):
    """Check if English translation is missing or empty."""
    has_en = bool((en_title or '').strip()) or bool((en_text or '').strip())
    return not has_en


# ─── Load data ───────────────────────────────────────────────────────────────

def load_json(filename):
    path = os.path.join(INPUT_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def build_files_index(files_data, module):
    """Build a dict: module_id -> { images: [...], files: [...] }"""
    index = defaultdict(lambda: {'images': [], 'files': []})
    for f in files_data:
        if f.get('module') != module:
            continue
        mid = f['module_id']
        if f.get('img') == 1:
            index[mid]['images'].append(f['link'])
        else:
            index[mid]['files'].append(f['link'])
    return index


# ─── Convert Pages ──────────────────────────────────────────────────────────

def convert_pages(pages, files_index):
    os.makedirs(PAGES_DIR, exist_ok=True)
    count = 0
    slug_counts = {}

    for page in pages:
        pid = page['id']
        ua_title = page.get('ua_title', '') or ''
        en_title = page.get('en_title', '') or ''
        slug = slugify(ua_title) if ua_title else f'page-{pid}'

        # Handle duplicate slugs
        if slug in slug_counts:
            slug_counts[slug] += 1
            slug = f'{slug}-{slug_counts[slug]}'
        else:
            slug_counts[slug] = 0

        page_files = files_index.get(pid, {'images': [], 'files': []})

        ua_text = page.get('ua_text', '') or ''
        en_text = page.get('en_text', '') or ''

        frontmatter = [
            '---',
            f'id: {pid}',
            f'title_uk: {yaml_str(ua_title)}',
            f'title_en: {yaml_str(en_title)}',
            f'seo_title_uk: {yaml_str(page.get("ua_seotitle", ""))}',
            f'seo_title_en: {yaml_str(page.get("en_seotitle", ""))}',
            f'description_uk: {yaml_str(page.get("ua_description", ""))}',
            f'description_en: {yaml_str(page.get("en_description", ""))}',
            f'page: {yaml_str(page.get("page", ""))}',
            f'rel: {page.get("rel", 0)}',
            f'menu: {page.get("menu", 0)}',
            f'type: {page.get("type", 0)}',
            f'copy: {page.get("copy", 0)}',
            f'priority: {page.get("priority", 0)}',
            f'hide: {yaml_str(bool(page.get("hide", 0)))}',
            f'url: {yaml_str(page.get("url", ""))}',
            f'sub_page: {page.get("sub_page", 0)}',
            f'fullwidth: {page.get("fullwidth", 0)}',
            f'news_category: {page.get("news_category", 0)}',
            f'images: {yaml_str(page_files["images"])}',
            f'files: {yaml_str(page_files["files"])}',
            f'translation_needed: {yaml_str(needs_translation(en_title, en_text))}',
            '---',
        ]

        body_parts = []
        ua_md = html_to_markdown(ua_text)
        en_md = html_to_markdown(en_text)

        if ua_md:
            body_parts.append('<!-- UA -->')
            body_parts.append(ua_md)

        if en_md:
            body_parts.append('')
            body_parts.append('<!-- EN -->')
            body_parts.append(en_md)

        content = '\n'.join(frontmatter) + '\n'
        if body_parts:
            content += '\n' + '\n'.join(body_parts) + '\n'

        filepath = os.path.join(PAGES_DIR, f'{slug}.md')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

    return count


# ─── Convert Galleries ──────────────────────────────────────────────────────

def convert_galleries(galleries, files_index, categories_map):
    os.makedirs(GALLERIES_DIR, exist_ok=True)
    count = 0

    for gallery in galleries:
        gid = gallery['id']
        ua_title = gallery.get('ua_title', '') or ''
        en_title = gallery.get('en_title', '') or ''

        date_str = (gallery.get('date_publish', '') or '')[:10]
        if not date_str:
            date_str = '1970-01-01'

        slug = slugify(ua_title) if ua_title else f'gallery-{gid}'
        filename = f'{date_str}-{slug}'

        gallery_files = files_index.get(gid, {'images': [], 'files': []})
        categories_pages = categories_map.get(gid, [])

        ua_text = gallery.get('ua_text', '') or ''
        en_text = gallery.get('en_text', '') or ''

        frontmatter = [
            '---',
            f'id: {gid}',
            f'title_uk: {yaml_str(ua_title)}',
            f'title_en: {yaml_str(en_title)}',
            f'date: {yaml_str(date_str)}',
            f'category: {gallery.get("category", 0)}',
            f'categories_pages: {yaml_str(categories_pages)}',
            f'description_uk: {yaml_str(gallery.get("ua_description", ""))}',
            f'description_en: {yaml_str(gallery.get("en_description", ""))}',
            f'images: {yaml_str(gallery_files["images"])}',
            f'hide: {yaml_str(bool(gallery.get("hide", 0)))}',
            f'translation_needed: {yaml_str(needs_translation(en_title, en_text))}',
            '---',
        ]

        body_parts = []
        ua_md = html_to_markdown(ua_text)
        en_md = html_to_markdown(en_text)

        if ua_md:
            body_parts.append('<!-- UA -->')
            body_parts.append(ua_md)

        if en_md:
            body_parts.append('')
            body_parts.append('<!-- EN -->')
            body_parts.append(en_md)

        content = '\n'.join(frontmatter) + '\n'
        if body_parts:
            content += '\n' + '\n'.join(body_parts) + '\n'

        filepath = os.path.join(GALLERIES_DIR, f'{filename}.md')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

    return count


# ─── Convert Videos ──────────────────────────────────────────────────────────

def convert_videos(videos):
    os.makedirs(VIDEOS_DIR, exist_ok=True)
    count = 0

    for video in videos:
        vid = video['id']
        ua_title = video.get('ua_title', '') or ''
        en_title = video.get('en_title', '') or ''

        date_str = (video.get('date_publish', '') or '')[:10]
        if not date_str:
            date_str = '1970-01-01'

        slug = slugify(ua_title) if ua_title else f'video-{vid}'
        filename = f'{date_str}-{slug}'

        ua_text = video.get('ua_text', '') or ''
        en_text = video.get('en_text', '') or ''

        frontmatter = [
            '---',
            f'id: {vid}',
            f'title_uk: {yaml_str(ua_title)}',
            f'title_en: {yaml_str(en_title)}',
            f'date: {yaml_str(date_str)}',
            f'description_uk: {yaml_str(video.get("ua_description", ""))}',
            f'description_en: {yaml_str(video.get("en_description", ""))}',
            f'category: {video.get("category", 0)}',
            f'src: {yaml_str(video.get("src", ""))}',
            f'hide: {yaml_str(bool(video.get("hide", 0)))}',
            f'translation_needed: {yaml_str(needs_translation(en_title, en_text))}',
            '---',
        ]

        body_parts = []
        ua_md = html_to_markdown(ua_text)
        en_md = html_to_markdown(en_text)

        if ua_md:
            body_parts.append('<!-- UA -->')
            body_parts.append(ua_md)

        if en_md:
            body_parts.append('')
            body_parts.append('<!-- EN -->')
            body_parts.append(en_md)

        content = '\n'.join(frontmatter) + '\n'
        if body_parts:
            content += '\n' + '\n'.join(body_parts) + '\n'

        filepath = os.path.join(VIDEOS_DIR, f'{filename}.md')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

    return count


# ─── Build Navigation Tree ──────────────────────────────────────────────────

def build_navigation_tree(pages):
    """Build a hierarchical navigation tree from pages data."""
    # Index pages by id
    pages_by_id = {p['id']: p for p in pages}

    # Build children map: parent_id -> [child pages]
    children_map = defaultdict(list)
    root_pages = []

    for page in pages:
        rel = page.get('rel', 0)
        if rel == 0:
            root_pages.append(page)
        else:
            children_map[rel].append(page)

    def build_node(page):
        pid = page['id']
        node = {
            'id': pid,
            'title_uk': page.get('ua_title', ''),
            'title_en': page.get('en_title', ''),
            'page': page.get('page', ''),
            'slug': slugify(page.get('ua_title', '')),
            'priority': page.get('priority', 0),
            'menu': page.get('menu', 0),
            'type': page.get('type', 0),
            'hide': bool(page.get('hide', 0)),
            'url': page.get('url', ''),
        }
        kids = children_map.get(pid, [])
        if kids:
            kids_sorted = sorted(kids, key=lambda p: p.get('priority', 0))
            node['children'] = [build_node(k) for k in kids_sorted]
        return node

    # Sort root pages by priority
    root_pages.sort(key=lambda p: p.get('priority', 0))
    tree = [build_node(p) for p in root_pages]

    return {'tree': tree}


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    print("Loading data...")
    pages = load_json('pages.json')
    galleries = load_json('galleries.json')
    videos = load_json('videos.json')
    files_data = load_json('files.json')
    galleries_categories = load_json('galleries_categories.json')

    print(f"  Pages: {len(pages)}")
    print(f"  Galleries: {len(galleries)}")
    print(f"  Videos: {len(videos)}")
    print(f"  Files: {len(files_data)}")
    print(f"  Gallery categories: {len(galleries_categories)}")

    # Build files indexes
    pages_files = build_files_index(files_data, 'pages')
    galleries_files = build_files_index(files_data, 'galleries')

    # Build gallery -> pages mapping from galleries_categories
    categories_map = defaultdict(list)
    for gc in galleries_categories:
        categories_map[gc['gallery_id']].append(gc['page_id'])

    # Count files associated
    pages_with_files = sum(1 for pid in pages_files if pages_files[pid]['images'] or pages_files[pid]['files'])
    galleries_with_images = sum(1 for gid in galleries_files if galleries_files[gid]['images'])

    print(f"\nFile associations:")
    print(f"  Pages with files: {pages_with_files}")
    print(f"  Total page images: {sum(len(v['images']) for v in pages_files.values())}")
    print(f"  Total page documents: {sum(len(v['files']) for v in pages_files.values())}")
    print(f"  Galleries with images: {galleries_with_images}")
    print(f"  Total gallery images: {sum(len(v['images']) for v in galleries_files.values())}")

    # Convert
    print("\nConverting pages...")
    pages_count = convert_pages(pages, pages_files)
    print(f"  Created {pages_count} page files in {PAGES_DIR}")

    print("Converting galleries...")
    galleries_count = convert_galleries(galleries, galleries_files, categories_map)
    print(f"  Created {galleries_count} gallery files in {GALLERIES_DIR}")

    print("Converting videos...")
    videos_count = convert_videos(videos)
    print(f"  Created {videos_count} video files in {VIDEOS_DIR}")

    # Build navigation tree
    print("Building navigation tree...")
    nav_tree = build_navigation_tree(pages)
    nav_path = os.path.join(CONTENT_DIR, 'navigation.json')
    with open(nav_path, 'w', encoding='utf-8') as f:
        json.dump(nav_tree, f, ensure_ascii=False, indent=2)

    root_count = len(nav_tree['tree'])
    total_nodes = 0
    def count_nodes(nodes):
        nonlocal total_nodes
        for n in nodes:
            total_nodes += 1
            if 'children' in n:
                count_nodes(n['children'])
    count_nodes(nav_tree['tree'])
    print(f"  Navigation tree: {root_count} root nodes, {total_nodes} total nodes")
    print(f"  Saved to {nav_path}")

    # Translation stats
    pages_needing_translation = sum(
        1 for p in pages if needs_translation(p.get('en_title', ''), p.get('en_text', ''))
    )
    galleries_needing_translation = sum(
        1 for g in galleries if needs_translation(g.get('en_title', ''), g.get('en_text', ''))
    )
    videos_needing_translation = sum(
        1 for v in videos if needs_translation(v.get('en_title', ''), v.get('en_text', ''))
    )

    print(f"\nTranslation needed:")
    print(f"  Pages: {pages_needing_translation}/{len(pages)}")
    print(f"  Galleries: {galleries_needing_translation}/{len(galleries)}")
    print(f"  Videos: {videos_needing_translation}/{len(videos)}")

    print(f"\nDone! Total files created: {pages_count + galleries_count + videos_count + 1}")


if __name__ == '__main__':
    main()
