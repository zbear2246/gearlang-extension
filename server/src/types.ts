export interface FunctionParam {
    name: string,
    type: string
};

export interface FunctionSymbol {
    kind: "function",
    name: string,
    params?: FunctionParam[]
};

export interface VariableSymbol {
    kind: "variable",
    name: string,
    type?: string
};

export enum TokenType {
    Keyword,
    Identifier,
    IntegerLiteral,
    FloatLiteral,
    StringLiteral,
    Operator,
    ParenOpen, //(
    ParenClose, //)
    BraceOpen,
    BraceClose,
    Ellipsis,
    Comma,
    Semi,
    Amper, //&
    Hash, //#
    At,
    Error
};


export interface Token {
    type: TokenType,
    value: string,
    row: number,
    col: number
}

export type Symbol = FunctionSymbol | VariableSymbol;