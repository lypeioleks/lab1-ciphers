import { ALPHABET, ALPHABET_MAP } from "../utils/alphabet.js";
import { normalizeText } from "../utils/normalize.js";
import { validateVigenereKey } from "../utils/validation.js";

/**
 * Шифрування та розшифрування Віженера.
 * Ключ рухається лише на літерах українського алфавіту.
 * Пробіли, цифри та пунктуація зберігаються.
 */
function processVigenere(text, key, decrypt = false) {
  const normalizedText = normalizeText(text);
  const normalizedKey = validateVigenereKey(key);

  const keyIndexes = [...normalizedKey].map(
    (letter) => ALPHABET_MAP.get(letter)
  );

  let keyPosition = 0;

  return [...normalizedText]
    .map((character) => {
      const textIndex = ALPHABET_MAP.get(character);

      if (textIndex === undefined) {
        return character;
      }

      const keyIndex = keyIndexes[keyPosition % keyIndexes.length];
      keyPosition++;

      const resultIndex = decrypt
        ? (textIndex - keyIndex + ALPHABET.length) % ALPHABET.length
        : (textIndex + keyIndex) % ALPHABET.length;

      return ALPHABET[resultIndex];
    })
    .join("");
}

/**
 * Шифрує текст алгоритмом Віженера.
 */
export function encryptVigenere(text, key) {
  return processVigenere(text, key, false);
}

/**
 * Розшифровує текст алгоритмом Віженера.
 */
export function decryptVigenere(text, key) {
  return processVigenere(text, key, true);
}