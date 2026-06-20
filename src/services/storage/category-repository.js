import { getRequestResult, withStore } from "./db.js";

export async function listCategories() {
  return withStore("categories", "readonly", (store) => getRequestResult(store.getAll()));
}

export async function getCategoryById(id) {
  return withStore("categories", "readonly", (store) => getRequestResult(store.get(id)));
}

export async function findCategoryByNormalizedName(normalizedName) {
  return withStore("categories", "readonly", (store) => {
    const index = store.index("normalizedName");
    return getRequestResult(index.get(normalizedName));
  });
}

export async function saveCategory(category) {
  return withStore("categories", "readwrite", (store) => {
    const request = store.put(category);
    return getRequestResult(request);
  });
}