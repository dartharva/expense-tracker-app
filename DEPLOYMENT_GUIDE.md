# GitHub Pages Deployment Guide (VS Code GUI Only)

This guide walks you through publishing your Expense Tracker app to GitHub Pages using only VS Code's graphical interface.

## What You're Doing

You're uploading the **finished app** (in the `dist/` folder) to GitHub, where it will be automatically hosted and accessible on the internet. Your friends can then visit a link to use your app!

---

## Step 1: Build the App Locally

Before deploying, you need to generate the `dist/` folder with your latest code.

1. Open VS Code
2. Go to **Terminal** → **New Terminal** (or press `Ctrl + ~`)
3. Run: `npm run build`
4. Wait for it to finish (you'll see ✓ built in 174ms)
5. Close the terminal (or leave it open)

**Result:** The `dist/` folder now contains your ready-to-deploy app.

---

## Step 2: Create a GitHub Repository for Deployment

Go to **GitHub** (github.com) and log in:

1. Click the **+** icon (top right) → **New repository**
2. Name it something like: `expense-tracker-pages` (or any name)
3. Choose **Public** (so it's accessible to your friends)
4. Do **NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

**Result:** You now have an empty GitHub repo. Copy the URL shown (looks like: `https://github.com/yourname/expense-tracker-pages.git`)

---

## Step 3: Configure GitHub Pages

Back on GitHub:

1. Go to your new repo → **Settings** (tab at top)
2. On the left sidebar, click **Pages**
3. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select `main` (don't worry if it doesn't exist yet)
   - **Folder:** Select `/ (root)`
4. Click **Save**

**Result:** GitHub Pages is now configured. Once you push code, it will automatically deploy from the repo root.

---

## Step 4: Initialize Git in VS Code (GUI)

Back in VS Code:

1. Click the **Source Control** icon on the left sidebar (looks like a branch, or press `Ctrl + Shift + G`)
2. Click **Initialize Repository**
3. Choose the folder: `/home/atharva/Documents/Projects/expense-tracker-app` (your project root)

**Result:** The Source Control panel now shows your project with pending changes.

---

## Step 5: Stage the `dist/` Folder

In VS Code's **Source Control** panel:

1. You'll see a list of files/folders marked as **Untracked** or **Changes**
2. Hover over the **dist** folder → click the **+** button (or right-click → Stage)
3. Also stage these files:
   - `index.html`
   - `vite.config.js`
   - `package.json`
   - `package-lock.json`
4. You can safely ignore `.specify`, `.venv`, `.vscode`, `specs`, `node_modules`, etc.

**Result:** The staged files appear under "Staged Changes".

---

## Step 6: Commit Your Code

Still in **Source Control**:

1. At the top of the panel, click in the text box next to the commit icon (looks like ✓)
2. Type a message like: `Deploy app to GitHub Pages`
3. Press `Ctrl + Enter` (or click the commit checkmark icon)

**Result:** Your changes are now committed locally.

---

## Step 7: Connect to Your GitHub Repo

In **Source Control**:

1. Look for the section that says **Publish Branch** or **Sync** (at the top or in the panel)
2. Click **Publish Branch**
3. When prompted: **Select repository to publish to**
   - Paste the GitHub repo URL from Step 2 (looks like: `https://github.com/yourname/expense-tracker-pages.git`)
   - Press Enter
4. VS Code may ask you to authenticate with GitHub. Follow the prompts (it opens a browser)

**Result:** Your code is now pushed to GitHub!

---

## Step 8: Verify Deployment

Go back to GitHub:

1. Refresh your repo page
2. You should see your files (including `dist/`) listed
3. Go to **Settings** → **Pages**
4. Look for a message like: "Your site is live at: `https://username.github.io/expense-tracker-pages/`"
5. Click that link!

**Result:** Your app is now live on the internet! 🎉

---

## For Your Friends

Share this link with your friends:
```
https://username.github.io/expense-tracker-pages/
```

On **Android**, they can:
1. Visit the link in Chrome
2. Tap the menu (three dots) → **Install app**
3. The app installs to their home screen
4. **Important:** Their expenses are stored locally on their phone—only they can see them!

---

## Future Deployments (Update the App)

When you make changes and want to deploy:

1. Run `npm run build` (in terminal)
2. In **Source Control**, stage the changes
3. Commit with a message like `"Update: fixed date format"`
4. Click **Sync** (top of Source Control panel)

Done! GitHub automatically re-deploys within seconds.

---

## Troubleshooting

**Q: The link shows a 404 or blank page**
- Wait 2-3 minutes for GitHub to deploy
- Check that **Settings → Pages** shows the correct branch (`main`) and folder (`/ (root)`)

**Q: I see old code**
- GitHub may cache old versions. Try opening in an **incognito/private browser window**

**Q: I don't see a "Publish Branch" button**
- You may have already connected to the repo. Look for **Sync** instead

**Q: My GitHub authentication doesn't work**
- Click **Source Control** → look for a connection icon or error
- Try signing out and back in: **VS Code Settings → Accounts**

---

## Questions?

This is a one-time setup. After this, updating your app is just: build → commit → sync.
