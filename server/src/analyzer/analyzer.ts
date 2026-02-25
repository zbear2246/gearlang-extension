import { Token, TokenType, FunctionSymbol, VariableSymbol } from "../types";
import { SymbolTable } from "./symbolTable";


export function analyze(tokens: Token[], symbolTable: SymbolTable): void {

    let i = 0

    function current(): Token {

        return tokens[i];

    };

    function advance(): void {
        i++;
    };

    function peek(): Token | undefined {
        return tokens[i + 1];
    };

    function parseFn(): void {
        advance()

        if (i >= tokens.length) {
            return
        }

        const next_token = current()

        const name = next_token.value;

        const functionSymbol: FunctionSymbol = {
            kind: "function",
            name: name
        }

        symbolTable.addFunction(functionSymbol)

    };

    function parseLet(): void {
        advance();


        if (i >= tokens.length) {
            return;
        }



        const new_token: Token = current();

        const peeked = peek();

        let variableSymbol: VariableSymbol;

        if (peeked === undefined) {
            variableSymbol = {
                kind: "variable",
                name: new_token.value
            };
        } else if (peeked.value === ":" && i+2 < tokens.length) {
            let typeToken: Token = tokens[i+2]
            variableSymbol = {
                kind: "variable",
                name: new_token.value,
                type: typeToken.value
            };
        } else {
            variableSymbol = {
                kind: "variable",
                name: new_token.value
            };
        }

        symbolTable.addVariable(variableSymbol)
    }





    //main loop

    while (i < tokens.length) {
        const token = current()

        const type = token.type

        if (type === TokenType.Keyword) {

            if (token.value === "fn") {
                parseFn();
            } else if (token.value === "let") {
                parseLet();
            }

        }

        advance();


    }
}