import { describe, it, expect } from "vitest";
import {
  encryptColumnarTransposition,
  decryptColumnarTransposition,
} from "../src/algorithms/columnarTransposition.js";

describe("Вертикальна перестановка", () => {
  const key = [3, 1, 4, 2];

  it("шифрує контрольний приклад з методички", () => {
    const result = encryptColumnarTransposition("КРИПТОГРАФІЯ", key);

    expect(result.ciphertext).toBe("ИГІКТАПРЯРОФ");
    expect(result.paddingCount).toBe(0);
  });

  it("розшифровує контрольний приклад", () => {
    const result = encryptColumnarTransposition("КРИПТОГРАФІЯ", key);

    expect(
      decryptColumnarTransposition(
        result.ciphertext,
        key,
        result.paddingCount,
        result.paddingChar
      )
    ).toBe("КРИПТОГРАФІЯ");
  });

  it("доповнює неповний останній рядок", () => {
    const result = encryptColumnarTransposition("ПРИВІТ", key);

    expect(result.paddingCount).toBe(2);
    expect(result.ciphertext).toHaveLength(8);
  });

  it("видаляє лише доповнювальні символи", () => {
    const text = "ТЕКСТХ";
    const result = encryptColumnarTransposition(text, key);

    const decrypted = decryptColumnarTransposition(
      result.ciphertext,
      key,
      result.paddingCount,
      result.paddingChar
    );

    expect(decrypted).toBe(text);
  });

  it("працює з порожнім текстом", () => {
    const result = encryptColumnarTransposition("", key);

    expect(result.ciphertext).toBe("");
    expect(result.paddingCount).toBe(0);
    expect(
      decryptColumnarTransposition(
        result.ciphertext,
        key,
        result.paddingCount,
        result.paddingChar
      )
    ).toBe("");
  });

  it("працює з текстом довжиною в один символ", () => {
    const result = encryptColumnarTransposition("А", key);

    expect(result.paddingCount).toBe(3);
    expect(
      decryptColumnarTransposition(
        result.ciphertext,
        key,
        result.paddingCount,
        result.paddingChar
      )
    ).toBe("А");
  });

  it("не доповнює текст, якщо довжина кратна кількості стовпців", () => {
    const result = encryptColumnarTransposition("АБВГ", key);

    expect(result.paddingCount).toBe(0);
    expect(result.ciphertext).toHaveLength(4);
  });

  it("відхиляє некоректний ключ", () => {
    expect(() => encryptColumnarTransposition("ТЕСТ", [1, 1, 3, 4]))
      .toThrow();
  });

  it("відхиляє неправильну кількість доповнювальних символів", () => {
    expect(() => decryptColumnarTransposition("АБВГ", key, 4))
      .toThrow();
  });

  it("відхиляє шифротекст неправильної довжини", () => {
    expect(() => decryptColumnarTransposition("АБВ", key, 0))
      .toThrow();
  });

  it("відхиляє багатосимвольний символ доповнення", () => {
    expect(() => encryptColumnarTransposition("ТЕСТ", key, "АБ"))
      .toThrow();
  });

  it.each([
    "ПЕРШЕ ПОВІДОМЛЕННЯ",
    "ДРУГЕ ПОВІДОМЛЕННЯ",
    "УКРАЇНСЬКА МОВА",
    "ПРОГРАМУВАННЯ",
    "ШИФРУВАННЯ",
    "КРИПТОГРАФІЯ",
    "АБВГҐДЕЄЖЗ",
    "ИЙКЛМНОПРСТ",
    "УФХЦЧШЩЬЮЯ",
    "ТЕКСТ ДЛЯ ПЕРЕВІРКИ",
  ])("шифрує та розшифровує: %s", (text) => {
    const result = encryptColumnarTransposition(text, key);

    expect(
      decryptColumnarTransposition(
        result.ciphertext,
        key,
        result.paddingCount,
        result.paddingChar
      )
    ).toBe(text);
  });
});