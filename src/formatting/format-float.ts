export function formatFloat(input: string, max24: boolean) {
  if (!input) {
    return 0;
  }

  let float = 0.0;
  let isNegative = false;

  // replace comma for dot
  input = input.replace(',', '.');

  // is negative value
  if (input.includes('-')) {
    input = input.replace('-', '');
    isNegative = true;
  }

  if (input.includes(':')) {
    // 01:30    = 1.5 hour
    // 1:30     = 1.5 hour
    // :30      = 0.5 hour
    const h = parseInt(input.split(':')[0], 10) || 0;
    const m = parseFloat(input.split(':')[1]) / 60;
    float = h + m;
  } else if (
    !input.includes('.') &&
    (input.length === 3 || input.length === 4)
  ) {
    // 0130     = 1.5 hour
    // 130      = 1.5 hour
    input = input.replace(/^0/, '');

    if (input.length === 3) {
      const h = parseInt(input[0], 10);
      const m = parseFloat(input[1] + input[2]) / 60;
      float = h + m;
    } else {
      const h = parseInt(input[0] + input[1], 10);
      const m = parseFloat(input[2] + input[3]) / 60;
      float = h + m;
    }
  } else {
    // 1.5      = 1.5 hour
    // 1,5      = 1.5 hour
    // .5       = 0.5 hour
    // ,5       = 0.5 hour
    // 24       = 24 hour
    // 1        = 1 hour
    float = parseFloat(input);
  }

  if (isNaN(float)) {
    float = 0;
  }

  if (max24 && float > 24) {
    float = 24;
  }

  if (isNegative) {
    float = float * -1;
  }

  return float;
}
