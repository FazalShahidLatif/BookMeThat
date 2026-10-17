@echo off
REM ---------------------------------------------------------------------------
REM BookMeThat — SerpAPI Rank Tracker run (Windows batch wrapper)
REM Usage:  run-rank-tracker.bat
REM Runs the Python rank tracker with the venv python, then writes the digest.
REM ---------------------------------------------------------------------------
setlocal
cd /d C:\Users\accts\bookmethat-repo

set PYTHON=C:\Users\accts\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe
set SCRIPT=scripts\serp_rank_tracker.py

echo === BookMeThat SerpAPI Rank Tracker run ===
echo Start time: %TIME%
echo.

REM Run the tracker (generates reports)
"%PYTHON%" "%SCRIPT%" --report

echo.
echo End time: %TIME%
echo Run complete. Report: SERP-RANKING-REPORT.csv
echo Digest:   SERP-RANKING-DIGEST.md
