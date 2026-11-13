import { ALPHABET } from "./alphabet.js";
import { normalizeText } from "./normalize.js";

/**
 * Перевіряє ключ простої заміни.
 * Ключ повинен містити всі 33 літери без повторень.
 */
export function validateSubstitutionKey(key) {
  const normalized = normalizeText(key);

  if ([...normalized].length !== ALPHABET.length) {
    throw new Error("Ключ заміни повинен містити рівно 33 літери.");
  }

  if ([...normalized].some((letter) => !ALPHABET.includes(letter))) {
    throw new Error("Ключ містить символи поза українським алфавітом.");
  }

  if (new Set(normalized).size !== ALPHABET.length) {
    throw new Error("Ключ заміни не повинен містити повторень.");
  }

  return normalized;
}

/**
 * Перевіряє ключ шифру Віженера.
 */
export function validateVigenereKey(key) {
  const normalized = normalizeText(key);

  if (!normalized.length) {
    throw new Error("Ключ Віженера не може бути порожнім.");
  }

  if ([...normalized].some((letter) => !ALPHABET.includes(letter))) {
    throw new Error("Ключ Віженера повинен містити лише українські літери.");
  }

  return normalized;
}

/**
 * Перевіряє перестановку чисел від 1 до n.
 */
export function validatePermutationKey(key, n) {
  const values = Array.isArray(key)
    ? key
    : String(key).trim().split(/[\s,;]+/).map(Number);

  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Довжина перестановки повинна бути додатним числом.");
  }

  if (
    values.length !== n ||
    values.some((value) => !Number.isInteger(value) || value < 1 || value > n) ||
    new Set(values).size !== n
  ) {
    throw new Error(`Ключ повинен бути перестановкою чисел від 1 до ${n}.`);
  }

  return values;
}

/**
 * Перевіряє кількість символів доповнення.
 */
export function validatePaddingCount(count, blockLength) {
  if (
    !Number.isInteger(count) ||
    count < 0 ||
    count >= blockLength
  ) {
    throw new Error(
      `Кількість символів доповнення повинна бути від 0 до ${blockLength - 1}.`
    );
  }

  return count;
}