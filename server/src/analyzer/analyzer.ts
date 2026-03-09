import { combineConsoleFeatures } from "vscode-languageserver";
import { Token, TokenType, FunctionSymbol, VariableSymbol, FunctionParam } from "../types";
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
    
    function parseParams(peeked: Token | undefined): FunctionParam[] | undefined {
        if (peeked === undefined){
            return;
        };


        if (peeked.type === TokenType.colon) {
            while (i < tokens.length
                && tokens[i].type !== TokenType.BraceOpen
                && tokens[i].type !== TokenType.Semi
                && tokens[i].value !== "=>"
            ) {
                
            }
        }

        return;
    }

    function parseFn(): void {
        advance();

        if (i >= tokens.length) {
            return;
        };

        const start = current()

        let type: string;
        let name: string;
        let params: FunctionParam[] | undefined;

        let peeked: Token | undefined;


        if (start.type === TokenType.PrimitiveType) {
            advance();

            if (i >= tokens.length) {
                return;
            };

            type = start.value;
            name = current().value;


            if (i + 1 < tokens.length) {
                peeked = peek();
            }



            advance();
        } else {
            type = "void"
            name = current().value;
            advance();
        };



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
        } else if (peeked.value === ":" && i + 2 < tokens.length) {
            let typeToken: Token = tokens[i + 2]
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
    };

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