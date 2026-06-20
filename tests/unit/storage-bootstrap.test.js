import { describe, expect, it } from "vitest";
import { initDb } from "../../src/services/storage/db.js";

describe("db bootstrap", () => {
  it("opens IndexedDB with expected object stores", async () => {
    const db = await initDb();
    expect(db.objectStoreNames.contains("expenses")).toBe(true);
    expect(db.objectStoreNames.contains("categories")).toBe(true);
  });
});