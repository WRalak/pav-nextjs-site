/**
 * Minimal CSV serialization with quoting for commas/quotes/newlines, and a
 * defense against CSV-injection: values starting with `=`, `+`, `-` or `@`
 * are prefixed with a `'` so spreadsheet apps don't treat them as formulas.
 */
export function toCsv<T extends object>(
  rows: T[],
  columns: { key: keyof T; label: string }[]
): string {
  const lines = [columns.map((c) => escapeCell(c.label)).join(",")];

  for (const row of rows) {
    lines.push(columns.map((c) => escapeCell(formatValue(row[c.key]))).join(","));
  }

  return lines.join("\r\n");
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function escapeCell(value: string): string {
  let cell = value;
  if (/^[=+\-@]/.test(cell)) {
    cell = `'${cell}`;
  }
  if (/[",\r\n]/.test(cell)) {
    cell = `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
}
