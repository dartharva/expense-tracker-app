import { describe, expect, it } from "vitest";
import { initDb } from "../../src/services/storage/db.js";
import { createCategoryService } from "../../src/features/categories/category-service.js";
import { createExpenseService } from "../../src/features/expenses/expense-service.js";

describe("offline expense flow", () => {
  it("persists and reloads expenses", async () => {
    await initDb();
    const categories = createCategoryService();
    const expenses = createExpenseService();
    await categories.ensureDefaultCategory();
    const [category] = await categories.listCategories();

    await expenses.createExpense({
      amount: "9.90",
      spentAt: new Date().toISOString(),
      categoryId: category.id,
      note: "Coffee",
      currencyCode: "USD",
    });

    const listed = await expenses.listExpenses();
    expect(listed.length).toBeGreaterThan(0);
  });
});