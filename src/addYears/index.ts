export function addYears(date: Date | number, amount: number): Date {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date);

  if (!(d instanceof Date) || isNaN(d.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Get the original date components to handle leap year edge cases
  const originalDay = d.getDate();
  const originalMonth = d.getMonth();
  const isOriginallyFeb29 = originalMonth === 1 && originalDay === 29;
  
  // Add years
  d.setFullYear(d.getFullYear() + amount);
  
  // Handle leap year edge cases (Feb 29 in leap year -> Feb 28 in non-leap year)
  if (isOriginallyFeb29 && d.getMonth() !== 1) {
    // If we were originally on Feb 29 and now we're in a different month (March),
    // it means the target year doesn't have Feb 29, so adjust to Feb 28
    d.setMonth(1, 28);
  }
  
  return d;
}