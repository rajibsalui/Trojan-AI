import * as vscode from 'vscode';
import { runAgentWorkflow } from './agent';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('agentic.createComponent', async () => {
      const name = await vscode.window.showInputBox({ prompt: 'Component name' });
      if (!name) { return; }
      const prompt = `
Create a React component called ${name}.tsx.
1. create_file src/components/${name}.tsx
2. update_file src/components/${name}.tsx with a React.FC skeleton
3. open_in_editor src/components/${name}.tsx
`;
      await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: 'Agentic: Creating Component' },
        () => runAgentWorkflow(prompt)
      );
    })
  );
}

export function deactivate() {}
