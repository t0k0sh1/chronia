export function subSeconds(date: Date | number, amount: number): Date {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date);

  if (!(d instanceof Date) || isNaN(d.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Subtract seconds by subtracting milliseconds (1 second = 1,000 milliseconds)
  d.setTime(d.getTime() - amount * 1000);
  
  return d;
}