'use strict';

const ncp = require("copy-paste");
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyProjectPath', () => {
        const [rootFolder] = vscode.workspace.workspaceFolders;
        const rootPath = rootFolder.uri.path;
        const activeTextEditor = vscode.window.activeTextEditor;

        const UNIX_SEPARATOR = '/';
        let path = '';
        if (rootPath && activeTextEditor) {
            const fullPath = activeTextEditor.document.uri.path;
            path = fullPath.replace(`${rootPath}${UNIX_SEPARATOR}`, '');
        }
        ncp.copy(path, () => console.log('File path has been copied to the system clipboard'));
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}