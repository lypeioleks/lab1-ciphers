export const ALPHABET = [
  ..."АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ",
];

export const ALPHABET_LENGTH = ALPHABET.length;

export const ALPHABET_MAP = new Map(
  ALPHABET.map((letter, index) => [letter, index])
);