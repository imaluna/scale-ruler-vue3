export function getColor() {
  const min = 0,
    max = 255;
  const r = getRandomNum(min, max);
  const g = getRandomNum(min, max);
  const b = getRandomNum(min, max);
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomNum(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

export function getInt(num: number) {
  return +num.toFixed(0);
}
