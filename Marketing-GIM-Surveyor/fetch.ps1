$url = "https://docs.google.com/spreadsheets/d/1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4/gviz/tq?tqx=out:csv&sheet=Copy%20of%20IG%20Performance%20Posts"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
[System.IO.File]::WriteAllText("$(Get-Location)\sheet_data.csv", $response.Content, [System.Text.Encoding]::UTF8)
Write-Host "Downloaded sheet_data.csv successfully"
