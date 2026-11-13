import { describe, it, expect } from "vitest";
import {
  validateSubstitutionKey,
  validateVigenereKey,
  validatePermutationKey,
  validatePaddingCount,
} from "../src/utils/validation.js";
import { ALPHABET } from "../src/utils/alphabet.js";

describe("Перевірка ключів та параметрів", () => {
  it("приймає правильний ключ заміни", () => {
    expect(validateSubstitutionKey(ALPHABET.join("")))
      .toBe(ALPHABET.join(""));
  });

  it("відхиляє короткий ключ заміни", () => {
    expect(() => validateSubstitutionKey("АБВГ"))
      .toThrow();
  });

  it("відхиляє повторення в ключі заміни", () => {
    expect(() => validateSubstitutionKey("А".repeat(33)))
      .toThrow();
  });

  it("відхиляє недопустимі символи в ключі заміни", () => {
    expect(() => validateSubstitutionKey("A".repeat(33)))
      .toThrow();
  });

  it("приймає правильний ключ Віженера", () => {
    expect(validateVigenereKey("КЛЮЧ")).toBe("КЛЮЧ");
  });

  it("відхиляє порожній ключ Віженера", () => {
    expect(() => validateVigenereKey(""))
      .toThrow();
  });

  it("відхиляє латинські літери в ключі Віженера", () => {
    expect(() => validateVigenereKey("KEY"))
      .toThrow();
  });

  it("приймає правильну перестановку", () => {
    expect(validatePermutationKey([3, 2, 5, 1, 4], 5))
      .toEqual([3, 2, 5, 1, 4]);
  });

  it("приймає перестановку у вигляді рядка", () => {
    expect(validatePermutationKey("3 2 5 1 4", 5))
      .toEqual([3, 2, 5, 1, 4]);
  });

  it("відхиляє повторення в перестановці", () => {
    expect(() => validatePermutationKey([1, 2, 2], 3))
      .toThrow();
  });

  it("відхиляє неправильну довжину перестановки", () => {
    expect(() => validatePermutationKey([1, 2], 3))
      .toThrow();
  });

  it("відхиляє числа поза діапазоном перестановки", () => {
    expect(() => validatePermutationKey([1, 2, 4], 3))
      .toThrow();
  });

  it("приймає правильну кількість доповнення", () => {
    expect(validatePaddingCount(2, 4)).toBe(2);
    expect(validatePaddingCount(0, 4)).toBe(0);
  });

  it("відхиляє від'ємну кількість доповнення", () => {
    expect(() => validatePaddingCount(-1, 4))
      .toThrow();
  });

  it("відхиляє кількість доповнення, більшу за допустиму", () => {
    expect(() => validatePaddingCount(4, 4))
      .toThrow();
  });
});