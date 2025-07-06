# PUSHY

**PUSHY** is a lightweight, beginner-friendly VS Code extension that helps you build a daily commit streak by automatically committing and pushing your code progress at regular intervals. Perfect for students and new coders who want to stay consistent, keep their GitHub contribution graph green, and never forget to commit their work!

---

## 🚀 What Does PUSHY Do?

- **Auto-commits and pushes** your code changes every few minutes (interval is configurable).
- **Motivates you** to build good version control habits and maintain a GitHub streak.
- **Prompts for Git identity** if not set, ensuring your commits count toward your streak.
- **Shows status** in the VS Code status bar and sends friendly notifications.
- **Beginner-friendly:** No Git commands to remember, no setup headaches.

---

## 🛠️ Installation

### From the VS Code Marketplace

1. Open **Extensions** in VS Code (`Ctrl+Shift+X`).
2. Search for **PUSHY**.
3. Click **Install**.

### From Source (for development)

1. Clone or download this repository.
2. Open the folder in VS Code.
3. Run `npm install` to install dependencies.
4. Press `F5` to launch the Extension Development Host.

---

## ✨ How to Use

1. **Open a folder that is a Git repository** (use `git init` if needed).
2. **Toggle Auto Commit:**
   - Click the status bar item labeled “Auto Commit: OFF”  
     *or*
   - Open the Command Palette (`Ctrl+Shift+P`), type `Toggle Auto Commit`, and select it.
3. **Make changes** to your code.
4. PUSHY will:
   - Automatically stage, commit, and push your changes at the interval you set.
   - Show notifications for successful commits or if there are no changes.
   - Prompt you to set your Git identity (user.name and user.email) if not already set.

---

## ⚙️ Settings

You can customize PUSHY in your VS Code settings:

| Setting           | Type     | Default | Description                                        |
|-------------------|----------|---------|----------------------------------------------------|
| `pushy.enabled`   | boolean  | false   | Start auto-commit automatically on VS Code startup |
| `pushy.interval`  | number   | 300     | Auto-commit interval in seconds (e.g., 1500 = 25min) |

### How to Change Settings

- Open **Settings** (`Ctrl+,`).
- Search for `pushy`.
- Adjust `Pushy: Enabled` and `Pushy: Interval` as desired.

Or, edit your `settings.json` directly:


---

## 💡 Features Overview

- **Toggle Auto Commit:** Easily turn auto-commit on or off from the status bar or Command Palette.
- **Status Bar Indicator:** See at a glance if PUSHY is active.
- **Notifications:** Get updates when commits are made or when there are no changes.
- **Git Identity Prompt:** Ensures your commits are attributed to you.
- **Error Handling:** Friendly messages if Git isn’t installed or no repo is found.
- **Remembers State:** PUSHY remembers if auto-commit was on or off last time.

---

## 🧑‍💻 Typical Workflow

1. Enable PUSHY.
2. Focus on coding—no need to remember to commit.
3. PUSHY auto-commits and pushes your work.
4. Check your GitHub contribution graph and celebrate your streak!

---

## 📝 Requirements

- **Git** must be installed and available in your system PATH.
- Your VS Code workspace must be a **Git repository**.

---

## ❓ FAQ

**Q: Will PUSHY overwrite my commits or branches?**  
A: No, PUSHY only stages, commits, and pushes your current changes. It does not alter history or branches.

**Q: What if I don't have a remote set up?**  
A: PUSHY will attempt to push, but if no remote exists, you’ll see an error notification.

**Q: Can I use PUSHY with private repos?**  
A: Yes! As long as you have push access and are authenticated with Git.

---

## 🏆 Why Use PUSHY?

- Build a consistent coding habit.
- Never forget to commit your progress.
- Keep your GitHub contribution graph green.
- Great for students, bootcampers, and anyone learning to code.

---

## 🛡️ License

MIT License

---

## 💬 Feedback & Contributions

Suggestions and contributions are welcome! Open an issue or pull request on GitHub.

---

Happy coding and happy streak building! 🚀
