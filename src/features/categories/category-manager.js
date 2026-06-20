import { updateExpenseFormCategories } from "../expenses/expense-form.js";

function setRenameOptions(select, categories) {
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

export function initCategoryManager({ categoryService, showAlert, onChanged, initialCategories }) {
  const createForm = document.getElementById("category-form");
  const createInput = document.getElementById("category-name");
  const renameForm = document.getElementById("category-rename-form");
  const renameSelect = document.getElementById("rename-category-id");
  const renameInput = document.getElementById("rename-category-name");

  if (!createForm || !createInput || !renameForm || !renameSelect || !renameInput) {
    return;
  }

  setRenameOptions(renameSelect, initialCategories);

  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await categoryService.createCategory(createInput.value);
      showAlert("Category created", "success");
      createForm.reset();
      const categories = await onChanged();
      setRenameOptions(renameSelect, categories);
      updateExpenseFormCategories(categories);
    } catch (error) {
      showAlert(error.message, "error");
    }
  });

  renameForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await categoryService.renameCategory(renameSelect.value, renameInput.value);
      showAlert("Category renamed", "success");
      renameForm.reset();
      const categories = await onChanged();
      setRenameOptions(renameSelect, categories);
      updateExpenseFormCategories(categories);
    } catch (error) {
      showAlert(error.message, "error");
    }
  });
}