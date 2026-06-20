import { describe, expect, it } from "vitest";
import { normalizeCategoryName } from "../../src/utils/normalization.js";

describe("category normalization", () => {
  it("normalizes case and spacing", () => {
    expect(normalizeCategoryName("  FOOD   &   Snacks ")).toBe("food & snacks");
  });
});