# Expense Tracker User Guide

## What this app does
Expense Tracker helps you quickly save daily spending, organize expenses with your own categories, and export records to CSV for further analysis.

## Before you start
- Use a modern browser (Chrome recommended).
- This app is designed to work offline after loading.

## Start the app
1. Open a terminal in the project folder.
2. Install dependencies (first time only):
   npm install
3. Start the app:
   npm run dev
4. Open the local URL shown in terminal (usually http://localhost:5173).

## Main screen overview
- Add Expense: Enter amount, date/time, category, and optional note.
- Manage Categories: Create new categories and rename existing ones.
- Export: Download all current expense records as a CSV file.
- Recent Expenses: View saved expenses in most-recent-first order.

## Add your first expense
1. In Add Expense, enter Amount.
2. Confirm Spent At date and time.
3. Choose a Category.
4. Optionally add a Note.
5. Select Save Expense.

You should see a success message and the expense in Recent Expenses.

## Create and rename categories
### Create a category
1. Go to Manage Categories.
2. Enter a name in New Category.
3. Select Create Category.

### Rename a category
1. In Category to Rename, select the category.
2. Enter a new value in New Name.
3. Select Rename Category.

Note:
- Category names are case/space normalized for uniqueness.
- Example: Food and food are treated as duplicates.

## Export to CSV
1. Select Export CSV in the Export section.
2. The file downloads automatically.
3. Open the downloaded file in Excel, Google Sheets, or similar tools.

If there are no expenses yet, export still generates a CSV with header columns.

## Offline behavior
- Expense and category data are stored locally in your browser.
- You can continue using core features without internet.
- If you clear browser site data, local records may be removed.

## Common messages and fixes
- Amount must be greater than zero:
  Enter a positive number (for example, 10.50).
- Category already exists:
  Use a different name or rename an existing one.
- Category not found / active category required:
  Choose a valid category from the dropdown and try again.

## Helpful tips
- Keep category names simple and consistent for easier reporting.
- Export regularly if you want backups outside the browser.
- Use browser mobile device emulation to preview Android-like layout.
