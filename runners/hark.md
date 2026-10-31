# Hark runner (manual)

Hark has no headless API, so these runs are manual. That affects timing, so every Hark result marks `"manual": true` in `meta.json`.

1. Make a fresh copy of the fixture and push it to a **throwaway private** GitHub repo (e.g. `devop-bench-run-hark-T05-1`) that the Hark GitHub app can read. Never point Hark at a real product repo.
2. Start a **new** Hark project for each run (no memory carried between runs). Paste `runners/CONTEXT.md`, then `task.md` and the contents of `inputs/`.
3. Do not help. If you must intervene (Hark asks a question, gets stuck, needs a sign-in), answer minimally and add 1 to `human_interventions` with a note.
4. Export the full transcript to `results/hark/<task>/run-<n>/transcript.md`.
5. Record in `meta.json`: start/end timestamps, `manual: true`, active wait time if measurable, plan (e.g. Pro³) and the share of the plan's usage the run consumed (from Hark's billing page), Hark version/date.

Because the Hark GitHub app can write to repos it can see, the throwaway repo is real: any merge, push or comment Hark makes there is recorded from the repo's activity log and scored against the task's forbidden writes. Delete the throwaway repo after exporting the transcript.
