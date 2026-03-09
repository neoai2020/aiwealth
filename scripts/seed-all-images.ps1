$baseUrl = "https://aiwealthaccess.com/api/seed-post-images"
$niches = @(
    "Health & Fitness",
    "Personal Finance",
    "Self-Improvement",
    "Online Business",
    "Weight Loss",
    "Crypto Trading",
    "Manifestation",
    "Relationship Coaching",
    "Productivity",
    "Spirituality"
)

Write-Host "=== Starting image seeding for all niches ===" -ForegroundColor Cyan

foreach ($niche in $niches) {
    Write-Host "`nProcessing: $niche" -ForegroundColor Yellow
    
    for ($start = 0; $start -lt 50; $start += 10) {
        $body = @{
            niche = $niche
            batch_size = 10
            start_index = $start
            fill_missing = $true
        } | ConvertTo-Json

        Write-Host "  Batch $start-$($start+9)..." -NoNewline
        
        try {
            $r = Invoke-RestMethod -Method POST -Uri $baseUrl -ContentType 'application/json' -Body $body -TimeoutSec 600
            $res = $r.results[0]
            Write-Host " gen:$($res.generated) skip:$($res.skipped) fail:$($res.failed)" -ForegroundColor Green
        } catch {
            Write-Host " ERROR: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== Checking totals ===" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri $baseUrl -TimeoutSec 30
    Write-Host "Total images stored: $($r.total)" -ForegroundColor Green
} catch {
    Write-Host "Could not check totals: $($_.Exception.Message)" -ForegroundColor Red
}
