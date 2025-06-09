/**
 * Parses a date string like 'YYYY-MM-DD' into a Date object at UTC midnight.
 * This prevents timezone-related issues where '2023-10-25' could become
 * '2023-10-24T23:00:00.000Z' in a negative UTC offset timezone.
 */
export function parseLocalDateAsUTC(isoDate: string): Date {
    return new Date(`${isoDate}T00:00:00.000Z`);
}
