import { describe, it, expect } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  readTextFile,
  writeTextFile,
} from "../src/services/fileService.js";

describe("Робота з текстовими файлами", () => {
  let testDirectory;

  it("створює тимчасову папку для тестів", async () => {
    testDirectory = await mkdtemp(
      path.join(tmpdir(), "lab1-ciphers-")
    );

    expect(testDirectory).toBeTruthy();
  });

  it("записує та читає український текст UTF-8", async () => {
    const filePath = path.join(testDirectory, "test.txt");
    const text = "Привіт! Україна. Шифрування.";

    await writeTextFile(filePath, text);
    const result = await readTextFile(filePath);

    expect(result).toBe(text);
  });

  it("зберігає кілька рядків і переноси", async () => {
    const filePath = path.join(testDirectory, "multiline.txt");
    const text = "Перший рядок\nДругий рядок\nТретій рядок\n";

    await writeTextFile(filePath, text);
    const result = await readTextFile(filePath);

    expect(result).toBe(text);
  });

  it("працює з порожнім файлом", async () => {
    const filePath = path.join(testDirectory, "empty.txt");

    await writeTextFile(filePath, "");
    const result = await readTextFile(filePath);

    expect(result).toBe("");
  });

  it("відхиляє порожній шлях", async () => {
    await expect(readTextFile("")).rejects.toThrow();
    await expect(writeTextFile("", "Текст")).rejects.toThrow();
  });

  it("відхиляє нестроковий вміст", async () => {
    const filePath = path.join(testDirectory, "invalid.txt");

    await expect(writeTextFile(filePath, 123)).rejects.toThrow();
  });

  it("видаляє тимчасову папку після тестів", async () => {
    await rm(testDirectory, { recursive: true, force: true });

    expect(true).toBe(true);
  });
});