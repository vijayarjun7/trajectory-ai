#!/usr/bin/env bash
# QE Agent — runs the full Playwright test suite and emits a structured bug report.
# Usage: ./scripts/qe-agent.sh [--headed] [--filter <pattern>]
#
# Exit codes:
#   0  all tests passed
#   1  one or more tests failed

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESULTS_DIR="$ROOT/tests/results"
REPORT_FILE="$RESULTS_DIR/report.json"
BUG_REPORT="$RESULTS_DIR/bug-report.md"

mkdir -p "$RESULTS_DIR"

HEADED=""
FILTER=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --headed) HEADED="--headed"; shift ;;
    --filter) FILTER="--grep $2"; shift 2 ;;
    *) shift ;;
  esac
done

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║          Trajectory AI — QE Agent            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

cd "$ROOT"

# Run tests and capture exit code without aborting on failure
set +e
npx playwright test $HEADED $FILTER \
  --reporter=list,json \
  2>&1
TEST_EXIT=$?
set -e

# ── Parse results and generate bug report ───────────────────────────────────
if [[ -f "$REPORT_FILE" ]]; then
  TOTAL=$(node -e "const r=require('$REPORT_FILE'); console.log(r.stats.expected + r.stats.unexpected + r.stats.skipped)")
  PASSED=$(node -e "const r=require('$REPORT_FILE'); console.log(r.stats.expected)")
  FAILED=$(node -e "const r=require('$REPORT_FILE'); console.log(r.stats.unexpected)")
  SKIPPED=$(node -e "const r=require('$REPORT_FILE'); console.log(r.stats.skipped)")

  echo ""
  echo "┌─────────────────────────────────────────────┐"
  printf  "│  Total: %-4s  Passed: %-4s  Failed: %-4s   │\n" "$TOTAL" "$PASSED" "$FAILED"
  echo "└─────────────────────────────────────────────┘"

  # Generate bug report markdown
  {
    echo "# QE Bug Report — $(date '+%Y-%m-%d %H:%M')"
    echo ""
    echo "## Summary"
    echo "| Metric | Count |"
    echo "|--------|-------|"
    echo "| Total  | $TOTAL |"
    echo "| Passed | $PASSED |"
    echo "| Failed | $FAILED |"
    echo "| Skipped | $SKIPPED |"
    echo ""

    if [[ "$FAILED" -gt 0 ]]; then
      echo "## Failed Tests"
      echo ""
      node -e "
        const r = require('$REPORT_FILE');
        const failed = [];
        function walk(suite) {
          for (const s of (suite.suites || [])) walk(s);
          for (const t of (suite.specs || [])) {
            for (const res of (t.tests || [])) {
              if (res.status !== 'expected') {
                failed.push({ title: t.title, file: t.file, error: res.results?.[0]?.error?.message || 'unknown error' });
              }
            }
          }
        }
        walk(r);
        failed.forEach((f, i) => {
          console.log('### Bug #' + (i+1) + ': ' + f.title);
          console.log('');
          console.log('**File:** ' + f.file);
          console.log('');
          console.log('**Error:**');
          console.log('\`\`\`');
          console.log(f.error.slice(0, 400));
          console.log('\`\`\`');
          console.log('');
        });
      "
    else
      echo "## All tests passed — app is stable"
    fi
  } > "$BUG_REPORT"

  echo ""
  if [[ "$FAILED" -gt 0 ]]; then
    echo "Bug report written to: tests/results/bug-report.md"
    echo ""
    echo "Failed tests:"
    node -e "
      const r = require('$REPORT_FILE');
      function walk(suite) {
        for (const s of (suite.suites || [])) walk(s);
        for (const t of (suite.specs || [])) {
          for (const res of (t.tests || [])) {
            if (res.status !== 'expected') {
              console.log('  ✗ ' + t.title);
            }
          }
        }
      }
      walk(r);
    "
  else
    echo "  ✓  All tests passed. App is stable."
  fi
fi

echo ""
exit $TEST_EXIT
