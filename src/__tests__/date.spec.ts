import { assert } from "chai";
import { DateTime } from "luxon";
import { createSelectAirDate } from "../date.js";


describe("Test functions", () => {
  it("createSelectAirDate() should match exact episode number", async () => {
    const date = DateTime.fromISO("2024-01-01T12:00:00Z");
    const selectAirDate = createSelectAirDate({ 1: date });
    const result = await selectAirDate(null as any, 1);
    assert.isTrue(date.equals(result));
  });

  it("createSelectAirDate() should match nearest episode number", async () => {
    const date = DateTime.fromISO("2024-01-01T12:00:00Z");
    const selectAirDate = createSelectAirDate({ 1: date });
    const result = await selectAirDate(null as any, 2);
    assert.isTrue(date.plus({ days: 7 }).setZone("utc").equals(result));
  });
});
