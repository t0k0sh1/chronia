export function getMonth(date: Date | number): number {
  const d = date instanceof Date ? date : new Date(date);
  
  // JavaScript's getMonth() returns 0-11, we want 1-12
  return d.getMonth() + 1;
}