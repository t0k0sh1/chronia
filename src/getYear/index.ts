export function getYear(date: Date | number): number {
  const d = date instanceof Date ? date : new Date(date);
  
  return d.getFullYear();
}