// FunctionDispatcher.ts
import {
  addDays, addMonths, addWeeks, addYears,
  differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears,
  getDay, getDayOfYear, getHours, getMinutes, getMonth, getSeconds, getWeek, getWeekOfMonth, getYear
} from 'date-fns';

type Func = (base: any, args: any[]) => any;

const roundToPrecision = (val: number, precision: number, op: 'round' | 'floor' | 'ceil'): number => {
  const factor = 10 ** precision;
  return Math[op](val * factor) / factor;
};

const NUMBER_FUNCTIONS: Record<string, Func> = {
  round: (val, args) => roundToPrecision(val, args[0], 'round'),
  floor: (val, args) => roundToPrecision(val, args[0], 'floor'), // CORRECTED
  ceil: (val, args) => roundToPrecision(val, args[0], 'ceil'),
};

const GENERIC_FUNCTIONS: Record<string, Func> = {
  size: (val) => {
    if (typeof val === 'string' || Array.isArray(val)) return val.length;
    if (typeof val === 'object' && val !== null) return Object.keys(val).length;
    throw new Error(`size() cannot be called on type ${typeof val}`);
  },
  toInt: (val) => {
    if (typeof val === 'boolean') return val ? 1 : 0;
    throw new Error(`toInt() cannot be called on type ${typeof val}`);
  },
};

const DATE_FUNCTIONS: Record<string, Func> = {
  year: (val) => getYear(val),
  monthOfYear: (val) => getMonth(val) + 1,
  dayOfMonth: (val) => val.getDate(),
  dayOfYear: (val) => getDayOfYear(val),
  dayOfWeek: (val) => (getDay(val) === 0 ? 7 : getDay(val)),
  weekOfYear: (val) => getWeek(val),
  weekOfMonth: (val) => getWeekOfMonth(val),
  hour: (val) => getHours(val),
  minute: (val) => getMinutes(val),
  second: (val) => getSeconds(val),
  dayDiff: (val, args) => differenceInDays(args[0], val),
  weekDiff: (val, args) => differenceInWeeks(args[0], val),
  monthDiff: (val, args) => differenceInMonths(args[0], val),
  yearDiff: (val, args) => differenceInYears(args[0], val),
};

export const dispatch = (base: any, functionName: string, args: any[]): any => {
  if (functionName in GENERIC_FUNCTIONS) return GENERIC_FUNCTIONS[functionName](base, args);
  if (typeof base === 'number' && functionName in NUMBER_FUNCTIONS) return NUMBER_FUNCTIONS[functionName](base, args);
  if (base instanceof Date && functionName in DATE_FUNCTIONS) return DATE_FUNCTIONS[functionName](base, args);
  throw new Error(`Function '${functionName}' not found for type ${typeof base}`);
};

const DATE_PART_PATTERN = /^(\d+)([DdWwMmYy])$/;
export const handleDatePartArithmetic = (baseDate: Date, datePart: string, sign: 1 | -1): Date => {
  const match = datePart.match(DATE_PART_PATTERN);
  if (!match) throw new Error(`Invalid DatePart format: ${datePart}`);
  const amount = parseInt(match[1], 10) * sign;
  const unit = match[2].toLowerCase();
  switch (unit) {
    case 'd': return addDays(baseDate, amount);
    case 'w': return addWeeks(baseDate, amount);
    case 'm': return addMonths(baseDate, amount);
    case 'y': return addYears(baseDate, amount);
    default: throw new Error(`Unknown date part unit: ${unit}`);
  }
};
