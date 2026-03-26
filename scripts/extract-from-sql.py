#!/usr/bin/env python3
"""
Parse a MariaDB SQL dump and extract specific tables into JSON files.
Handles complex HTML content with escaped quotes, multi-line INSERT statements, etc.
"""

import json
import os
import sys
import time

SQL_FILE = "/Users/samuel/Development/Projects/academy-website/additionalContextFiles/db-nasbu.sql"
OUTPUT_DIR = "/tmp/nasbu-website/scripts/output"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- Column definitions (from CREATE TABLE) ----------

COLUMNS = {
    "files": [
        "id", "module", "module_id", "title", "ua_text", "ru_text", "en_text", "de_text",
        "date", "link", "filetype", "size", "img", "priority", "highlight",
        "slider_highlight", "index_highlight", "hide", "admin_add", "date_add",
        "admin_edit", "date_edit", "admin_hide", "date_hide"
    ],
    "news": [
        "id", "ua_title", "ru_title", "en_title", "de_title", "date_publish", "category",
        "important", "highlight", "link", "slider", "type", "type_date",
        "ua_slider_text", "ru_slider_text", "en_slider_text", "de_slider_text",
        "marquee", "announ", "adv", "banner", "calendar", "calendar_date", "calendar_dates",
        "ua_calendar_place", "ru_calendar_place", "en_calendar_place", "de_calendar_place",
        "calendar_type", "news", "news_index", "author", "rate_up", "rate_down",
        "ua_text", "ru_text", "en_text", "de_text",
        "ua_meta_k", "ru_meta_k", "en_meta_k", "de_meta_k",
        "ua_meta_d", "ru_meta_d", "en_meta_d", "de_meta_d",
        "ua_sticker_title", "en_sticker_title", "ru_sticker_title", "de_sticker_title",
        "ua_description", "ru_description", "en_description", "de_description",
        "view", "admin_add", "add_date", "admin_edit", "edit_date",
        "admin_hide", "hide_date", "hide", "module"
    ],
    "pages": [
        "id", "ua_title", "ru_title", "en_title", "de_title",
        "ua_seotitle", "ru_seotitle", "en_seotitle", "de_seotitle",
        "ua_description", "ru_description", "en_description", "de_description",
        "youtube", "show_feedback", "show_sliderbutton", "show_tests",
        "menu", "rel", "type", "copy", "fullwidth",
        "ua_sys_link", "ru_sys_link", "en_sys_link", "de_sys_link",
        "vstup_form", "news_category", "page", "priority", "float", "sub_page",
        "ua_text", "ru_text", "en_text", "de_text",
        "ua_meta_k", "ru_meta_k", "en_meta_k", "de_meta_k",
        "ua_meta_d", "ru_meta_d", "en_meta_d", "de_meta_d",
        "view", "url", "admin_add", "add_date", "admin_edit", "edit_date",
        "admin_hide", "hide_date", "hide", "module"
    ],
    "galleries": [
        "id", "ua_title", "ru_title", "en_title", "de_title", "date_publish", "category",
        "ua_text", "ru_text", "en_text", "de_text",
        "ua_meta_k", "ru_meta_k", "en_meta_k", "de_meta_k",
        "ua_meta_d", "ru_meta_d", "en_meta_d", "de_meta_d",
        "ua_description", "ru_description", "en_description", "de_description",
        "view", "admin_add", "add_date", "admin_edit", "edit_date",
        "admin_hide", "hide_date", "hide", "module"
    ],
    "videos": [
        "id", "ua_title", "ru_title", "en_title", "de_title", "date_publish",
        "ua_description", "ru_description", "en_description", "de_description",
        "category", "src",
        "ua_text", "ru_text", "en_text", "de_text",
        "ua_meta_k", "ru_meta_k", "en_meta_k", "de_meta_k",
        "ua_meta_d", "ru_meta_d", "en_meta_d", "de_meta_d",
        "view", "admin_add", "add_date", "admin_edit", "edit_date",
        "admin_hide", "hide_date", "hide", "module"
    ],
    "news_categories": ["id", "page_id", "news_id"],
    "galleries_categories": ["id", "page_id", "gallery_id"],
}

# Which columns to keep for each table in the output JSON
KEY_COLUMNS = {
    "files": ["id", "module", "module_id", "title", "link", "filetype", "size", "img",
              "priority", "highlight", "slider_highlight", "index_highlight", "hide"],
    "news": ["id", "ua_title", "en_title", "date_publish", "category",
             "ua_text", "en_text", "ua_description", "en_description",
             "hide", "view", "important", "highlight"],
    "pages": ["id", "ua_title", "en_title", "ua_seotitle", "en_seotitle",
              "ua_description", "en_description", "ua_text", "en_text",
              "page", "rel", "menu", "type", "copy", "priority", "hide", "url",
              "sub_page", "fullwidth", "news_category"],
    "galleries": ["id", "ua_title", "en_title", "date_publish", "category",
                  "ua_text", "en_text", "ua_description", "en_description", "hide"],
    "videos": ["id", "ua_title", "en_title", "date_publish", "ua_description", "en_description",
               "category", "src", "ua_text", "en_text", "hide"],
    "news_categories": ["id", "page_id", "news_id"],
    "galleries_categories": ["id", "page_id", "gallery_id"],
}


def parse_sql_values(text: str):
    """
    Parse the VALUES portion of an INSERT statement.
    text starts right after 'INSERT INTO `tablename` VALUES\n' and ends with ';'

    Yields lists of parsed values for each row.
    """
    i = 0
    length = len(text)

    while i < length:
        # Skip whitespace/newlines
        while i < length and text[i] in (' ', '\t', '\n', '\r', ','):
            i += 1
        if i >= length:
            break

        # Expect '(' to start a row
        if text[i] == '(':
            i += 1
            row = []
            while i < length:
                # Skip whitespace
                while i < length and text[i] in (' ', '\t', '\n', '\r'):
                    i += 1
                if i >= length:
                    break

                if text[i] == ')':
                    # End of row
                    i += 1
                    yield row
                    break
                elif text[i] == ',':
                    i += 1
                    continue
                elif text[i] == "'":
                    # String value - parse until unescaped closing quote
                    i += 1
                    parts = []
                    while i < length:
                        if text[i] == '\\':
                            if i + 1 < length:
                                next_ch = text[i + 1]
                                if next_ch == "'":
                                    parts.append("'")
                                elif next_ch == '"':
                                    parts.append('"')
                                elif next_ch == '\\':
                                    parts.append('\\')
                                elif next_ch == 'n':
                                    parts.append('\n')
                                elif next_ch == 'r':
                                    parts.append('\r')
                                elif next_ch == 't':
                                    parts.append('\t')
                                elif next_ch == '0':
                                    parts.append('\0')
                                else:
                                    parts.append(next_ch)
                                i += 2
                            else:
                                parts.append('\\')
                                i += 1
                        elif text[i] == "'":
                            i += 1
                            break
                        else:
                            parts.append(text[i])
                            i += 1
                    row.append(''.join(parts))
                elif text[i] == 'N' and text[i:i+4] == 'NULL':
                    row.append(None)
                    i += 4
                else:
                    # Numeric value
                    start = i
                    while i < length and text[i] not in (',', ')'):
                        i += 1
                    val_str = text[start:i].strip()
                    # Try to parse as number
                    try:
                        if '.' in val_str:
                            row.append(float(val_str))
                        else:
                            row.append(int(val_str))
                    except ValueError:
                        row.append(val_str)
        elif text[i] == ';':
            break
        else:
            i += 1


def extract_table(sql_path: str, table_name: str) -> list[list]:
    """
    Read the SQL file line by line, collect all INSERT INTO `table_name` VALUES blocks,
    and parse them. Returns list of rows (each row is a list of values).
    """
    prefix = f"INSERT INTO `{table_name}` VALUES"
    all_rows = []

    with open(sql_path, 'r', encoding='utf-8', errors='replace') as f:
        collecting = False
        buffer_parts = []

        for line in f:
            if not collecting:
                if line.startswith(prefix):
                    # Start collecting - take everything after the prefix on this line
                    rest = line[len(prefix):]
                    buffer_parts.append(rest)
                    collecting = True
                    # Check if statement ends on this same line
                    # We need to check if ';' is outside of strings
                    # For safety, just collect and parse later
            else:
                buffer_parts.append(line)

            if collecting:
                # Check if we hit the end of the statement
                # Simple heuristic: line ends with ';' or ';\n' and we're not inside a string
                stripped = line.rstrip('\n').rstrip('\r')
                if stripped.endswith(';'):
                    # Could be inside a string, but let's try parsing what we have
                    # If it fails, we'll keep collecting. But typically mysqldump
                    # ends INSERT statements with ); on its own or at end of line
                    raw = ''.join(buffer_parts)
                    for row in parse_sql_values(raw):
                        all_rows.append(row)
                    buffer_parts = []
                    collecting = False

    return all_rows


def rows_to_dicts(rows, all_columns, key_columns):
    """Convert raw rows to dicts with only key columns."""
    result = []
    num_cols = len(all_columns)
    for row in rows:
        if len(row) < num_cols:
            # Pad with None if needed
            row = row + [None] * (num_cols - len(row))
        d = {}
        for col_name in key_columns:
            idx = all_columns.index(col_name)
            if idx < len(row):
                d[col_name] = row[idx]
            else:
                d[col_name] = None
        result.append(d)
    return result


def main():
    start_time = time.time()
    tables_to_extract = [
        "news", "pages", "galleries", "videos", "files",
        "news_categories", "galleries_categories"
    ]

    inventory = {}

    for table_name in tables_to_extract:
        t0 = time.time()
        print(f"Extracting table: {table_name} ...", flush=True)

        rows = extract_table(SQL_FILE, table_name)
        elapsed = time.time() - t0
        print(f"  Found {len(rows)} rows in {elapsed:.1f}s", flush=True)

        all_cols = COLUMNS[table_name]
        key_cols = KEY_COLUMNS[table_name]
        dicts = rows_to_dicts(rows, all_cols, key_cols)

        output_path = os.path.join(OUTPUT_DIR, f"{table_name}.json")
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(dicts, f, ensure_ascii=False, indent=2)

        file_size = os.path.getsize(output_path)
        print(f"  Wrote {output_path} ({file_size / 1024 / 1024:.1f} MB)", flush=True)

        inventory[table_name] = {
            "row_count": len(rows),
            "columns_extracted": key_cols,
            "output_file": f"{table_name}.json",
            "output_size_bytes": file_size,
        }

    total_time = time.time() - start_time
    inventory["_meta"] = {
        "source_file": SQL_FILE,
        "extraction_time_seconds": round(total_time, 1),
        "tables_extracted": len(tables_to_extract),
    }

    inv_path = os.path.join(OUTPUT_DIR, "inventory.json")
    with open(inv_path, 'w', encoding='utf-8') as f:
        json.dump(inventory, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"Extraction complete in {total_time:.1f}s")
    print(f"{'='*60}")
    for table_name in tables_to_extract:
        info = inventory[table_name]
        print(f"  {table_name:25s}: {info['row_count']:6d} rows  ({info['output_size_bytes'] / 1024:.0f} KB)")
    print(f"\nInventory written to {inv_path}")


if __name__ == "__main__":
    main()
