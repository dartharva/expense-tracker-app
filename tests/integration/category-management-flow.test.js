import { describe, expect, it } from "vitest";
import { initDb } from "../../src/services/storage/db.js";
import { createCategoryService } from "../../src/features/categories/category-service.js";

describe("category management flow", () => {
  it("creates and renames categories while enforcing uniqueness", async () => {
    await initDb();
    const service = createCategoryService();

    const created = await service.createCategory("Groceries");
    await service.renameCategory(created.id, "Home Groceries");

    const categories = await service.listCategories();
    expect(categories.some((item) => item.name === "Home Groceries")).toBe(true);
  });
});