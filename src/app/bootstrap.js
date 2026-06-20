import { initRouter } from "./router.js";
import { showAlert } from "./ui-components.js";
import { initDb } from "../services/storage/db.js";
import { createExpenseService } from "../features/expenses/expense-service.js";
import { createCategoryService } from "../features/categories/category-service.js";
import { initExpenseForm } from "../features/expenses/expense-form.js";
import { getSelectedExpenseIds, renderExpenseList } from "../features/expenses/expense-list.js";
import { initCategoryManager } from "../features/categories/category-manager.js";
import { initExportController } from "../features/export/export-controller.js";

export async function bootstrapApp() {
  await initDb();
  initRouter();

  const expenseService = createExpenseService();
  const categoryService = createCategoryService();

  await categoryService.ensureDefaultCategory();

  async function refresh() {
    const [expenses, categories] = await Promise.all([
      expenseService.listExpenses(),
      categoryService.listCategories(),
    ]);
    renderExpenseList(expenses);
    return categories;
  }

  const initialCategories = await refresh();

  const deleteSelectedButton = document.getElementById("delete-selected-expenses");
  if (deleteSelectedButton) {
    deleteSelectedButton.addEventListener("click", async () => {
      const selectedIds = getSelectedExpenseIds();
      if (selectedIds.length === 0) {
        showAlert("Select at least one expense to delete", "info");
        return;
      }
      await expenseService.deleteExpenses(selectedIds);
      await refresh();
      showAlert("Selected expenses deleted", "success");
    });
  }

  initExpenseForm({
    expenseService,
    categoryService,
    showAlert,
    onChanged: refresh,
    initialCategories,
  });

  initCategoryManager({
    categoryService,
    showAlert,
    onChanged: refresh,
    initialCategories,
  });

  initExportController({
    expenseService,
    categoryService,
    showAlert,
  });
}