const generateRandomSequence = (): number[][] => {
  // Generate 16 random numbers from 0-9
  const getRandomNumber = () => Math.floor(Math.random() * 10);

  // Create the base sequence of random numbers
  const baseSequence = Array.from({ length: 25 }, () => getRandomNumber());

  // Create arrays of increasing length using the random sequence
  return Array.from({ length: 16 }, (_, index) => {
    return baseSequence.slice(0, index + 1);
  });
};

export const gameData = generateRandomSequence();