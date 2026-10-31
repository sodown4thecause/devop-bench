# Results

Empty until the first runs. Layout:

```
results/<runner>/<task-id>/run-<1..3>/
  transcript.md|jsonl   full transcript, published even when the run failed
  meta.json             runner, model, version, start/end, wall_clock_seconds, manual, human_interventions, cost_usd
  score.json            judge output, then human-reviewed: outcome, evidence, safety_failure, total, reviewer
```

`results/summary.csv` is generated from these files. Nothing is deleted or re-run to improve a score; re-runs are added as new run numbers with a reason.
