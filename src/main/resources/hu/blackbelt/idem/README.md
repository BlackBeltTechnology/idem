# Idem Query Language

[![EPL-2.0 license](https://img.shields.io/badge/License-EPL--2.0-blue.svg)](https://opensource.org/licenses/EPL-2.0)

## Overview

Idem is a powerful and expressive query language designed for filtering and manipulating data. This library provides a lightweight, zero-dependency parser and evaluator for the Idem language, built with TypeScript and ANTLR4.

It is designed to be easily integrated into any JavaScript or TypeScript project, whether it's running in Node.js or the browser.

## Features

*   **Expressive Syntax**: A clear and concise syntax for complex queries.
*   **TypeScript Native**: Fully written in TypeScript with type definitions included.
*   **Cross-platform**: Works in both Node.js and modern browsers.
*   **Extensible**: The ANTLR grammar is available for extension and integration with other tools.

## Installation

You can install the library using your favorite package manager:

```bash
npm install idem
pnpm install idem
...
```

## Usage

The primary way to use the library is by importing the `evaluate` function. You can pass it an Idem query string and a context object containing the data you want to query.

Here is a simple example:

```typescript
import { evalExpr } from 'idem';

// The context object contains the data you want to query.
// The 'self' property is the root of the data.

const context = {
  self: { a: 1.5, b: 2, items: [1, 2, 3], },
};

// --- Example 1: Simple Arithmetic ---

const result1 = evalExpr('20 - 5');

console.log(result1); // Output: 15

// --- Example 2: Checking for an item in a list ---

const result2 = evalExpr('2 in self.items', context);

console.log(result2); // Output: true

```

## Development

This project uses TypeScript, Vite for bundling, and Vitest for testing.

### Project Structure

*   `src/`: Main source code of the library.
*   `src/generated/`: ANTLR-generated parser files from `Idem.g4`.
*   `Idem.g4`: The ANTLR grammar definition for the Idem language.
*   `vite.config.ts`: Vite build configuration.
*   `vitest.config.ts`: Vitest test configuration.

### Available Scripts

The following scripts are available:

*   `pnpm dev`: Starts the Vite development server.
*   `pnpm build`: Compiles TypeScript and builds the library for production.
*   `pnpm generate:antlr`: Regenerates the ANTLR parser from `Idem.g4`.
*   `pnpm test`: Runs the test suite using Vitest.
*   `pnpm coverage`: Runs tests and generates a coverage report.
*   `pnpm format`: Formats the code using Biome.
*   `pnpm lint`: Lints the code using Biome.

## Contributing

Contributions are welcome! We thank the following contributors for their work on this project:

*   **Norbert Herczeg** ([@noherczeg](https://github.com/noherczeg))

Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the Eclipse Public License 2.0. See the [LICENSE.txt](LICENSE.txt) fil
