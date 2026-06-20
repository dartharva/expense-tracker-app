import {
  saveExpense,
  listExpenses as repoListExpenses,
  deleteExpensesByIds,
} from "../../services/storage/expense-repository.js";
import { getCategoryById } from "../../services/storage/category-repository.js";
import { parseAmountToMinor, validateNote, validateSpentAt } from "../../utils/validation.js";
import { isoNow } from "../../utils/time.js";

function buildExpense({ amount, spentAt, categoryId, note, currencyCode = "INR" }) {
  const amountMinor = parseAmountToMinor(amount);
  return {
    id: crypto.randomUUID(),
    amountMinor,
    currencyCode,
    spentAt: validateSpentAt(spentAt),
    categoryId,
    note: validateNote(note),
    createdAt: isoNow(),
    updatedAt: isoNow(),
  };
}

export function createExpenseService() {
  return {
    async createExpense(input) {
      // Category validation is a critical integrity boundary for relational consistency.
      const category = await getCategoryById(input.categoryId);
      if (!category || category.isArchived) {
        throw new Error("Please choose an active category");
      }

      const expense = buildExpense(input);
      await saveExpense(expense);
      return expense;
    },

    async listExpenses() {
      return repoListExpenses();
    },

    async deleteExpenses(ids) {
      if (!Array.isArray(ids) || ids.length === 0) {
        return;
      }
      await deleteExpensesByIds(ids);
    },
  };
}