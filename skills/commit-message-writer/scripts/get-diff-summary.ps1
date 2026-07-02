$staged = git diff --cached --name-only
if ($staged) {
    Write-Host "=== Staged Changes ==="
    git diff --cached --stat
    Write-Host ""
    Write-Host "=== Files changed ==="
    $staged
} else {
    $unstaged = git diff --name-only
    if ($unstaged) {
        Write-Host "=== Unstaged Changes ==="
        git diff --stat
        Write-Host ""
        Write-Host "=== Files changed ==="
        $unstaged
    } else {
        Write-Host "No changes detected"
        git log --oneline -5
    }
}
