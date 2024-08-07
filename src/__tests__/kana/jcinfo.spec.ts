import { assert } from "chai";
import { chromium } from "playwright";
import getKana from "../../kana/jcinfo.js";


describe("Test jcinfo.net", () => {
  it("should getKana()", async () => {
    const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-extensions"] });
    try {
      const result = await getKana(browser, "世界ルビ");
      assert.equal(result, "せかいるび");
    } catch (e) {
      if (e instanceof Error) {
        assert.fail(e.message);
      } else {
        assert.fail(`${e}`);
      }
    } finally {
      await browser.close();
    }
  });

  it("should not getKana()", async () => {
    const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-extensions"] });
    try {
      await getKana(browser, "Ṽ");
      assert.fail("Should throw error");
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, "Cannot resolve Kana");
    } finally {
      await browser.close();
    }
  });
});
