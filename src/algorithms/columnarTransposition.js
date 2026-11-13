import { normalizeText } from "../utils/normalize.js";
import {
  validatePermutationKey,
  validatePaddingCount,
} from "../utils/validation.js";

/**
 * Шифрує текст вертикальною перестановкою.
 *
 * Текст записується в таблицю по рядках.
 * Потім стовпці читаються в порядку, заданому ключем.
 *
 * Повертає шифротекст і кількість символів доповнення.
 */
export function encryptColumnarTransposition(
  text,
  key,
  paddingChar = "Х"
) {
  const normalized = normalizeText(text);
  const permutation = validatePermutationKey(key, key.length);
  const columns = permutation.length;

  if ([...paddingChar].length !== 1) {
    throw new Error("Символ доповнення повинен бути одним символом.");
  }

  const paddingCount = (columns - (normalized.length % columns)) % columns;
  const paddedText = normalized + paddingChar.repeat(paddingCount);

  const rows = [];

  for (let i = 0; i < paddedText.length; i += columns) {
    rows.push([...paddedText.slice(i, i + columns)]);
  }

  let ciphertext = "";

  for (const columnNumber of permutation) {
    const columnIndex = columnNumber - 1;

    for (const row of rows) {
      ciphertext += row[columnIndex];
    }
  }

  return {
    ciphertext,
    paddingCount,
    paddingChar,
  };
}

/**
 * Розшифровує вертикальну перестановку.
 *
 * Для правильного видалення доповнення необхідно
 * передати paddingCount, отриманий під час шифрування.
 */
export function decryptColumnarTransposition(
  ciphertext,
  key,
  paddingCount = 0,
  paddingChar = "Х"
) {
  const normalized = normalizeText(ciphertext);
  const permutation = validatePermutationKey(key, key.length);
  const columns = permutation.length;

  validatePaddingCount(paddingCount, columns);

  if (normalized.length % columns !== 0) {
    throw new Error("Довжина шифротексту повинна ділитися на кількість стовпців.");
  }

  if ([...paddingChar].length !== 1) {
    throw new Error("Символ доповнення повинен бути одним символом.");
  }

  const rowsCount = normalized.length / columns;
  const matrix = Array.from(
    { length: rowsCount },
    () => new Array(columns)
  );

  let position = 0;

  for (const columnNumber of permutation) {
    const columnIndex = columnNumber - 1;

    for (let row = 0; row < rowsCount; row++) {
      matrix[row][columnIndex] = normalized[position++];
    }
  }

  let plaintext = matrix.map((row) => row.join("")).join("");

  if (paddingCount > 0) {
    plaintext = plaintext.slice(0, -paddingCount);
  }

  return plaintext;
}