import { DateTime } from "luxon";

import type { DateObjectUnits } from "luxon";
import type { Page } from "playwright";

export interface AirDateMapping {
  [key: number]: DateTime;
}

export function createSelectAirDate(mapping: AirDateMapping, span = 7): (page: Page, epCurrent: number) => Promise<DateTime> {
  const epNum = Object.keys(mapping).map(ep => Number.parseInt(ep)).filter(ep => ep > 0);
  return async (_page, epCurrent) => {
    if (mapping[epCurrent]) {
      return mapping[epCurrent];
    }
    const nearestEp = epNum.reduce((prev, cur) => cur > prev && cur <= epCurrent ? cur : prev, -1);
    if (nearestEp <= 0) {
      throw new Error(`Cannot find nearest episode number for air date (${epCurrent})`);
    }
    return mapping[nearestEp].plus({ days: (epCurrent - nearestEp) * span }).setZone("utc");
  };
}

// eslint-disable-next-line max-params
export function selectRegexAirDate(selector: string, regex: RegExp, time: DateObjectUnits, zone = "utc"): (page: Page, epCurrent: number) => Promise<DateTime> {
  return async page => {
    const selected = await page.locator(selector, { hasText: regex }).textContent();
    if (!selected) {
      throw new Error("Cannot select airDate");
    }
    const result = regex.exec(selected)?.groups;
    if (!result) {
      throw new Error("Cannot select airDate regex");
    }
    const year = Number.parseInt(result.year);
    const month = Number.parseInt(result.month);
    const day = Number.parseInt(result.day);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      throw new Error("Cannot select airDate YMD");
    }
    return DateTime.fromObject({ ...time, year, month, day }, { zone }).setZone("utc");
  };
}
