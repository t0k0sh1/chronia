export function getDay(date: Date | number): number {
  const d = date instanceof Date ? date : new Date(date);
  
  return d.getDate();
}