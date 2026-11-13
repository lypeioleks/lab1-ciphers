export { ALPHABET, ALPHABET_LENGTH, ALPHABET_MAP } from "./utils/alphabet.js";

export {
  normalizeText,
  getLettersOnly,
} from "./utils/normalize.js";

export {
  validateSubstitutionKey,
  validateVigenereKey,
  validatePermutationKey,
  validatePaddingCount,
} from "./utils/validation.js";

export {
  generateSubstitutionAlphabet,
  encryptSubstitution,
  decryptSubstitution,
} from "./algorithms/substitution.js";

export {
  encryptVigenere,
  decryptVigenere,
} from "./algorithms/vigenere.js";

export {
  encryptBlockPermutation,
  decryptBlockPermutation,
} from "./algorithms/blockPermutation.js";

export {
  encryptColumnarTransposition,
  decryptColumnarTransposition,
} from "./algorithms/columnarTransposition.js";

export {
  readTextFile,
  writeTextFile,
} from "./services/fileService.js";