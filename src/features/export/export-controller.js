import {
  buildExportFilename,
  downloadCsv,
  serializeExpensesToCsv,
} from "../../services/csv/csv-exporter.js";

export function initExportController({ expenseService, categoryService, showAlert }) {
  const button = document.getElementById("export-csv");
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    try {
      const [expenses, categories] = await Promise.all([
        expenseService.listExpenses(),
        categoryService.listCategories(),
      ]);
      const categoriesById = new Map(categories.map((item) => [item.id, item]));
      const csv = serializeExpensesToCsv(expenses, categoriesById);
      downloadCsv(csv, buildExportFilename());
      showAlert("CSV export ready", "success");
    } catch (error) {
      showAlert(error.message, "error");
    }
  });
}