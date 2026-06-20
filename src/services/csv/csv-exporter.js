import { formatMinorToDecimal } from "../../utils/currency.js";

export const CSV_HEADERS = [
  "expense_id",
  "spent_at",
  "amount",
  "currency_code",
  "category_name",
  "note",
];

function escapeCsvField(value) {
  const text = value == null ? "" : String(value);
  // CSV escaping is contract-critical and must handle delimiters/newlines/quotes deterministically.
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function serializeExpensesToCsv(expenses, categoriesById) {
  const rows = expenses.map((expense) => {
    const category = categoriesById.get(expense.categoryId);
    return [
      expense.id,
      expense.spentAt,
      formatMinorToDecimal(expense.amountMinor),
      expense.currencyCode,
      category?.name ?? "Unknown",
      expense.note ?? "",
    ]
      .map(escapeCsvField)
      .join(",");
  });
  return [CSV_HEADERS.join(","), ...rows].join("\n");
}

export function downloadCsv(contents, fileName) {
  const blob = new Blob([contents], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function buildExportFilename(now = new Date()) {
  const pad = (part) => String(part).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `expenses-${yyyy}${mm}${dd}-${hh}${min}${ss}.csv`;
}