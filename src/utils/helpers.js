export const generateRandom8DigitNumber = () => {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
