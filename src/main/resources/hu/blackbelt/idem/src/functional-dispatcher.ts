import {
  addDays, addMonths, addWeeks, addYears, differenceInDays, differenceInMonths, differenceInSeconds,
  differenceInWeeks, differenceInYears, getDay, getDayOfYear, getHours, getMinutes,
  getMonth, getSeconds, getWeek, getWeekOfMonth, getYear
} from 'date-fns';

type Func = (base: any, args: any[]) => any;

// Helper for rounding to a specific precision with native numbers
const roundToPrecision = (val: number, precision: number): number => {
  const factor = 10 ** precision;
  return Math.round(val * factor) / factor;
};

// --- Function Maps ---
const OBJECT_FUNCTIONS: Record<string, Func> = {
  isDefined: (val) => val !== null && val !== undefined,
  isUndefined: (val) => val === null || val === undefined,
  size: (val) => {
    if (Array.isArray(val) || typeof val === 'string') return val.length;
    if (typeof val === 'object' && val !== null) return Object.keys(val).length;
    throw new Error(`size() cannot be called on Array, Object or String.`);
  },
  toInt: (val) => (typeof val === 'boolean' ? (val ? 1 : 0) : undefined),
};

const NUMBER_FUNCTIONS: Record<string, Func> = {
  // Overloaded: handles round() and round(precision)
  round: (val, args) => roundToPrecision(val, args[0] ?? 0),
  floor: (val, args) => {
    const p = args[0] ?? 0;
    return Math.floor(val * 10 ** p) / 10 ** p;
  },
  ceil: (val, args) => {
    const p = args[0] ?? 0;
    return Math.ceil(val * 10 ** p) / 10 ** p;
  },
};

const STRING_FUNCTIONS: Record<string, Func> = {
  lowerCase: (val) => val.toLowerCase(),
  upperCase: (val) => val.toUpperCase(),
  length: (val) => val.length,
  trim: (val) => val.trim(),
  substring: (val, args) => val.substring(args[0], args[0] + args[1]),
  first: (val, args) => val.substring(0, args[0]),
  last: (val, args) => val.substring(val.length - args[0]),
  position: (val, args) => val.indexOf(args[0]),
  matches: (val, args) => new RegExp(args[0]).test(val),
  replace: (val, args) => val.replace(new RegExp(args[0], 'g'), args[1]),
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
  // Old ...Diff functions
  dayDiff: (val, args) => differenceInDays(args[0], val),
  weekDiff: (val, args) => differenceInWeeks(args[0], val),
  monthDiff: (val, args) => differenceInMonths(args[0], val),
  yearDiff: (val, args) => differenceInYears(args[0], val),
  // New difference function
  difference: (val, args) => differenceInSeconds(args[0], val),
};

// --- Dispatcher ---
export const dispatch = (base: any, functionName: string, args: any[]): any => {
  if (functionName in OBJECT_FUNCTIONS) return OBJECT_FUNCTIONS[functionName](base, args);
  if (typeof base === 'number' && functionName in NUMBER_FUNCTIONS) return NUMBER_FUNCTIONS[functionName](base, args);
  if (typeof base === 'string' && functionName in STRING_FUNCTIONS) return STRING_FUNCTIONS[functionName](base, args);
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
