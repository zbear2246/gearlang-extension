import { analyze } from "./analyzer/analyzer";
import { SymbolTable } from "./analyzer/symbolTable";
import { tokenize } from "./scanner/tokenizer";
import * as lsp from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TokenType, Symbol as GearSymbol, Token } from "./types";

const connection = lsp.createConnection(lsp.ProposedFeatures.all);
const documents = new lsp.TextDocuments(TextDocument);
const symbolTable = new SymbolTable();

connection.onInitialize((_params: lsp.InitializeParams): lsp.InitializeResult => {


    return {
        capabilities: {
            textDocumentSync: lsp.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: false
            }
        }
    };
});

connection.onCompletion((_params: lsp.TextDocumentPositionParams): lsp.CompletionItem[] => {
    const allSymbols: GearSymbol[] = symbolTable.getAll();

    return allSymbols.map(symbol => {
        return {
            label: symbol.name,
            kind: symbol.kind === "function" ? lsp.CompletionItemKind.Function : lsp.CompletionItemKind.Variable
        }
    })


});
documents.onDidOpen((event) => {
    const text: string = event.document.getText();

    const uri: string = event.document.uri;

    analyzeDocument(text, uri);


})

documents.onDidChangeContent((event) => {
    const text: string = event.document.getText();

    const uri: string = event.document.uri;

    analyzeDocument(text, uri);
})

function analyzeDocument(text: string, uri: string): void {
    symbolTable.clear();

    const tokens = tokenize(text);

    analyze(tokens, symbolTable);

    const tokenErrors = tokens.filter(token => (token.type === TokenType.Error));
    const diagnostics: lsp.Diagnostic[] = [];
    const validKeyWords = /\b(let|return|extern)\b/;

    for (let i = 0; i < tokenErrors.length; i++) {
        const token = tokenErrors[i]

        create_Diagnostic(token);
    }

    connection.sendDiagnostics({
        uri: uri,
        diagnostics: diagnostics
    })


    function create_Diagnostic(token: Token) {
        diagnostics.push(
            {
                severity: lsp.DiagnosticSeverity.Error,
                range: {
                    start: { line: token.row - 1, character: token.col - 1 },
                    end: { line: token.row, character: token.col }
                },
                message: "Unexpected Character"
            }
        )
    }

}

documents.listen(connection)
connection.listen();