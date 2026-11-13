import { normalizeText, getLettersOnly } from "../utils/normalize.js";
import { validatePermutationKey } from "../utils/validation.js";

/**
 * Шифрує текст блочною перестановкою.
 *
 * Кожен повний блок переставляється відповідно до ключа.
 * Неповний останній блок залишається без змін.
 *
 * Режим preserve: переставляються всі символи.
 * Режим lettersOnly: використовуються лише літери алфавіту.
 */
export function encryptBlockPermutation(
  text,
  key,
  mode = "preserve"
) {
  const normalized = normalizeText(text);
  const preparedText =
    mode === "lettersOnly"
      ? getLettersOnly(normalized, "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ")
      : normalized;

  if (!["preserve", "lettersOnly"].includes(mode)) {
    throw new Error("Невідомий режим обробки тексту.");
  }

  const permutation = validatePermutationKey(key, key.length);
  const blockLength = permutation.length;

  let result = "";

  for (let i = 0; i < preparedText.length; i += blockLength) {
    const block = [...preparedText.slice(i, i + blockLength)];

    if (block.length < blockLength) {
      result += block.join("");
      continue;
    }

    for (const position of permutation) {
      result += block[position - 1];
    }
  }

  return result;
}

/**
 * Розшифровує блочну перестановку.
 */
export function decryptBlockPermutation(
  text,
  key,
  mode = "preserve"
) {
  const normalized = normalizeText(text);
  const preparedText =
    mode === "lettersOnly"
      ? getLettersOnly(normalized, "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ")
      : normalized;

  if (!["preserve", "lettersOnly"].includes(mode)) {
    throw new Error("Невідомий режим обробки тексту.");
  }

  const permutation = validatePermutationKey(key, key.length);
  const blockLength = permutation.length;

  let result = "";

  for (let i = 0; i < preparedText.length; i += blockLength) {
    const block = [...preparedText.slice(i, i + blockLength)];

    if (block.length < blockLength) {
      result += block.join("");
      continue;
    }

    const restored = new Array(blockLength);

    permutation.forEach((originalPosition, encryptedPosition) => {
      restored[originalPosition - 1] = block[encryptedPosition];
    });

    result += restored.join("");
  }

  return result;
}