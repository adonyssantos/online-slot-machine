import { emojiMap } from "./emojiMap";

export const getRandomSymbol = () => {
  const keys = Object.keys(emojiMap);
  return keys[Math.floor(Math.random() * keys.length)];
};
