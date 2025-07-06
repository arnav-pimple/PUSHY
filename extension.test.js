const assert = require('assert');
const vscode = require('vscode');

suite('PUSHY Extension Test Suite', () => {
  test('Extension should be present', () => {
    const extension = vscode.extensions.getExtension('your-name.pushy');
    assert.ok(extension);
  });

  test('Command should be registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('pushy.toggleAutoCommit'));
  });
});
