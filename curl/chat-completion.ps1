$ErrorActionPreference = 'Stop'

if (-not $env:MODB_API_KEY -or $env:MODB_API_KEY.StartsWith('sk-your')) { throw 'Set MODB_API_KEY before running this script.' }
if (-not $env:MODB_MODEL -or $env:MODB_MODEL.StartsWith('replace-')) { throw 'Set MODB_MODEL before running this script.' }
$baseUrl = if ($env:MODB_BASE_URL) { $env:MODB_BASE_URL } else { 'https://modbapi.com/v1' }
$baseUrl = $baseUrl.TrimEnd('/')
$timeout = if ($env:MODB_TIMEOUT_SECONDS) { [int]$env:MODB_TIMEOUT_SECONDS } else { 30 }
$body = @{
  model = $env:MODB_MODEL
  messages = @(@{ role = 'user'; content = 'Reply with one short greeting.' })
  stream = $false
  max_tokens = 64
} | ConvertTo-Json -Depth 5

$response = Invoke-WebRequest -Uri "$baseUrl/chat/completions" -Method Post -TimeoutSec $timeout -Headers @{ Authorization = "Bearer $env:MODB_API_KEY" } -ContentType 'application/json' -Body $body
Write-Output $response.Content
