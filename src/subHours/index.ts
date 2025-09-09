export function subHours(date: Date | number, amount: number): Date {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date);

  if (!(d instanceof Date) || isNaN(d.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Subtract hours by subtracting milliseconds (1 hour = 3,600,000 milliseconds)
  d.setTime(d.getTime() - amount * 3600000);
  
  return d;
}