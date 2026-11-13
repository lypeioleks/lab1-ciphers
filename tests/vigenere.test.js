import { describe, it, expect } from "vitest";
import {
  encryptVigenere,
  decryptVigenere,
} from "../src/algorithms/vigenere.js";
import { ALPHABET } from "../src/utils/alphabet.js";

describe("Шифр Віженера", () => {
  const key = "КЛЮЧ";

  it("шифрує контрольний приклад з методички", () => {
    expect(encryptVigenere("СЛАВА УКРАЇНІ", key))
      .toBe("ВЬЮЩК ДЇККЧЛД");
  });

  it("розшифровує контрольний приклад", () => {
    expect(decryptVigenere("ВЬЮЩК ДЇККЧЛД", key))
      .toBe("СЛАВА УКРАЇНІ");
  });

  it("не змінює пробіли, цифри та пунктуацію", () => {
    const text = "ПРИВІТ! 123, УКРАЇНО.";
    const encrypted = encryptVigenere(text, key);

    expect(encrypted).toContain("! 123, ");
    expect(decryptVigenere(encrypted, key)).toBe(text);
  });

  it("не пересуває ключ на пробілах", () => {
    expect(encryptVigenere("А А", "Б")).toBe("Б Б");
  });

  it("працює з усіма літерами українського алфавіту", () => {
    const encrypted = encryptVigenere(ALPHABET.join(""), key);

    expect(decryptVigenere(encrypted, key))
      .toBe(ALPHABET.join(""));
  });

  it("підтримує ключ у нижньому регістрі", () => {
    expect(encryptVigenere("ТЕСТ", "ключ"))
      .toBe(encryptVigenere("ТЕСТ", "КЛЮЧ"));
  });

  it("відхиляє порожній ключ", () => {
    expect(() => encryptVigenere("ТЕСТ", "")).toThrow();
  });

  it("відхиляє ключ із недопустимими символами", () => {
    expect(() => encryptVigenere("ТЕСТ", "KEY123")).toThrow();
  });

  it("працює з порожнім текстом", () => {
    expect(encryptVigenere("", key)).toBe("");
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
    const encrypted = encryptVigenere(text, key);

    expect(decryptVigenere(encrypted, key)).toBe(text);
  });
});