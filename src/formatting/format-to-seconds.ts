interface FormatToSecondsResult {
  isValid: boolean;
  seconds: number | null;
}

export const secondsToHours = (seconds: number = 0) => seconds / 3600;

export const hoursToSeconds = (hours: number = 0) => hours * 3600;

export const formatToSeconds = (
  input: string | undefined,
  max24: boolean = true
): FormatToSecondsResult => {
  let result: FormatToSecondsResult = {
    isValid: false,
    seconds: null,
  };

  if (!input) {
    result.isValid = true;
    return result;
  }

  let isNegative = false;

  // replace comma/semicolon for dot
  input = input.replace(',', '.').replace(';', '.');

  // is negative value
  if (input.includes('-')) {
    input = input.replace('-', '');
    isNegative = true;
  }

  // 01:30    = 1.5 hour
  // 1:30     = 1.5 hour
  // :30      = 0.5 hour
  if (input.includes(':')) {
    const h = parseInt(input.split(':')[0], 10) || 0;
    const m = parseFloat(input.split(':')[1]) / 60;
    result.seconds = (h + m) * 3600;
  }

  // 1h30m       = 1.5 hour
  else if (input.includes('h') && input.includes('m')) {
    const a = input.split(/h|m/);
    const h = parseInt(a[0], 10) || 0;
    const m = parseFloat(a[1]) / 60;
    result.seconds = (h + m) * 3600;
  }

  // 1h       = 1 hour
  else if (input.includes('h')) {
    input = input.replace('h', '');
    result.seconds = parseFloat(input) * 3600;
  }

  // 1m       = 1 minute
  else if (input.includes('m')) {
    input = input.replace('m', '');
    result.seconds = parseFloat(input) * 60;
  }

  // 1.5      = 1.5 hour
  // .5       = 0.5 hour
  else if (input.includes('.')) {
    result.seconds = parseFloat(input) * 3600;
  }

  // 0130     = 1.5 hour
  // 130      = 1.5 hour
  else if (input.length === 3) {
    result.seconds = parseFloat(input) * 60;
  }

  // 0130     = 1.5 hour
  // 1130     = 11.5 hour
  else if (input.length === 4) {
    input = input.replace(/^0/, '');

    if (input.length === 3) {
      const h = parseInt(input[0], 10);
      const m = parseFloat(input[1] + input[2]) / 60;
      result.seconds = (h + m) * 3600;
    } else {
      const h = parseInt(input[0] + input[1], 10);
      const m = parseFloat(input[2] + input[3]) / 60;
      result.seconds = (h + m) * 3600;
    }
  }

  // 24       = 24 hour
  // 1        = 1 hour
  else {
    result.seconds = parseFloat(input) * 3600;
  }

  if (max24 && result.seconds > 24 * 3600) {
    result.seconds = 24 * 3600;
  }

  if (isNegative) {
    result.seconds = result.seconds * -1;
  }

  if (!isNaN(result.seconds)) {
    result.isValid = true;
  }

  return result;
};
