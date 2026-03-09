export interface FunctionParam {
    name: string,
    type: string
};

export interface FunctionSymbol {
    kind: "function",
    name: string,
    type: string | "void",
    params?: FunctionParam[]
};

export interface VariableSymbol {
    kind: "variable",
    name: string,
    type?: string
};

export enum TokenType {
    Keyword,
    PrimitiveType,
    Identifier,
    IntegerLiteral,
    FloatLiteral,
    StringLiteral,
    Operator,
    ParenOpen, //(
    ParenClose, //)
    BraceOpen, //{
    BraceClose, //}
    BracketOpen, // [
    BracketClose, //]
    Ellipsis,
    Comma,
    Semi,
    Karet, //^
    Hash, //#
    At,
    colon, //:
    Error
};

export interface Token {
    type: TokenType,
    value: string,
    row: number,
    col: number
}

export type Symbol = FunctionSymbol | VariableSymbol;