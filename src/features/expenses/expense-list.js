import { formatMinorWithCurrency } from "../../utils/currency.js";

export function renderExpenseList(expenses) {
  const list = document.getElementById("expense-list");
  const deleteButton = document.getElementById("delete-selected-expenses");
  if (!list) {
    return;
  }

  if (expenses.length === 0) {
    const empty = document.createElement("li");
    empty.className = "expense-empty";
    empty.textContent = "No expenses yet";
    list.replaceChildren(empty);
    if (deleteButton) {
      deleteButton.disabled = true;
    }
    return;
  }

  list.replaceChildren(
    ...expenses.map((expense) => {
      const item = document.createElement("li");
      item.className = "expense-item";

      const label = document.createElement("label");
      label.className = "expense-select-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "expense-select";
      checkbox.value = expense.id;

      const text = document.createElement("span");
      text.textContent = `${formatMinorWithCurrency(expense.amountMinor, expense.currencyCode)} | ${new Date(expense.spentAt).toLocaleString()} | ${expense.note || "No note"}`;

      checkbox.addEventListener("change", () => {
        if (deleteButton) {
          deleteButton.disabled = getSelectedExpenseIds().length === 0;
        }
      });

      label.append(checkbox, text);
      item.append(label);
      return item;
    }),
  );

  if (deleteButton) {
    deleteButton.disabled = true;
  }
}

export function getSelectedExpenseIds() {
  return Array.from(document.querySelectorAll(".expense-select:checked")).map((input) => input.value);
}