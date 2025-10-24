// src/config/languages/python.ts

export const pythonLanguage = {
  reservedWords: [
    "if", "else", "elif", "for", "while", "def", "return",
    "class", "import", "from", "as", "try", "except", "finally",
    "with", "True", "False", "None", "break", "continue", "pass"
  ],

  operators: [
    "\\+", "-", "\\*", "/", "%", "==", "!=", "<", ">", "<=", ">=", "=",
    "and", "or", "not"
  ],

  grouping: ["\\(", "\\)", "\\[", "\\]", "\\{", "\\}", ",", ":", ";", "\\."],


  comment: {
    single: "#.*",
    multi: '""".*?"""|\'\'\'.*?\'\'\''
  },

  string: {
    patterns: ['".*?"', "'.*?'"]
  },

  number: {
    pattern: "\\b\\d+(\\.\\d+)?\\b"
  },

  identifier: {
    pattern: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b"
  }
};
