export const convertMillisToHrsMinsSecs = (millis: number) => {
  const h = Math.floor(millis / 3600000);
  const m = Math.floor((millis / 60000) % 60);
  const s = Math.round((millis / 1000) % 60);
  const hours = h < 10 ? '0' + h : h;
  const minutes = m < 10 ? '0' + m : m;
  const seconds = s < 10 ? '0' + s : s;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const convertMillisToHrsMins = (millis: number) => {
  const h = Math.floor(millis / 3600000);
  const m = Math.round((millis / 60000) % 60);
  const hours = h < 10 ? '0' + h : h;
  const minutes = m < 10 ? '0' + m : m;

  return {
    hours,
    minutes,
  };
};
