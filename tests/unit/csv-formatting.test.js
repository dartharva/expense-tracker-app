import { describe, expect, it } from "vitest";
import { CSV_HEADERS, serializeExpensesToCsv } from "../../src/services/csv/csv-exporter.js";

describe("csv exporter", () => {
  it("always includes the mandatory header row", () => {
    const csv = serializeExpensesToCsv([], new Map());
    expect(csv).toBe(CSV_HEADERS.join(","));
  });

  it("escapes fields with commas and quotes", () => {
    const csv = serializeExpensesToCsv(
      [
        {
          id: "1",
          spentAt: "2026-01-01T12:00:00.000Z",
          amountMinor: 1234,
          currencyCode: "USD",
          categoryId: "c1",
          note: "taxi, \"late\"",
        },
      ],
      new Map([["c1", { id: "c1", name: "Travel" }]]),
    );
    expect(csv).toContain('"taxi, ""late"""');
  });
});