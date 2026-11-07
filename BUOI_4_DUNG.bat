@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort 3096 -State Listen -ErrorAction SilentlyContinue; if (-not $c) { Write-Host 'B4 is not running.'; exit 0 }; $p = Get-CimInstance Win32_Process -Filter ('ProcessId=' + $c.OwningProcess); if ($p.CommandLine -match 'node.*src[/\\]cong_cu[/\\]b4_trai_nghiem\.mjs') { Stop-Process -Id $c.OwningProcess; Write-Host 'Stopped B4. Data preserved.' } else { Write-Host 'Another app owns port 3096. Nothing stopped.'; exit 1 }"
pause
