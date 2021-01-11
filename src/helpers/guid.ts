export function guid(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

export const EMPTY_GUID: string = '00000000-0000-0000-0000-000000000000';
export const FALLBACK_ID: string = 'C8E9FE5F-E098-49FC-BD1D-0D3EBBDE6E00';
export const DEFAULT_ID: string = 'C8E9FE5F-E098-49FC-BD1D-0D3EBBDE6E01';
