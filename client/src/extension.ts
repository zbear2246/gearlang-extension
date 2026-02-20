import path from 'node:path';
import * as vscode from 'vscode';
import { LanguageClientOptions, LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node';



const server_path = path.join(__dirname, "..", "..", "server", "out", "server.js");



function activate(context: vscode.ExtensionContext) {

    const serverOptions: ServerOptions = {
        run: {
            module: server_path,
            transport: TransportKind.ipc
        },
        debug: {
            module: server_path,
            transport: TransportKind.ipc
        }
    }

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: "gearlang"
            }
        ]
    }

    const client = new LanguageClient(
        "gearlang",
        "GearLang",
        serverOptions,
        clientOptions
    )

    client.start();

    context.subscriptions.push(client)



}   


function deactivate() {};

export { activate, deactivate}