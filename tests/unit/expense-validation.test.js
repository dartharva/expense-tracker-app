import { describe, expect, it } from "vitest";
import { validateNote, validateSpentAt } from "../../src/utils/validation.js";

describe("expense validation", () => {
  it("trims notes", () => {
    expect(validateNote("  cab fare ")).toBe("cab fare");
  });

  it("rejects invalid dates", () => {
    expect(() => validateSpentAt("not-a-date")).toThrow();
  });
});