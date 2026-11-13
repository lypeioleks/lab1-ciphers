export function normalizeText(text) {
  if (typeof text !== "string") {
    throw new TypeError("Текст повинен бути рядком.");
  }

  return text.normalize("NFC").toUpperCase();
}

/**
 * Залишає лише українськф літери.
 */
export function getLettersOnly(text, alphabet) {
  const normalized = normalizeText(text);

  return [...normalized]
    .filter((character) => alphabet.includes(character))
    .join("");
}