export function isValid(date: Date | number): boolean {
  const d = date instanceof Date ? date : new Date(date);
  
  return d instanceof Date && !isNaN(d.getTime()) && isFinite(d.getTime());
}