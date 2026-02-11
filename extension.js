const vscode = require('vscode')

/**
 * 
 * @param {vscode.ExtenstionContext} context 
 */
function activate(context) {
    const keywords = [
        "let",
        "return",
        "if",
        'extern',
        "else",
        "fn"
    ];

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        "gearlang",
        {
            provideCompletionItems(document, position, token, context) {
                return keywords.map(keyword => new vscode.CompletionItem(keyword, vscode.CompletionItemKind.keyword))
            }
        }

    );

    context.subscription.push(completionProvider);
}

exports.activate = activate;



function deactivate() { };
exports.deactivate = deactivate