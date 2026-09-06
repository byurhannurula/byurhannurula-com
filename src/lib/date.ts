const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

/**
 * A calendar day, short: "aug 3", or "aug 3 '24" outside the current year.
 *
 * Read off the string rather than through a Date. The frontmatter dates are
 * plain calendar days, and `new Date("2024-12-25")` is midnight UTC, which is
 * the 24th anywhere west of Greenwich: the server and the browser would print
 * two different days for the same post.
 *
 * Pass `year: false` where the year is already stated above the row.
 */
export function shortDate(iso: string, { year = true } = {}) {
  const [y, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1] ?? m;
  const day = Number(d);
  const stamp = `${month} ${day}`;
  if (!year || y === String(new Date().getFullYear())) return stamp;
  return `${stamp} '${y.slice(2)}`;
}
