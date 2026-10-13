# Sparks Weekly CampaignRepo Update Runbook

Use this checklist every time a new Sparks of the Past transcript is added.
The goal is to update the working files, publish the wiki, and verify the live site without breaking the player navigation.

## Non-Negotiable Rules

- Pull or fetch the campaign repo before editing: `C:\Users\patricthomas\sparksofthepast`.
- Treat `wiki/pages/*.md` as the canonical page bodies.
- Do not use the bulk `update_pages` tool on pages that need content preserved. It has previously blanked `Session-5-The-Oduya.md`.
- For live CampaignRepo writes, use `propose_page_update` with full page content, then `review_page` to approve it.
- Do not stop after Git says the file changed. Verify the hosted page with `get_page`.
- Game pages belong in `category: game` and `type: game`, not `session`.
- Player-visible pages need `visibility: players`, `approvalStatus: approved`, and `knownToPlayers: true`.
- Every page created for the session must be reachable from at least one obvious navigation point: the session page, the Campaign page, a category list, or a key linked page.

## Weekly Flow

1. Sync first.
   - Run `git fetch --all --prune`.
   - Fast-forward the local branch if possible.
   - Check `git status --short --branch`.

2. Read the transcript and identify the update set.
   - Session/game page.
   - Character per-session updates.
   - NPCs.
   - Locations.
   - Items, vehicles, clues, organizations, and lore.
   - Existing pages that need aliases or corrections.

3. Update the local files.
   - Add or update `wiki/pages/Session-N-Title.md`.
   - Add detailed synopsis, scene notes, major events, clues, loot/assets, NPCs, places, organizations, and open threads.
   - Add per-character notes on each character sheet under a section like `Session N - Title`.
   - Link every important reference with wiki links.
   - If a thing has an old working name and a revealed true name, cross-link both pages. Example: `Sunken Ship-Boat` and `Oduya` are the same craft.

4. Update navigation and indexes.
   - Ensure the Campaign page links the new game.
   - Ensure relevant pages link back to the session.
   - Rebuild or update `.campaignrepo/index.json` and `wiki/search/index.json` through CampaignRepo's index rebuild path when available.

5. Publish safely.
   - Prefer one full content update per changed page using `propose_page_update`.
   - Approve each completed page using `review_page`.
   - Avoid bulk metadata edits unless the page content has been verified afterward.

6. Verify live state.
   - `get_page` for the new session page must show:
     - `category: game`
     - `type: game`
     - `visibility: players`
     - `approvalStatus: approved`
     - non-empty `content`
   - `list_review_queue` should be empty unless intentionally leaving drafts.
   - Check `.campaignrepo/index.json` for `game-Session-N-Title`.
   - Check `wiki/search/index.json` for the session slug with `category: game`.
   - Open or refresh the live site and confirm the Games count increased.

7. Sync back to disk.
   - After MCP or hosted CampaignRepo writes, run `git fetch --all --prune`.
   - Fast-forward the local repo so the working files match the hosted repair/update commits.
   - Finish with a clean `git status --short --branch`.

## Required Session Page Shape

Each game page should include:

- Synopsis
- Scene Notes
- Character Notes
- Major Events
- Key NPCs
- Places
- Organizations
- Clues and Revelations
- Loot and Assets
- Open Threads

## Required Character Updates

Every player character page should get a session-specific note when they attended or were materially affected.
Use the existing character page style and add concise bullets for what the character did, learned, recovered, damaged, repaired, negotiated, or discovered.

If the transcript does not give a character an individual spotlight, say that plainly rather than inventing actions.

## Final Verification Statement

Do not report "done" until these are true:

- Live page body is non-empty.
- New game is approved and player-visible.
- New game appears in the game index/search snapshot.
- Local working repo matches remote.
- Any pages made during the update are reachable by links.
