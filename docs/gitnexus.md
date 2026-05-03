# GitNexus — Code Intelligence

GitNexus indexes this codebase into a knowledge graph and exposes it to Claude Code via MCP. It runs entirely on this machine — no code is sent anywhere.

**Current index:** 2136 symbols · 2718 relationships · 12 execution flows

---

## Setup (new machine)

```bash
# 1. Index the repo and generate area-specific skills
npx gitnexus analyze --skills

# 2. Register the MCP server with Claude Code (once per machine)
claude mcp add gitnexus -- npx -y gitnexus@latest mcp
```

That's it. The PostToolUse hook in `.claude/settings.json` keeps the index fresh automatically after every `git commit` or `git merge`.

---

## Keeping the index current

| Trigger | Action |
|---|---|
| `git commit` / `git merge` | Hook auto-runs `npx gitnexus analyze --skip-agents-md` |
| Large refactor / new files added | Run `npx gitnexus analyze` manually |
| Index reported stale by MCP | Run `npx gitnexus analyze` |
| Check freshness | `npx gitnexus status` |

---

## MCP tools available to Claude Code

| Tool | When to use |
|---|---|
| `gitnexus_query` | Find execution flows for a concept instead of grepping |
| `gitnexus_context` | 360° view of a symbol — callers, callees, which flows it's in |
| `gitnexus_impact` | Blast radius before editing anything — what breaks and at what depth |
| `gitnexus_detect_changes` | Pre-commit check — verify changes only affect expected symbols |
| `gitnexus_rename` | Safe multi-file rename using the call graph |
| `gitnexus_cypher` | Raw graph queries for advanced exploration |

### MCP resources

| Resource | Use for |
|---|---|
| `gitnexus://repo/coe/context` | Codebase overview and index freshness check |
| `gitnexus://repo/coe/clusters` | All functional areas (Day10, Rag, Chat, etc.) |
| `gitnexus://repo/coe/processes` | All 12 execution flows |

---

## Workflow integration with TDD

Because this project follows strict Red-Green-Refactor, GitNexus fits at two points in each cycle:

**Before writing the GREEN implementation:**
```
gitnexus_impact({ target: "functionYouAreAboutToChange", direction: "upstream" })
```
Confirms the test is the only caller, so the GREEN commit is safe.

**Before REFACTOR commits:**
```
gitnexus_detect_changes()
```
Verifies the refactor's blast radius matches expectations before committing.

---

## Area-specific skills

`npx gitnexus analyze --skills` generated skills for the 10 detected functional areas:

| Skill file | Area |
|---|---|
| `.claude/skills/generated/day10/SKILL.md` | Day10 (13 symbols, 6 files) |
| `.claude/skills/generated/rag/SKILL.md` | RAG pipeline (5 symbols, 2 files) |
| `.claude/skills/generated/chat/SKILL.md` | Chat (5 symbols, 3 files) |
| `.claude/skills/generated/components/SKILL.md` | Shared components (9 symbols, 3 files) |
| `.claude/skills/generated/toast/SKILL.md` | Toast (5 symbols, 2 files) |
| `.claude/skills/generated/weather/SKILL.md` | Weather (4 symbols, 1 file) |
| `.claude/skills/generated/fizzbuzz/SKILL.md` | FizzBuzz (3 symbols, 2 files) |
| `.claude/skills/generated/tabs/SKILL.md` | Tabs (3 symbols, 1 file) |
| `.claude/skills/generated/scripts/SKILL.md` | Scripts (7 symbols, 1 file) |
| `.claude/skills/generated/public/SKILL.md` | Public (7 symbols, 1 file) |

Re-generate after significant structural changes: `npx gitnexus analyze --skills`

---

## Base skills (always available)

| Task | Skill |
|---|---|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| CLI commands reference | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

---

## Storage

- **Index**: `.gitnexus/` inside this repo (gitignored)
- **Registry**: `~/.gitnexus/registry.json` (paths only, no code content)
- **Skills**: `.claude/skills/` (committed — shared with the team)
- **Hook config**: `.claude/settings.json` (committed — shared with the team)
- **MCP registration**: `~/.claude.json` (per-machine, not committed)
