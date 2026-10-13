# Sparks of the Past

A science-fiction campaign in the Jardin Subsector of the Solomani Front. Political pressure, official scrutiny, competing institutions, and dangerous secrets draw an unlikely group into a struggle over identity, survival, and the truth behind events on Jardin.

**Game system:** Traveller\
**Campaign manager:** [CampaignRepo](https://github.com/avorial/CampaignRepo)

## Game System

Traveller is a science-fiction roleplaying game about people making their way between worlds. Exploration, trade, patrons, starships, military service, and difficult choices can all drive a campaign. Character backgrounds and practical skills give the setting a grounded, lived-in feel. [Mongoose Publishing's Traveller overview](https://www.mongoosepublishing.com/collections/traveller-rpgs).

The table's chosen edition and house rules govern play. This repository records campaign material and references; it does not replace the game's rulebooks.

## What CampaignRepo Does

CampaignRepo turns these files into a browser-based campaign workspace. It links characters, NPCs, factions, places, items, and session notes into a searchable wiki, with maps, relationship graphs, calendars, quests, and media tools available as the campaign develops.

Owners and GMs can keep private material alongside approved player-facing pages, review imported or AI-assisted drafts, and publish selected content through a player portal or public campaign site. The underlying Markdown, YAML, JSON, and media files remain readable without CampaignRepo.

## Start Reading

- [Jardin](wiki/pages/Jardin.md)
- [Opening session: Official Business](wiki/pages/Session-1-Official-Business.md)
- [Campaign timeline](wiki/pages/Timeline.md)
- [All wiki pages](wiki/pages/)
- [Campaign configuration](wiki/campaign.yaml)

## Weekly Updates

Before adding a new transcript/game update, follow [WEEKLY_UPDATE_RUNBOOK.md](WEEKLY_UPDATE_RUNBOOK.md).
It records the safe CampaignRepo publish path and verification checklist.

## Repository Structure

| Path | Contents |
| --- | --- |
| `wiki/pages/` | Wiki articles, characters, lore, and published session reports |
| `wiki/media/` | Images, maps, handouts, and other media |
| `wiki/templates/` | Game-specific page and character templates |
| `wiki/imports/characters/` | Preserved character import sources, when used |
| `wiki/sessions/` | Structured session preparation and notes, when used |
| `wiki/quests/` | Quest records, objectives, and clocks, when used |
| `wiki/maps/` | Map records and linked pins, when used |
| `wiki/campaign.yaml` | Campaign name, game system, categories, and settings |
| `.campaignrepo/index.json` | Generated navigation manifest |
| `wiki/search/index.json` | Generated portable search snapshot |

Some folders are created when their tools are first used. Pages and their frontmatter are the source of truth; generated indexes can be rebuilt.

## Editing and Sharing

- Preserve each page's YAML frontmatter.
- Use `[[Page Name]]` or `[[Page Name|label]]` for wiki links.
- Put media in `wiki/media/` and reference it with paths such as `/wiki/media/image.png`.
- A player-visible page needs both `visibility: players` and `approvalStatus: approved`.
- Wrap private sections in `:::gm` blocks; CampaignRepo strips them from player views.
- After editing or pushing files outside the app, use **Refresh repo** to reload source, rebuild indexes, and update the open campaign view.
- Use **Repair indexes** in campaign settings or the Health center if generated state still disagrees with the source files.

Player visibility applies inside CampaignRepo. Anyone with access to the raw repository can read its files, including GM notes.

## About This Archive

This is a campaign content repository. CampaignRepo's application source, installation instructions, and feature documentation are maintained in the [CampaignRepo repository](https://github.com/avorial/CampaignRepo).
