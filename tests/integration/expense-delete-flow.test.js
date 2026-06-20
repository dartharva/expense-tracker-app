import { describe, expect, it } from "vitest";
import { initDb } from "../../src/services/storage/db.js";
import { createCategoryService } from "../../src/features/categories/category-service.js";
import { createExpenseService } from "../../src/features/expenses/expense-service.js";

describe("expense delete flow", () => {
  it("deletes selected expense records", async () => {
    await initDb();
    const categories = createCategoryService();
    const expenses = createExpenseService();
    await categories.ensureDefaultCategory();
    const [category] = await categories.listCategories();

    const first = await expenses.createExpense({
      amount: "100",
      spentAt: "20-Jun-26",
      categoryId: category.id,
      note: "A",
    });
    await expenses.createExpense({
      amount: "200",
      spentAt: "20-Jun-26",
      categoryId: category.id,
      note: "B",
    });

    await expenses.deleteExpenses([first.id]);
    const remaining = await expenses.listExpenses();
    expect(remaining.length).toBeGreaterThan(0);
    expect(remaining.some((item) => item.id === first.id)).toBe(false);
  });
});