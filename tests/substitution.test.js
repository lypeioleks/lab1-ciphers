import { describe, it, expect } from "vitest";
import {
  generateSubstitutionAlphabet,
  encryptSubstitution,
  decryptSubstitution,
} from "../src/algorithms/substitution.js";
import { ALPHABET } from "../src/utils/alphabet.js";

describe("Моноалфавітна заміна", () => {
  const reverseKey = [...ALPHABET].reverse().join("");

  it("генерує алфавіт заміни з ключового слова", () => {
    const key = generateSubstitutionAlphabet("КРИПТО");

    expect(key).toHaveLength(33);
    expect(new Set(key).size).toBe(33);
    expect([...key].slice(0, 6).join("")).toBe("КРИПТО");
  });

  it("шифрує контрольний приклад з методички", () => {
    expect(encryptSubstitution("СЛАВА УКРАЇНІ", reverseKey))
      .toBe("ІНЯЬЯ ЗОЇЯРЛС");
  });

  it("розшифровує контрольний приклад", () => {
    expect(
      decryptSubstitution("ІНЯЬЯ ЗОЇЯРЛС", reverseKey)
    ).toBe("СЛАВА УКРАЇНІ");
  });

  it("зберігає пробіли, цифри та пунктуацію", () => {
    const text = "Привіт! 123, Україно.";
    const encrypted = encryptSubstitution(text, reverseKey);

    expect(encrypted).toContain("! 123, ");
    expect(decryptSubstitution(encrypted, reverseKey))
      .toBe("ПРИВІТ! 123, УКРАЇНО.");
  });

  it("працює з усіма літерами українського алфавіту", () => {
    const encrypted = encryptSubstitution(ALPHABET.join(""), reverseKey);

    expect(decryptSubstitution(encrypted, reverseKey))
      .toBe(ALPHABET.join(""));
  });

  it("генерує правильний ключ для різного регістру", () => {
    expect(generateSubstitutionAlphabet("крипто"))
      .toBe(generateSubstitutionAlphabet("КРИПТО"));
  });

  it("відхиляє неправильний ключ", () => {
    expect(() => encryptSubstitution("ТЕСТ", "АБВ"))
      .toThrow();
  });

  it("зберігає порожній текст", () => {
    expect(encryptSubstitution("", reverseKey)).toBe("");
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
    const encrypted = encryptSubstitution(text, reverseKey);

    expect(decryptSubstitution(encrypted, reverseKey))
      .toBe(text);
  });
});