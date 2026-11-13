import { describe, it, expect } from "vitest";
import {
  encryptBlockPermutation,
  decryptBlockPermutation,
} from "../src/algorithms/blockPermutation.js";

describe("Блочна перестановка", () => {
  const key = [3, 2, 5, 1, 4];

  it("шифрує контрольний приклад з методички", () => {
    expect(
      encryptBlockPermutation("СЛАВА УКРАЇНІ", key, "lettersOnly")
    ).toBe("АЛАСВРКЇУАНІ");
  });

  it("розшифровує контрольний приклад", () => {
    expect(
      decryptBlockPermutation("АЛАСВРКЇУАНІ", key, "lettersOnly")
    ).toBe("СЛАВАУКРАЇНІ");
  });

  it("залишає неповний останній блок без змін", () => {
    expect(encryptBlockPermutation("АБВГДЕЖ", key))
      .toBe("ВБДАГЕЖ");
  });

  it("зберігає пробіли та пунктуацію в режимі preserve", () => {
    const text = "ТЕСТ! 123";
    const encrypted = encryptBlockPermutation(text, key);

    expect(decryptBlockPermutation(encrypted, key)).toBe(text);
  });

  it("працює з порожнім текстом", () => {
    expect(encryptBlockPermutation("", key)).toBe("");
  });

  it("працює з одним символом", () => {
    expect(encryptBlockPermutation("А", key)).toBe("А");
  });

  it("відхиляє некоректний ключ", () => {
    expect(() => encryptBlockPermutation("ТЕСТ", [1, 2, 2]))
      .toThrow();
  });

  it("підтримує режим lettersOnly", () => {
    expect(encryptBlockPermutation("А Б В Г Д", [2, 1], "lettersOnly"))
      .toBe("БАГВД");
  });

  it.each([
    "ПЕРШЕПОВІДОМЛЕННЯ",
    "ДРУГЕПОВІДОМЛЕННЯ",
    "УКРАЇНСЬКАМОВА",
    "ПРОГРАМУВАННЯ",
    "ШИФРУВАННЯ",
    "КРИПТОГРАФІЯ",
    "АБВГҐДЕЄЖЗ",
    "ИЙКЛМНОПРСТ",
    "УФХЦЧШЩЬЮЯ",
    "ТЕКСТДЛЯПЕРЕВІРКИ",
  ])("шифрує та розшифровує: %s", (text) => {
    const encrypted = encryptBlockPermutation(text, key);

    expect(decryptBlockPermutation(encrypted, key)).toBe(text);
  });
});