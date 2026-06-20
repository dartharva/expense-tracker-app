import { getRequestResult, withStore } from "./db.js";

export async function listExpenses() {
  const expenses = await withStore("expenses", "readonly", (store) => getRequestResult(store.getAll()));
  return [...expenses].sort((a, b) => new Date(b.spentAt) - new Date(a.spentAt));
}

export async function saveExpense(expense) {
  return withStore("expenses", "readwrite", (store) => {
    const request = store.put(expense);
    return getRequestResult(request);
  });
}

export async function deleteExpensesByIds(ids) {
  return withStore("expenses", "readwrite", (store) =>
    Promise.all(ids.map((id) => getRequestResult(store.delete(id)))),
  );
}