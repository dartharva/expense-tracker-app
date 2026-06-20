import { describe, expect, it } from "vitest";
import { parseAmountToMinor, validateCategoryName } from "../../src/utils/validation.js";

describe("validation helpers", () => {
  it("parses decimal amount to minor units", () => {
    expect(parseAmountToMinor("12.50")).toBe(1250);
  });

  it("rejects non-positive amounts", () => {
    expect(() => parseAmountToMinor(0)).toThrow();
  });

  it("normalizes category names", () => {
    const result = validateCategoryName("  Groceries   Home ");
    expect(result.normalizedName).toBe("groceries home");
  });
});