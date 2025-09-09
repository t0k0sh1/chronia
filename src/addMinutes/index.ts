export function addMinutes(date: Date | number, amount: number): Date {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date);

  if (!(d instanceof Date) || isNaN(d.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Add minutes by adding milliseconds (1 minute = 60,000 milliseconds)
  d.setTime(d.getTime() + amount * 60000);
  
  return d;
}