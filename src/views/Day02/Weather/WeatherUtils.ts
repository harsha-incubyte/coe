export const mapWeatherCode = (code: number) => {
  const codes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
  };
  return codes[code] || 'Cloudy';
};
