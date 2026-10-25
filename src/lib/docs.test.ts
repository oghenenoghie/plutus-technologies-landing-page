import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DOC_GUIDES, ROLE_LABEL } from "./docs";

const PUBLIC = path.join(__dirname, "../../public");

/** Width and height from a WebP file's header (VP8, VP8L or VP8X). */
function webpSize(file: string): [number, number] {
  const b = fs.readFileSync(file);
  expect(b.toString("ascii", 0, 4)).toBe("RIFF");
  expect(b.toString("ascii", 8, 12)).toBe("WEBP");
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (chunk === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  throw new Error(`unknown WebP chunk ${chunk} in ${file}`);
}

describe("documentation", () => {
  const sections = DOC_GUIDES.flatMap((g) => g.sections.map((s) => ({ guide: g.slug, ...s })));
  const shots = sections.flatMap((s) => s.shots ?? []);

  it("has unique guide slugs and unique section ids within each guide", () => {
    const slugs = DOC_GUIDES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const g of DOC_GUIDES) {
      const ids = g.sections.map((s) => s.id);
      expect(new Set(ids).size, g.slug).toBe(ids.length);
    }
  });

  it("points every screenshot at a file whose real size matches the declared one", () => {
    expect(shots.length).toBeGreaterThan(30);
    for (const shot of shots) {
      const file = path.join(PUBLIC, shot.src);
      expect(fs.existsSync(file), shot.src).toBe(true);
      expect(webpSize(file), shot.src).toEqual([shot.width, shot.height]);
      expect(shot.alt.length, shot.src).toBeGreaterThan(0);
    }
  });

  it("uses only known roles", () => {
    for (const s of sections) for (const r of s.roles ?? []) expect(ROLE_LABEL[r], `${s.guide}#${s.id}`).toBeDefined();
  });

  it("closes every **label** in the copy", () => {
    for (const s of sections) {
      for (const text of [s.intro, s.note, ...(s.steps ?? []), ...(s.points ?? [])]) {
        if (text) expect((text.match(/\*\*/g) ?? []).length % 2, `${s.guide}#${s.id}: ${text}`).toBe(0);
      }
    }
  });
});
