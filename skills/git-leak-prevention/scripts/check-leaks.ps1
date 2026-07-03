# check-leaks.ps1 — Scan git repo for sensitive files and secrets
# Usage: .\check-leaks.ps1

$ErrorActionPreference = "SilentlyContinue"

$SensitivePatterns = @(
    "\.env$",
    "\.env\.",
    "node_modules/",
    "^dist/",
    "^build/",
    "^release[s]?/",
    "\.key$",
    "\.pem$",
    "\.p12$",
    "\.pfx$",
    "\.log$",
    "\.cache/",
    "^coverage/",
    "^\.turbo/",
    "^\.next/",
    "^\.nuxt/",
    "\.swp$",
    "\.swo$",
    "Thumbs\.db",
    "\.DS_Store"
)

$SecretPatterns = @(
    "api[_-]?key\s*[:=]",
    "secret\s*[:=]",
    "password\s*[:=]",
    "token\s*[:=]",
    "private[_-]?key\s*[:=]",
    "BEGIN\s+(RSA\s+)?PRIVATE\s+KEY",
    "sk-[a-zA-Z0-9]",
    "eyJ[a-zA-Z0-9]"
)

Write-Host "`n🔍 Git Leak Prevention Scanner" -ForegroundColor Cyan
Write-Host "================================`n"

# Get tracked files
$trackedFiles = git ls-files 2>$null
if (-not $trackedFiles) {
    Write-Host "⚠️  Not a git repository or no files tracked." -ForegroundColor Yellow
    exit 1
}

$foundIssues = @()

# Check sensitive file patterns
Write-Host "📁 Checking for sensitive files..." -ForegroundColor Yellow
foreach ($file in $trackedFiles) {
    foreach ($pattern in $SensitivePatterns) {
        if ($file -match $pattern) {
            $foundIssues += [PSCustomObject]@{
                Type    = "FILE"
                Path    = $file
                Pattern = $pattern
                Risk    = "HIGH"
            }
            Write-Host "  ❌ $file" -ForegroundColor Red
            break
        }
    }
}

# Check for secrets in code files
Write-Host "`n🔐 Checking for hardcoded secrets..." -ForegroundColor Yellow
$codeExtensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.yaml", "*.yml", "*.env", "*.config", "*.env.local", "*.env.production")

foreach ($file in $trackedFiles) {
    $ext = [System.IO.Path]::GetExtension($file)
    $codeExts = @(".ts", ".tsx", ".js", ".jsx", ".json", ".yaml", ".yml", ".env", ".config")
    if ($ext -notin $codeExts) { continue }

    $content = git show ":$file" 2>$null
    if (-not $content) { continue }

    $lineNum = 0
    foreach ($line in $content -split "`n") {
        $lineNum++
        foreach ($pattern in $SecretPatterns) {
            if ($line -match $pattern) {
                $masked = $line.Trim().Substring(0, [Math]::Min(50, $line.Trim().Length)) + "..."
                $foundIssues += [PSCustomObject]@{
                    Type    = "SECRET"
                    Path    = $file
                    Line    = $lineNum
                    Pattern = $pattern
                    Risk    = "CRITICAL"
                    Sample  = $masked
                }
                Write-Host "  ❌ $file`:$lineNum — possible secret" -ForegroundColor Red
                break
            }
        }
    }
}

# Check .gitignore
Write-Host "`n📋 Checking .gitignore..." -ForegroundColor Yellow
$gitignoreContent = ""
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
} else {
    Write-Host "  ⚠️  No .gitignore found!" -ForegroundColor Yellow
}

$requiredEntries = @("node_modules", ".env", "dist", "build", ".next", ".turbo")
$missingEntries = @()

foreach ($entry in $requiredEntries) {
    if ($gitignoreContent -notmatch [regex]::Escape($entry)) {
        $missingEntries += $entry
        Write-Host "  ⚠️  Missing from .gitignore: $entry" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "📊 Summary" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Tracked files scanned: $($trackedFiles.Count)"
Write-Host "  Issues found:          $($foundIssues.Count)" -ForegroundColor $(if ($foundIssues.Count -gt 0) { "Red" } else { "Green" })
Write-Host "  Missing .gitignore:    $($missingEntries.Count)" -ForegroundColor $(if ($missingEntries.Count -gt 0) { "Yellow" } else { "Green" })

if ($foundIssues.Count -gt 0) {
    Write-Host "`n⚠️  Action required! Sensitive files detected." -ForegroundColor Red
    Write-Host "  Run with -Fix flag to auto-fix .gitignore." -ForegroundColor Yellow
} else {
    Write-Host "`n✅ Repository looks clean!" -ForegroundColor Green
}
