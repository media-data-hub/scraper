import type { Page } from "puppeteer-core";

export * from "./date.js";
export * from "./image.js";

export async function selectTextContent(page: Page, selector: string): Promise<string> {
  const selected = await page.locator(selector).map(ele => ele.textContent).wait();
  if (!selected) {
    throw new Error("Cannot select title");
  }
  return selected;
}

export async function selectInnerText(page: Page, selector: string): Promise<string> {
  const selected = await page.locator(selector).map(ele => (ele as HTMLElement).innerText).wait();
  if (!selected) {
    throw new Error("Cannot select title");
  }
  return selected;
}

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
