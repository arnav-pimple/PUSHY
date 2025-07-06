const { exec } = require('child_process');
const vscode = require('vscode');

// Run a git command in the workspace root
function runGitCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) return reject(stderr || error.message);
            resolve(stdout.trim());
        });
    });
}

// Find the root directory of the git repo
async function getGitRoot() {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) return null;
    try {
        const root = await runGitCommand('git rev-parse --show-toplevel', folders[0].uri.fsPath);
        return root;
    } catch {
        return null;
    }
}

// Check if there are changes to commit
async function hasGitChanges(root) {
    const status = await runGitCommand('git status --porcelain', root);
    return status.length > 0;
}

// Get global git user name and email
async function getGitIdentity() {
    try {
        const name = await runGitCommand('git config --global user.name', process.env.HOME || process.env.USERPROFILE);
        const email = await runGitCommand('git config --global user.email', process.env.HOME || process.env.USERPROFILE);
        return { name, email };
    } catch {
        return { name: '', email: '' };
    }
}

// Set global git user name and email
async function setGitIdentity(name, email) {
    await runGitCommand(`git config --global user.name "${name}"`, process.env.HOME || process.env.USERPROFILE);
    await runGitCommand(`git config --global user.email "${email}"`, process.env.HOME || process.env.USERPROFILE);
}

// Add, commit, and push changes
async function autoCommitAndPush(root) {
    const timestamp = new Date().toLocaleString();
    await runGitCommand('git add .', root);
    await runGitCommand(`git commit -m "Auto commit at ${timestamp}"`, root);
    await runGitCommand('git push', root);
}

module.exports = {
    runGitCommand,
    getGitRoot,
    hasGitChanges,
    getGitIdentity,
    setGitIdentity,
    autoCommitAndPush
};
