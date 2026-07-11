function Get-PatternCount {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return 0 }
    $content = Get-Content $Path -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, '"num":\s*(\d+)')
    if ($matches.Count -eq 0) { return 0 }
    return ($matches | ForEach-Object { [int]$_.Groups[1].Value } | Measure-Object -Maximum).Maximum
}

function Build-CommitMessage {
    param([int]$OldCount, [int]$NewCount)
    if ($NewCount -gt $OldCount) {
        return "패턴 추가: $($OldCount + 1)~${NewCount}번"
    }
    return "패턴 데이터 갱신 (총 $NewCount 개)"
}
