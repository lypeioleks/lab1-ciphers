import { readFile, writeFile } from "node:fs/promises";

/**
 * Читає текстовий файл у кодуванні UTF-8.
 */
export async function readTextFile(filePath) {
  if (typeof filePath !== "string" || !filePath.trim()) {
    throw new Error("Необхідно вказати шлях до файлу.");
  }

  return await readFile(filePath, "utf8");
}

/**
 * Записує текст у файл у кодуванні UTF-8.
 */
export async function writeTextFile(filePath, content) {
  if (typeof filePath !== "string" || !filePath.trim()) {
    throw new Error("Необхідно вказати шлях до файлу.");
  }

  if (typeof content !== "string") {
    throw new TypeError("Вміст файлу повинен бути рядком.");
  }

  await writeFile(filePath, content, "utf8");
}