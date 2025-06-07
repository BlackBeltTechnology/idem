export function parseLocalDate(isoDate: string): Date {
  const parts = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) {
    throw new Error(`Invalid LocalDate format: ${isoDate}`);
  }
  const [, yearStr, monthStr, dayStr] = parts;
  const year = Number(yearStr);
  const month = Number(monthStr) - 1;
  const day = Number(dayStr);

  const date = new Date(year, month, day);
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    throw new Error(`Invalid LocalDate value: ${isoDate}`);
  }

  return date;
}
