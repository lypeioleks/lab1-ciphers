import { ALPHABET } from "../utils/alphabet.js";
import { normalizeText } from "../utils/normalize.js";
import { validateSubstitutionKey } from "../utils/validation.js";

/**
 * Генерує алфавіт заміни з ключового слова.
 * Спочатку додає унікальні літери ключа,
 * потім решту літер українського алфавіту.
 */
export function generateSubstitutionAlphabet(keyword) {
  const normalized = normalizeText(keyword);

  if (!normalized.length) {
    throw new Error("Ключове слово не може бути порожнім.");
  }

  if ([...normalized].some((letter) => !ALPHABET.includes(letter))) {
    throw new Error("Ключове слово повинно містити лише українські літери.");
  }

  const uniqueLetters = [...new Set(normalized)];

  const remainingLetters = ALPHABET.filter(
    (letter) => !uniqueLetters.includes(letter)
  );

  return [...uniqueLetters, ...remainingLetters].join("");
}

/**
 * Шифрує текст простою заміною.
 */
export function encryptSubstitution(text, key) {
  const normalizedText = normalizeText(text);
  const substitutionAlphabet = validateSubstitutionKey(key);

  return [...normalizedText]
    .map((character) => {
      const index = ALPHABET.indexOf(character);

      return index === -1
        ? character
        : substitutionAlphabet[index];
    })
    .join("");
}

/**
 * Розшифровує текст простою заміною.
 */
export function decryptSubstitution(text, key) {
  const normalizedText = normalizeText(text);
  const substitutionAlphabet = validateSubstitutionKey(key);

  return [...normalizedText]
    .map((character) => {
      const index = substitutionAlphabet.indexOf(character);

      return index === -1
        ? character
        : ALPHABET[index];
    })
    .join("");
}