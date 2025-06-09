import { IdemParser } from "./generated/IdemParser";
import { TokenStream } from "antlr4ng";

/**
 * This file extends the generated IdemParser with custom methods for semantic predicates.
 * Using declaration merging, we add the `isIterator` method to the IdemParser class prototype.
 * This keeps the grammar file (.g4) target-agnostic.
 */
declare module '~/generated/IdemParser' {
    interface IdemParser {
        isIterator(): boolean;
    }
}

/**
 * Implementation of the isIterator predicate for the TypeScript target.
 * It checks if the token following an Identifier is a '|'.
 * In antlr4ng, the input stream is `this.inputStream`.
 */
IdemParser.prototype.isIterator = function(): boolean {
    const stream = this.inputStream as TokenStream;
    // Get the token first and check if it's null before accessing properties.
    const lookaheadToken = stream.LT(2);
    if (!lookaheadToken) {
        return false;
    }
    return lookaheadToken.text === "|";
}
