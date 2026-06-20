const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatDateDdMmmYy(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

function parseAmountValue(value) {
  const numeric = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return null;
  }
  return numeric;
}

function setCategoryOptions(select, categories) {
  const active = categories.filter((item) => !item.isArchived);
  select.replaceChildren(
    ...active.map((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      return option;
    }),
  );
}

export function initExpenseForm({ expenseService, showAlert, onChanged, initialCategories }) {
  const form = document.getElementById("expense-form");
  const amount = document.getElementById("expense-amount");
  const spentAt = document.getElementById("expense-spent-at");
  const category = document.getElementById("expense-category");
  const note = document.getElementById("expense-note");

  if (!form || !amount || !spentAt || !category || !note) {
    return;
  }

  spentAt.value = formatDateDdMmmYy(new Date());
  setCategoryOptions(category, initialCategories);

  amount.addEventListener("focus", () => {
    const numeric = parseAmountValue(amount.value);
    if (numeric != null) {
      amount.value = numeric.toFixed(2);
    }
  });

  amount.addEventListener("blur", () => {
    const numeric = parseAmountValue(amount.value);
    if (numeric != null) {
      amount.value = inrFormatter.format(numeric);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      // The form payload is intentionally mapped explicitly to keep field-level
      // validation and persistence behavior easy to audit during maintenance.
      await expenseService.createExpense({
        amount: amount.value,
        spentAt: spentAt.value,
        categoryId: category.value,
        note: note.value,
      });
      showAlert("Expense saved", "success");
      form.reset();
      spentAt.value = formatDateDdMmmYy(new Date());
      const categories = await onChanged();
      setCategoryOptions(category, categories);
    } catch (error) {
      showAlert(error.message, "error");
    }
  });
}

export function updateExpenseFormCategories(categories) {
  const category = document.getElementById("expense-category");
  if (!category) {
    return;
  }
  setCategoryOptions(category, categories);
}