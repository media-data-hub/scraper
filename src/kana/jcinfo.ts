import type { Browser } from "playwright";


export default async function getKana(browser: Browser, text: string): Promise<string> {
  const page = await browser.newPage();
  try {
    await page.goto("https://www.jcinfo.net/ja/tools/kana");
    await page.fill("#input_text", text);
    await page.locator("label#is_katakana").click();
    await page.locator(".btn-primary").click();
    await page.waitForLoadState("load");
    const results = await page.locator("._result").allTextContents();
    if (results.length !== 3) {
      throw new Error("Cannot resolve Kana");
    }
    return results[2];
  } finally {
    await page.close();
  }
}
