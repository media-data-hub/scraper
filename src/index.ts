export * from "./date.js";
export * from "./image.js";
export * from "./kana/index.js";

export function formatTitle(text: string): string {
  return text
    .normalize("NFKC")
    .replaceAll("...", "…")
    .trim()
    .replaceAll(/\s+/gu, " ");
}

export function formatSortTitle(text: string): string {
  return text.replaceAll(/[-()〈〉、!?！？。・♡：]/gu, " ");
}

export function postFormatSortTitle(text: string): string {
  return text
    .trim()
    .replaceAll(/\s+/gu, " ");
}

export function formatDescription(text: string): string {
  return text
    .normalize("NFKC")
    .replaceAll("...", "…")
    .trim()
    .replace(/^ *(?<val>\S+)/gmu, "$<val>")
    .replace(/(?<val>\S+) *$/gmu, "$<val>")
    .replaceAll(/、\s+/gu, "、")
    .replaceAll(/\n{3,}/gu, "\n\n")
    .replaceAll("\n", "<br/>\n")
    .replaceAll("</h3><br/>\n", "</h3>\n")
    .replaceAll("</h2><br/>\n", "</h2>\n")
    .replaceAll("</h1><br/>\n", "</h1>\n");
}
