import { TokenType, Token } from "../types";


const KEYWORDS = new Set([
    "fn",
    "let",
    "comptime",
    "assert",
    "test",
    "if",
    "else",
    "extern",
    "return"
]);

const numbers = /[0-9]/;
const letters_ = /[a-zA-Z_]/


export function tokenize(source: string): Token[] {
    const tokens: Token[] = [];

    let i = 0;

    let row = 1;

    let col = 1;

    function advance() {
        i++
        col++

    }


    while (i < source.length) {
        const char = source[i];

        if (char === "\n") {
            row++;
            col = 1;
            i++;
            continue;

        } else if (char === " " || char === "\t") {
            advance();
            continue

        } else if (char === "/" && source[i + 1] === "/") {
            advance()
            while (i < source.length && source[i] !== "\n") {
                advance()
            }

            continue
        } else if (char === '"') {
            let value = '"';
            advance()

            while (i < source.length && source[i] !== '"') {
                value += source[i];
                advance()
            };

            value += '"';
            advance();

            tokens.push(token_creation(TokenType.StringLiteral, value, row, col));

        } else if (numbers.test(char)) {
            let value = `${char}`;
            advance();

            while (i < source.length && numbers.test(source[i])) {
                value += source[i];
                advance();
            };

            if (source[i] === ".") {
                value += source[i]
                advance()
                while (i < source.length && numbers.test(source[i])) {
                    value += source[i];
                    advance()
                };

                tokens.push(token_creation(TokenType.FloatLiteral, value, row, col))

            } else {
                tokens.push(token_creation(TokenType.IntegerLiteral, value, row, col));
            }
        } else if (letters_.test(char)) {
            let value = `${source[i]}`;
            advance();

            while (numbers.test(source[i]) || letters_.test(source[i])) {
                value += source[i]
                advance()
            }

            if (KEYWORDS.has(value)) {
                tokens.push(token_creation(TokenType.Keyword, value, row, col))
            } else {
                tokens.push(token_creation(TokenType.Identifier, value, row, col))
            }

        } else {
            switch (char) {
                case "(":
                    tokens.push(token_creation(TokenType.ParenOpen, char, row, col));
                    advance()
                    break;
                case ")":
                    tokens.push(token_creation(TokenType.ParenClose, char, row, col));
                    advance()
                    break;

                case ",":
                    tokens.push(token_creation(TokenType.Comma, char, row, col));
                    advance();
                    break;

                case "&":
                    tokens.push(token_creation(TokenType.Amper, char, row, col));
                    advance();
                    break;


                case "{":
                    tokens.push(token_creation(TokenType.BraceOpen, char, row, col));
                    advance();
                    break;


                case "}":
                    tokens.push(token_creation(TokenType.BraceClose, char, row, col));
                    advance();
                    break;

                case ";":
                    tokens.push(token_creation(TokenType.Semi, char, row, col));
                    advance();
                    break;


                case "#":
                    tokens.push(token_creation(TokenType.Hash, char, row, col));
                    advance();
                    break;


                case "@":
                    tokens.push(token_creation(TokenType.At, char, row, col));
                    advance();
                    break;

                case "+":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case "-":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case "=":
                    if (source[i + 1] === ">") {
                        tokens.push(token_creation(TokenType.Operator, "=>", row, col));
                        advance();
                        advance();
                        break;
                    }
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case "*":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case "/":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case ":":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;

                case ">":
                    tokens.push(token_creation(TokenType.Operator, char, row, col));
                    advance();
                    break;


                case ".":
                    if (source[i + 1] === "." && source[i + 2] === ".") {
                        tokens.push(token_creation(TokenType.Ellipsis, "...", row, col))
                        advance();
                        advance();
                        advance();
                    } else {
                        tokens.push(token_creation(TokenType.Error, char, row, col))
                    }
                    break;

                default:
                    tokens.push(token_creation(TokenType.Error, char, row, col))
                    advance();
            }
        }




    }




    return tokens






};


function token_creation(type: TokenType, value: string, row: number, col: number): Token {
    const token: Token = {
        type: type,
        value: value,
        row: row,
        col: col
    }

    return token
}