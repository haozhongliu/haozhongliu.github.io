import fs from "node:fs";
import path from "node:path";

export type Writing = {
  slug: string;
  title: string;
  // Paragraphs are separated by a blank line.
  content: string;
};

const WRITINGS_DIR = path.join(process.cwd(), "app", "writings");

// Each writing is a Markdown file in app/writings: the first "# " line is the title, the rest is the text.
// Files are listed in filename order, so prefix them (01-, 02-, ...) to control the order.
export function getWritings(): Writing[] {
  return fs
    .readdirSync(WRITINGS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs
        .readFileSync(path.join(WRITINGS_DIR, file), "utf8")
        .replace(/^\uFEFF/, "")
        .replace(/\r\n/g, "\n");

      const lines = raw.split("\n");
      const hasHeading = lines[0]?.startsWith("# ");

      return {
        slug,
        title: hasHeading ? lines[0].slice(2).trim() : slug,
        content: (hasHeading ? lines.slice(1) : lines).join("\n").trim(),
      };
    });
}
