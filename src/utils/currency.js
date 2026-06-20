export function formatMinorToDecimal(amountMinor) {
  return (amountMinor / 100).toFixed(2);
}

export function formatMinorWithCurrency(amountMinor, currencyCode = "USD") {
  const amount = amountMinor / 100;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}