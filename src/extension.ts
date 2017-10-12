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
            const sep = path.indexOf(':', 0);
            if (sep < 0)
                path = rootFolder.name + UNIX_SEPARATOR + path; // keep the parent dir name
            else
                path = path.substring(sep + 2);//each the partition header like '/d:/'
        }
        ncp.copy(path, () =>
            console.log('File path has been copied to the system clipboard'));
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}