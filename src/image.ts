import sharp from "sharp";
import imageType from "image-type";

import type { ImageTypeResult } from "image-type";
import type { Browser } from "puppeteer-core";

export async function fetchImage(browser: Browser, url: string, referer?: string): Promise<Buffer> {
  const page = await browser.newPage();
  try {
    if (referer) {
      page.setExtraHTTPHeaders({ referer });
    }
    const viewSource = await page.goto(url);
    if (!viewSource) {
      throw new Error("Empty viewSource");
    }
    return await viewSource.buffer();
  } finally {
    await page.close();
  }
}

export interface ProcessImageResult {
  type: ImageTypeResult;
  data: Uint8Array;
}

export async function processImage(input: Buffer): Promise<ProcessImageResult> {
  const type = await imageType(input);
  if (!type) {
    throw new Error("Not a image");
  }
  if (type.mime === "image/webp" || type.mime === "image/jpeg") {
    return { data: input, type };
  }
  const data = await sharp(input)
    .webp({ lossless: true, force: true, effort: 6 })
    .toBuffer();
  const newType = await imageType(data);
  if (!newType) {
    throw new Error("Not a image (new)");
  }
  return { type: newType, data };
}
