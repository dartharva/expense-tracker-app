# GitHub Pages Deployment Guide

This document explains both:
1. How deployment works in this project.
2. The exact steps to publish updates.

## Deployment Model Used Here

This repository uses the classic GitHub Pages branch deployment model.

1. Your application source code lives on the main branch.
2. A production build is generated into the local dist folder.
3. The dist output is published to the gh-pages branch.
4. GitHub Pages serves the site from gh-pages at root.

Because this is a project site (not a user site), the app is hosted under a subpath:

https://dartharva.github.io/expense-tracker-app/

## Why There Are Two Branches

1. main keeps the editable codebase.
2. gh-pages keeps only the built static files that browsers need.

This separation keeps source control clean and follows the most common classic Pages setup.

## Project Configuration That Makes This Work

The deployment pipeline depends on these scripts in package.json:

1. build:pages builds with the GitHub Pages base path.
2. predeploy runs build:pages automatically before deployment.
3. deploy publishes dist to gh-pages.

In short:

1. npm run deploy
2. predeploy runs first
3. dist is generated with correct base URL
4. dist is pushed to gh-pages

The Vite base path is configured specifically for Pages builds, so static assets and routes resolve correctly under /expense-tracker-app/.

## One-Time Repository Setup (Already Done For This Repo)

If repeating this process for a new repository:

1. Create an empty GitHub repository.
2. Push main branch.
3. Run deployment once so gh-pages exists.
4. In GitHub repository settings, open Pages.
5. Set Source to Deploy from a branch.
6. Set Branch to gh-pages and folder to / (root).
7. Save.

After that, each new deploy updates the same site URL.

## Day-to-Day Update Flow

Use this whenever you want to publish changes.

1. Make your code changes locally.
2. Commit and push main.
3. Run npm run deploy.
4. Wait about 30 to 120 seconds.
5. Hard refresh the site in browser.

Recommended command sequence:

1. npm install
2. npm run test
3. git add .
4. git commit -m "Your message"
5. git push
6. npm run deploy

## End-to-End Flow Summary

1. You write code in src and related files.
2. Vite builds optimized static output into dist.
3. gh-pages package pushes dist to gh-pages branch.
4. GitHub Pages detects gh-pages updates.
5. GitHub serves the latest files at the site URL.
6. Users load the updated app.

## Verification Checklist

After deployment, verify:

1. GitHub has a recent commit on gh-pages.
2. GitHub Pages settings still point to gh-pages root.
3. Live URL loads without 404.
4. App assets load without broken styles or scripts.
5. PWA install and offline fallback still work.

## Troubleshooting

Site returns 404:
1. Confirm Pages source is gh-pages root.
2. Confirm gh-pages branch exists.
3. Confirm repository is public or Pages is enabled for your plan.

Site shows old version:
1. Hard refresh browser.
2. Open in private window.
3. Wait a minute and retry.

Assets fail to load:
1. Ensure deploy was run via npm run deploy, not manual copy.
2. Confirm Vite base is set for GitHub Pages build mode.

Deploy command fails:
1. Run npm install.
2. Ensure network and GitHub auth are valid.
3. Re-run npm run deploy.

## Current Live URL

https://dartharva.github.io/expense-tracker-app/
