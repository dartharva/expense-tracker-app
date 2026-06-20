export function normalizeCategoryName(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}