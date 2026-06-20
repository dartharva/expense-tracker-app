export function isoNow() {
  return new Date().toISOString();
}

export function isoFromLocalInput(localDateTime) {
  return new Date(localDateTime).toISOString();
}

export function localInputFromIso(isoDateTime) {
  const value = new Date(isoDateTime);
  const pad = (part) => String(part).padStart(2, "0");
  const year = value.getFullYear();
  const month = pad(value.getMonth() + 1);
  const day = pad(value.getDate());
  const hour = pad(value.getHours());
  const minute = pad(value.getMinutes());
  return `${year}-${month}-${day}T${hour}:${minute}`;
}