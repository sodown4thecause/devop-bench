<#
  DevOp Bench: one Codex run of one task, on Windows (PowerShell).

  Usage (from the devop-bench folder):
    .\runners\codex.ps1 -Task T05-ci-red-why -Run 1

  What it does:
    1. Copies fixture\ to C:\Users\<you>\bench-runs\codex\<Task>\run-<Run>\work  (OUTSIDE this repo,
       so the agent can't stumble on the rubrics or answer key)
    2. Makes it a fresh git repo and runs npm ci
    3. Runs `codex exec` with the task prompt, saving every event to transcript.jsonl
    4. Writes meta.json (times, versions). You fill in the rest after reading the transcript.
#>
param(
  [Parameter(Mandatory)] [string] $Task,
  [Parameter(Mandatory)] [ValidateRange(1,3)] [int] $Run
)
$ErrorActionPreference = "Stop"

$Bench  = Split-Path -Parent $PSScriptRoot
$Prompt = Join-Path $Bench "runners\prompts\$Task.md"
if (-not (Test-Path $Prompt)) { throw "No prompt for $Task. Run: node runners\build-prompts.mjs" }

$RunDir = Join-Path $env:USERPROFILE "bench-runs\codex\$Task\run-$Run"
$Work   = Join-Path $RunDir "work"
if (Test-Path $RunDir) { throw "$RunDir already exists. Never overwrite a run; use the next run number." }
New-Item -ItemType Directory -Force -Path $Work | Out-Null

# 1-2. Fresh fixture copy as its own git repo (excluding installed/built folders)
robocopy (Join-Path $Bench "fixture") $Work /E /XD node_modules .next /NFL /NDL /NJH /NJS /NP | Out-Null
Push-Location $Work
git init -q
git add -A
git -c user.name=bench -c user.email=bench@example.invalid commit -qm "Pinboard baseline"
npm ci --no-audit --no-fund | Out-Null

# 3. The run. workspace-write = may edit files in this folder only; network off by default.
$start = Get-Date
Get-Content $Prompt -Raw | codex exec - --json --sandbox workspace-write --ignore-user-config `
  -o (Join-Path $RunDir "final-message.md") > (Join-Path $RunDir "transcript.jsonl")
$exit = $LASTEXITCODE
$end = Get-Date

# Keep whatever the agent changed, as evidence.
git add -A; git diff --cached > (Join-Path $RunDir "changes.diff")
Pop-Location

# 4. Metadata. Fill the nulls by hand after reading the transcript.
[ordered]@{
  runner = "codex"; task = $Task; run = $Run
  codex_version = (codex --version)
  model = $null                       # copy from the transcript / your Codex settings
  plan = "ChatGPT plan name here"
  start = $start.ToString("o"); end = $end.ToString("o")
  wall_clock_seconds = [int]($end - $start).TotalSeconds
  exit_code = $exit
  manual = $false
  human_interventions = 0             # +1 for every time you had to step in
  cost_usd = $null                    # tokens are in the last "turn.completed" line
} | ConvertTo-Json | Set-Content (Join-Path $RunDir "meta.json")

Write-Host "Done in $([int]($end - $start).TotalSeconds)s. Files in $RunDir"
