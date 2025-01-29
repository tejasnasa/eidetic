function getRandomValues(count: number): number[] {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectedValues = new Set<number>();

  while (selectedValues.size < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    selectedValues.add(arr[randomIndex]);
  }

  return Array.from(selectedValues);
}

export const gameData = Array.from({ length: 16 }, (_, i) =>
  getRandomValues(i + 1)
);
