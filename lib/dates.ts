// Formats a "YYYY-MM-DD" frontmatter date as "Jul 21, 2026" for display.
// Parsed manually (not via new Date()) so the output can never shift a day
// due to timezone interpretation of bare date strings.
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}