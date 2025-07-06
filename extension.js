const vscode = require('vscode');
const gitUtils = require('./gitUtils');

let intervalHandle = null;
let statusBarItem = null;

/**
 * Ensure the user has set a global Git identity.
 */
async function ensureGitIdentity() {
    let { name, email } = await gitUtils.getGitIdentity();
    if (!name || !email) {
        name = await vscode.window.showInputBox({
            prompt: 'Enter your Git user.name (for commits)',
            ignoreFocusOut: true
        });
        if (!name) throw new Error('Git user.name is required');
        email = await vscode.window.showInputBox({
            prompt: 'Enter your Git user.email (for commits)',
            ignoreFocusOut: true
        });
        if (!email) throw new Error('Git user.email is required');
        await gitUtils.setGitIdentity(name, email);
        vscode.window.showInformationMessage(`Git identity set as ${name} <${email}>`);
    }
}

/**
 * Try to commit and push if there are changes.
 */
async function tryAutoCommit() {
    const root = await gitUtils.getGitRoot();
    if (!root) {
        vscode.window.showWarningMessage('PUSHY: No Git repository found in workspace.');
        return;
    }
    try {
        await ensureGitIdentity();
        if (await gitUtils.hasGitChanges(root)) {
            await gitUtils.autoCommitAndPush(root);
            vscode.window.showInformationMessage('PUSHY: Changes committed and pushed! 🚀');
        } else {
            vscode.window.showInformationMessage('PUSHY: No changes to commit.');
        }
    } catch (err) {
        vscode.window.showErrorMessage(`PUSHY Error: ${err.message || err}`);
    }
}

/**
 * Update the status bar item.
 */
function updateStatusBar(context, enabled) {
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'pushy.toggleAutoCommit';
        statusBarItem.tooltip = 'Toggle PUSHY Auto Commit';
        context.subscriptions.push(statusBarItem);
    }
    statusBarItem.text = enabled ? '$(check) Auto Commit: ON' : '$(circle-slash) Auto Commit: OFF';
    statusBarItem.show();
}

/**
 * Start the auto-commit timer.
 */
function startAutoCommitLoop(context) {
    const intervalSec = vscode.workspace.getConfiguration().get('pushy.interval', 300);
    if (intervalHandle) clearInterval(intervalHandle);
    intervalHandle = setInterval(() => tryAutoCommit(), intervalSec * 1000);
    updateStatusBar(context, true);
}

/**
 * Stop the auto-commit timer.
 */
function stopAutoCommitLoop(context) {
    if (intervalHandle) clearInterval(intervalHandle);
    intervalHandle = null;
    updateStatusBar(context, false);
}

/**
 * Toggle auto-commit on/off.
 */
function toggleAutoCommit(context) {
    const enabled = context.globalState.get('pushy.enabled', false);
    if (enabled) {
        stopAutoCommitLoop(context);
        context.globalState.update('pushy.enabled', false);
        vscode.window.showInformationMessage('PUSHY auto-commit disabled.');
    } else {
        startAutoCommitLoop(context);
        context.globalState.update('pushy.enabled', true);
        vscode.window.showInformationMessage('PUSHY auto-commit enabled. Happy streak building!');
    }
}

/**
 * This method is called when your extension is activated.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('PUSHY extension is now active!');

    // Register the Toggle Auto Commit command
    context.subscriptions.push(
        vscode.commands.registerCommand('pushy.toggleAutoCommit', () => toggleAutoCommit(context))
    );

    // Show status bar on activation
    updateStatusBar(context, context.globalState.get('pushy.enabled', false));

    // Start auto-commit if enabled in settings
    if (vscode.workspace.getConfiguration().get('pushy.enabled', false)) {
        startAutoCommitLoop(context);
        context.globalState.update('pushy.enabled', true);
    }
}

/**
 * This method is called when your extension is deactivated.
 */
function deactivate() {
    if (intervalHandle) clearInterval(intervalHandle);
}

module.exports = {
    activate,
    deactivate
};
