
const DAY_MAP = {
  monday:  'ponedjeljak',
  tuesday: 'utorak',
  wednesday: 'srijeda',
  thursday: 'cetvrtak',
  friday: 'petak',
  saturday: 'subota',
  sunday: 'nedjelja'
};

/**
 * formatDateSlug(new Date('2026-03-17')) -> 'utorak-17-3-2026'
 */
export function formatDateSlug(date) {
  if (!(date instanceof Date) || Number.isNaN(date)) {
    throw new TypeError('date must be a valid Date object');
  }
  const weekdayEn = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const weekdayHr = DAY_MAP[weekdayEn] || weekdayEn;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${weekdayHr}-${day}-${month}-${year}`;
}
