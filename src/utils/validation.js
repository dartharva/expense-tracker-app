import { normalizeCategoryName } from "./normalization.js";

export function parseAmountToMinor(amountInput) {
  const sanitized = String(amountInput).replace(/[^0-9.-]/g, "");
  const amount = Number.parseFloat(sanitized);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  return Math.round(amount * 100);
}

export function validateSpentAt(spentAt) {
  const input = String(spentAt).trim();
  const customMatch = input.match(/^(\d{2})-([A-Za-z]{3})-(\d{2})$/);
  let date;

  if (customMatch) {
    const day = Number.parseInt(customMatch[1], 10);
    const monthToken = customMatch[2].toLowerCase();
    const year = 2000 + Number.parseInt(customMatch[3], 10);
    const monthMap = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const month = monthMap[monthToken];
    if (month == null) {
      throw new Error("Date must use format dd-mmm-yy");
    }
    date = new Date(Date.UTC(year, month, day));
  } else {
    // Keep compatibility with existing ISO values.
    date = new Date(input);
  }

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date. Use dd-mmm-yy");
  }
  return date.toISOString();
}

export function validateNote(note) {
  const normalized = (note ?? "").trim();
  if (normalized.length > 240) {
    throw new Error("Note must be 240 characters or fewer");
  }
  return normalized;
}

export function validateCategoryName(name) {
  const normalized = (name ?? "").trim();
  if (normalized.length < 1 || normalized.length > 40) {
    throw new Error("Category name must be between 1 and 40 characters");
  }
  return {
    name: normalized,
    normalizedName: normalizeCategoryName(normalized),
  };
}