param(
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $root "scripts\pattern-helpers.ps1")

$patternsJs = Join-Path $root "web\patterns.js"
$parseScript = Join-Path $root "scripts\parse_patterns.py"

Write-Output "=== 패턴 변환 및 검증 시작 ==="
$oldCount = Get-PatternCount -Path $patternsJs

$pyOutput = & python $parseScript 2>&1
$pyExit = $LASTEXITCODE
$pyOutput | ForEach-Object { Write-Output $_ }

if ($pyExit -ne 0) {
    Write-Output ""
    Write-Output "=== 검증 실패 ==="
    Write-Output "위 오류 메시지를 확인하고 data\patterns_raw.txt를 고친 뒤 다시 실행해주세요."
    Read-Host "아무 키나 누르면 창이 닫힙니다"
    exit 1
}

$newCount = Get-PatternCount -Path $patternsJs
$commitMessage = Build-CommitMessage -OldCount $oldCount -NewCount $newCount

Write-Output ""
Write-Output "=== 검증 성공 ==="
Write-Output "패턴 개수: $oldCount -> $newCount"
Write-Output "커밋 메시지: $commitMessage"

Push-Location $root
try {
    git add data/patterns_raw.txt web/patterns.js
    $changed = (git status --porcelain -- data/patterns_raw.txt web/patterns.js)

    if (-not $changed) {
        Write-Output ""
        Write-Output "=== 변경사항이 없습니다 ==="
        Write-Output "이미 최신 상태입니다. 커밋/배포를 진행하지 않습니다."
        Read-Host "아무 키나 누르면 창이 닫힙니다"
        exit 0
    }

    git commit -m $commitMessage

    if ($DryRun) {
        Write-Output ""
        Write-Output "=== DRY RUN: 로컬 커밋까지만 진행했습니다 ==="
        Write-Output "실제 배포하려면 -DryRun 없이 다시 실행하거나 'git push'를 직접 실행하세요."
        Read-Host "아무 키나 누르면 창이 닫힙니다"
        exit 0
    }

    git push
    if ($LASTEXITCODE -ne 0) {
        Write-Output ""
        Write-Output "=== 배포 실패: 업로드(push) 오류 ==="
        Write-Output "GitHub에 업로드하지 못했습니다. 인터넷 연결과 git 로그인 상태를 확인한 뒤 다시 실행해주세요."
        Read-Host "아무 키나 누르면 창이 닫힙니다"
        exit 1
    }

    Write-Output ""
    Write-Output "=== 배포 대기 중 (최대 4분) ==="
    try {
        $deadline = (Get-Date).AddMinutes(4)
        $run = $null
        do {
            Start-Sleep -Seconds 15
            $r = Invoke-RestMethod -Uri "https://api.github.com/repos/BOJAELEE/English-tutor/actions/runs?per_page=1" -UseBasicParsing
            $run = $r.workflow_runs[0]
            Write-Output ("  상태: " + $run.status)
        } while ($run.status -ne "completed" -and (Get-Date) -lt $deadline)

        if ($run -and $run.conclusion -eq "success") {
            Write-Output ""
            Write-Output "=== 완료되었습니다! ==="
            Write-Output "폰에서 앱을 완전히 닫았다가 다시 열어 새로고침해주세요."
        } else {
            Write-Output ""
            Write-Output "=== 배포 상태를 확인해주세요 ==="
            Write-Output "https://github.com/BOJAELEE/English-tutor/actions"
        }
    } catch {
        Write-Output ""
        Write-Output "=== 배포 상태 확인 실패 ==="
        Write-Output "업로드(push)는 성공했지만, 배포 상태 확인 중 네트워크 오류가 발생했습니다."
        Write-Output "아래 주소에서 배포 상태를 직접 확인해주세요: https://github.com/BOJAELEE/English-tutor/actions"
    }
} finally {
    Pop-Location
}

Read-Host "아무 키나 누르면 창이 닫힙니다"
