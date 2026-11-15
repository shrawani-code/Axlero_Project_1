$ErrorActionPreference = "Stop"
Write-Host "Creating Axlero Project 1 dependencies..." -ForegroundColor Cyan

Set-Location "$PSScriptRoot\backend"
npm install

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
}

Set-Location "$PSScriptRoot\frontend"
npm install

Write-Host ""
Write-Host "SETUP COMPLETE" -ForegroundColor Green
Write-Host "1. Make sure MongoDB is running."
Write-Host "2. Open Terminal 1: cd backend; npm run dev"
Write-Host "3. Open Terminal 2: cd frontend; npm run dev"
Write-Host "4. Open the localhost URL shown by Vite."
