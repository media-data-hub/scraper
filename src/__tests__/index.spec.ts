import { assert } from "chai";
import puppeteer from "puppeteer-core";
import { selectTextContent } from "../index.js";


describe("Test functions", () => {
  it("should selectTextContent", async () => {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium",
      defaultViewport: { width: 1920, height: 1080 },
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-extensions"]
    });
    const page = await browser.newPage();
    await page.goto("https://example.com/");
    const title = await selectTextContent(page, "h1");
    await page.close();
    await browser.close();
    assert.equal(title, "Example Domain");
  });
});
