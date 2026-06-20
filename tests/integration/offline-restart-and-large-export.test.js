import { describe, expect, it } from "vitest";
import { serializeExpensesToCsv } from "../../src/services/csv/csv-exporter.js";

describe("offline restart and large export", () => {
  it("serializes large datasets within reasonable bounds", () => {
    const data = Array.from({ length: 5000 }, (_, index) => ({
      id: `e-${index}`,
      spentAt: "2026-01-01T00:00:00.000Z",
      amountMinor: 100,
      currencyCode: "USD",
      categoryId: "c1",
      note: "",
    }));
    const started = performance.now();
    const csv = serializeExpensesToCsv(data, new Map([["c1", { id: "c1", name: "General" }]]));
    const elapsed = performance.now() - started;
    expect(csv.length).toBeGreaterThan(0);
    expect(elapsed).toBeLessThan(10000);
  });
});