type ExtractionStrategy = (result: RegExpMatchArray) => number | null;

interface TimeParseRuleResult {
  seconds: number;
}

class TimeParseRule {
  regExRule: RegExp;
  value: string;
  secondsExtractionStrategy: ExtractionStrategy;

  constructor(
    regExRule: RegExp,
    value: string,
    extractionStrategy: ExtractionStrategy
  ) {
    this.regExRule = regExRule;
    this.value = value;
    this.secondsExtractionStrategy = extractionStrategy;
  }

  parseRule(): TimeParseRuleResult | null {
    const result = this.regExRule.exec(this.value);
    if (result === null || result.length === 0) {
      return null;
    }
    const seconds = this.secondsExtractionStrategy(result);
    if (seconds === null) {
      return null;
    }
    return { seconds };
  }
}

const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const HOURS_IN_DAY = 24;
const HOURS_IN_12_CLOCK = 12;
const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;

const SIGN_MINUS = -1;
const SIGN_PLUS = 1;

const unifySeparator = (value: string) => value.replace(/[,.;]/g, '.');
const extractSign = (result: RegExpMatchArray) =>
  result.groups!['sign'] ? SIGN_MINUS : SIGN_PLUS;
const extractHours = (result: RegExpMatchArray) =>
  parseFloat(unifySeparator(result.groups!['hours']));
const extractMinutes = (result: RegExpMatchArray) =>
  parseInt(result.groups!['minutes'], 10);
const extractAbbreviation = (result: RegExpMatchArray) =>
  result.groups!['abbreviation']?.toLowerCase();
const extractDecimal = (result: RegExpMatchArray) =>
  parseFloat(unifySeparator(result.groups!['decimal']));

// Main strategies
function fromHoursSigned(result: RegExpMatchArray): number | null {
  const sign = extractSign(result);
  const hours = extractHours(result);
  if (hours > HOURS_IN_DAY) {
    return null;
  }
  const correctedSign = hours === 0 ? SIGN_PLUS : sign; // edge case: zero cannot have minus mark
  return correctedSign * hours * SECONDS_IN_HOUR;
}

function fromMinutesSigned(result: RegExpMatchArray): number | null {
  const sign = extractSign(result);
  const minutes = extractMinutes(result);
  if (minutes > HOURS_IN_DAY * MINUTES_IN_HOUR) {
    return null;
  }
  const correctedSign = minutes === 0 ? SIGN_PLUS : sign; // edge case: zero cannot have minus mark
  return correctedSign * minutes * SECONDS_IN_MINUTE;
}

function fromHoursAndMinutesSigned(result: RegExpMatchArray): number | null {
  const sign = extractSign(result);
  const hours = extractHours(result);
  const minutes = extractMinutes(result);
  const totalSeconds = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE;
  if (
    hours > HOURS_IN_DAY ||
    minutes > MINUTES_IN_HOUR - 1 ||
    totalSeconds > SECONDS_IN_DAY
  ) {
    return null;
  }
  const correctedSign = totalSeconds === 0 ? SIGN_PLUS : sign; // edge case: zero cannot have minus mark
  return correctedSign * totalSeconds;
}

function fromDecimalSigned(result: RegExpMatchArray): number | null {
  const sign = extractSign(result);
  const decimalValue = extractDecimal(result);
  if (isNaN(decimalValue) || decimalValue > HOURS_IN_DAY) {
    return null;
  }
  return sign * decimalValue * SECONDS_IN_HOUR;
}

function from12HoursClock(result: RegExpMatchArray): number | null {
  let hours = extractHours(result);
  const minutes = extractMinutes(result);
  const abbreviation = extractAbbreviation(result);

  if (hours > HOURS_IN_12_CLOCK || minutes > MINUTES_IN_HOUR - 1) {
    return null;
  }

  if (abbreviation === 'pm') {
    hours = hours + HOURS_IN_12_CLOCK;
  }

  const totalSeconds = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE;
  return totalSeconds;
}

interface TimeParserResult {
  isValid: boolean;
  seconds?: number | null;
}

export class TimeParser {
  private value: string | null | undefined;

  constructor(value: string | null | undefined) {
    this.value = value;
  }

  public parse(): TimeParserResult {
    if (!this.value) {
      return {
        isValid: true,
        seconds: 0,
      };
    }

    const result = this.parseRules(this.value);
    return {
      isValid: result !== null,
      seconds: result,
    };
  }

  private parseRules(value: string): number | null {
    const rules = [
      // 4-digit
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d\d)(?<minutes>\d\d)$/giu,
        value,
        fromHoursAndMinutesSigned
      ),
      // decimal value
      new TimeParseRule(
        /^(?<sign>-)?(?<decimal>\d{1,2}[.,;]?\d{0,2})$/giu,
        value,
        fromDecimalSigned
      ),
      // 12 hours clock, am/pm
      new TimeParseRule(
        /^(?<hours>\d{1,2}):(?<minutes>\d{2})(?<abbreviation>[ap]m)$/giu,
        value,
        from12HoursClock
      ),

      // positive or negative 1-digit or 2-digit hours
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d{1,2})h$/giu,
        value,
        fromHoursSigned
      ),

      // positive or negative 1-digit or 2-digit or 3-digit minutes
      new TimeParseRule(
        /^(?<sign>-)?(?<minutes>\d{1,3})m$/giu,
        value,
        fromMinutesSigned
      ),

      // positive or negative 1-digit or 2-digit hours and 1-digit or 2-digit minutes
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d{1,2})h(?<minutes>\d{1,2})m$/giu,
        value,
        fromHoursAndMinutesSigned
      ),

      // 1-digit
      new TimeParseRule(/^(?<sign>-)?(?<hours>\d)$/giu, value, fromHoursSigned),

      // 2 digits, first digit is not a zero
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>[1-9]\d)$/giu,
        value,
        fromHoursSigned
      ),

      // 2-digits, first digit is a zero
      new TimeParseRule(
        /^(?<sign>-)?(?<minutes>0\d)$/giu,
        value,
        fromMinutesSigned
      ),

      // 3-digit
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d)(?<minutes>\d\d)$/giu,
        value,
        fromHoursAndMinutesSigned
      ),

      // digits with separator
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d\d)[,.;:](?<minutes>\d\d)$/giu,
        value,
        fromHoursAndMinutesSigned
      ),

      // 2 digits with separator
      new TimeParseRule(
        /^(?<hours>\d{1,2}):(?<minutes>\d{2})$/giu,
        value,
        fromHoursAndMinutesSigned
      ),

      // Scenario for single digits with separator
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d[,.;]\d)$/giu,
        value,
        fromHoursSigned
      ),

      // single digit with separator without second value
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d+(\.\d+)?)$/giu,
        value,
        fromHoursSigned
      ),

      // digits with separator with second value
      new TimeParseRule(
        /^(?<sign>-)?(?<hours>\d\d)[,.;:](?<minutes>\d\d)$/giu,
        value,
        fromHoursAndMinutesSigned
      ),
    ];

    for (let i = 0; i < rules.length; i++) {
      const parseResult = rules[i].parseRule();
      if (parseResult) {
        return parseResult.seconds;
      }
    }

    return null;
  }
}
