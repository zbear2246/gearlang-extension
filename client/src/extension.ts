'use strict';
import path from 'node:path';
import * as vscode from 'vscode';
const editor = vscode.window.activeTextEditor;

function activate() {
    const server_path = path.join(__dirname, "..", "..", "server", "out", "server.js");
    
    
}   