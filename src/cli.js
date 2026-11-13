import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import {
  generateSubstitutionAlphabet,
  encryptSubstitution,
  decryptSubstitution,
} from "./algorithms/substitution.js";

import {
  encryptVigenere,
  decryptVigenere,
} from "./algorithms/vigenere.js";

import {
  encryptBlockPermutation,
  decryptBlockPermutation,
} from "./algorithms/blockPermutation.js";

import {
  encryptColumnarTransposition,
  decryptColumnarTransposition,
} from "./algorithms/columnarTransposition.js";

import {
  readTextFile,
  writeTextFile,
} from "./services/fileService.js";

const rl = createInterface({ input: stdin, output: stdout });

async function ask(question) {
  return (await rl.question(question)).trim();
}

async function getText() {
  console.log("\nЗвідки отримати текст?");
  console.log("1. Ввести вручну");
  console.log("2. Прочитати з файлу");

  const choice = await ask("Ваш вибір: ");

  if (choice === "1") {
    return await rl.question("Введіть текст: ");
  }

  if (choice === "2") {
    const filePath = await ask("Шлях до файлу: ");
    return await readTextFile(filePath);
  }

  throw new Error("Невідомий спосіб введення тексту.");
}

async function main() {
  try {
    console.log("\n==================================");
    console.log("   ПРОГРАМА ШИФРУВАННЯ ТЕКСТУ");
    console.log("==================================");

    console.log("\nОберіть алгоритм:");
    console.log("1. Моноалфавітна заміна");
    console.log("2. Шифр Віженера");
    console.log("3. Блочна перестановка");
    console.log("4. Вертикальна перестановка");

    const algorithm = await ask("\nВаш вибір: ");

    console.log("\nОберіть операцію:");
    console.log("1. Шифрування");
    console.log("2. Розшифрування");

    const operation = await ask("Ваш вибір: ");

    if (!["1", "2"].includes(operation)) {
      throw new Error("Невідома операція.");
    }

    const decrypt = operation === "2";
    const text = await getText();

    let result = "";

    switch (algorithm) {
      case "1": {
        const keyword = await ask("Введіть ключове слово: ");
        const key = generateSubstitutionAlphabet(keyword);

        result = decrypt
          ? decryptSubstitution(text, key)
          : encryptSubstitution(text, key);

        break;
      }

      case "2": {
        const key = await ask("Введіть ключ Віженера: ");

        result = decrypt
          ? decryptVigenere(text, key)
          : encryptVigenere(text, key);

        break;
      }

      case "3": {
        const keyInput = await ask(
          "Введіть перестановку (наприклад 3 2 5 1 4): "
        );

        const key = keyInput.split(/[\s,;]+/).map(Number);

        const mode = await ask(
          "Режим: preserve або lettersOnly (Enter = preserve): "
        );

        const selectedMode = mode || "preserve";

        result = decrypt
          ? decryptBlockPermutation(text, key, selectedMode)
          : encryptBlockPermutation(text, key, selectedMode);

        break;
      }

      case "4": {
        const keyInput = await ask(
          "Введіть порядок стовпців (наприклад 3 1 4 2): "
        );

        const key = keyInput.split(/[\s,;]+/).map(Number);

        if (decrypt) {
          const paddingCount = Number(
            await ask("Кількість символів доповнення: ")
          );

          result = decryptColumnarTransposition(
            text,
            key,
            paddingCount
          );
        } else {
          const encrypted = encryptColumnarTransposition(text, key);

          result = encrypted.ciphertext;

          console.log(
            `Кількість символів доповнення: ${encrypted.paddingCount}`
          );
          console.log(
            `Символ доповнення: ${encrypted.paddingChar}`
          );
        }

        break;
      }

      default:
        throw new Error("Невідомий алгоритм.");
    }

    console.log("\n==================================");
    console.log(decrypt ? "РЕЗУЛЬТАТ РОЗШИФРУВАННЯ:" : "РЕЗУЛЬТАТ ШИФРУВАННЯ:");
    console.log("==================================");
    console.log(result);

    const save = await ask("\nЗберегти результат у файл? (так/ні): ");

    if (save.toLowerCase() === "так") {
      const outputPath = await ask("Введіть шлях до файлу: ");
      await writeTextFile(outputPath, result);
      console.log("Результат успішно збережено.");
    }
  } catch (error) {
    console.error("\nПомилка:", error.message);
  } finally {
    rl.close();
  }
}

main();