import { describe, expect, it } from "vitest";
import { serializeExpensesToCsv } from "../../src/services/csv/csv-exporter.js";

describe("csv export flow", () => {
  it("exports header-only csv for empty datasets", () => {
    const csv = serializeExpensesToCsv([], new Map());
    expect(csv.split("\n").length).toBe(1);
  });

  it("exports populated rows", () => {
    const csv = serializeExpensesToCsv(
      [
        {
          id: "e1",
          spentAt: "2026-01-01T10:00:00.000Z",
          amountMinor: 1050,
          currencyCode: "USD",
          categoryId: "c1",
          note: "Bus",
        },
      ],
      new Map([["c1", { id: "c1", name: "Travel" }]]),
    );
    expect(csv).toContain("Travel");
  });
});