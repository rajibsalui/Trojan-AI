import * as vscode from 'vscode';

export async function createFile(relativePath: string, content = ''): Promise<vscode.Uri> {
  const ws = vscode.workspace.workspaceFolders![0];
  const uri = vscode.Uri.joinPath(ws.uri, relativePath);
  await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf8'));
  return uri;
}

export async function readFile(uri: vscode.Uri): Promise<string> {
  const data = await vscode.workspace.fs.readFile(uri);
  return data.toString();
}

export async function updateFile(uri: vscode.Uri, newContent: string): Promise<void> {
  await vscode.workspace.fs.writeFile(uri, Buffer.from(newContent, 'utf8'));
}

export async function openInEditor(uri: vscode.Uri): Promise<void> {
  const doc = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(doc, { preview: false });
}