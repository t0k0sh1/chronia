export function subMonths(date: Date | number, amount: number): Date {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date);

  if (!(d instanceof Date) || isNaN(d.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Get the original day to handle month-end edge cases
  const originalDay = d.getDate();
  
  // Subtract months
  d.setMonth(d.getMonth() - amount);
  
  // Handle month-end edge cases (e.g., Mar 31 - 1 month should be Feb 28/29, not Mar 3)
  if (d.getDate() !== originalDay) {
    // If the day changed, it means we overflowed to the next month
    // Set to the last day of the intended month
    d.setDate(0);
  }
  
  return d;
}