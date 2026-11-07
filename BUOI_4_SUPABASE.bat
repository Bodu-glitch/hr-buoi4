@echo off
chcp 65001 >nul
cd /d "%~dp0"
node src\cong_cu\b4_supabase.mjs
pause
