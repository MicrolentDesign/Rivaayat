#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch.
#
# Why a branch and not GitHub Actions: adding .github/workflows/ needs a token
# with the `workflow` scope, which this machine's credential does not have.
# This route needs no extra scope — it pushes a build artefact to a branch.
# docs/github-pages-workflow.yml holds the Actions version for whenever the
# scope is granted; that one deploys automatically on push.
#
# The temp repo is deliberately a fresh `git init`: it keeps the project's
# .gitignore and history out of the way, so what lands on gh-pages is exactly
# the contents of dist/ and nothing else.
set -euo pipefail

REMOTE="https://github.com/MicrolentDesign/Rivaayat.git"
BRANCH="gh-pages"

cd "$(dirname "$0")/.."
npm run build

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R dist/. "$TMP/"

cd "$TMP"
git init -q
git checkout -q -b "$BRANCH"
git add -A
git -c user.name="Nishant David Charles" -c user.email="C9@microlent.com" \
    commit -q -m "Deploy $(date -u '+%Y-%m-%d %H:%M UTC')"
git push -q -f "$REMOTE" "$BRANCH"

echo "Published to $BRANCH → https://microlentdesign.github.io/Rivaayat/"
