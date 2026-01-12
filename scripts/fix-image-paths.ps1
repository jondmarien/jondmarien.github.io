# PowerShell script to fix image paths in Quartz markdown files
# This script updates image references to use absolute paths from content root

Add-Type -AssemblyName System.Web

Write-Host "🔧 Fixing image paths in Quartz markdown files..." -ForegroundColor Green

# Get all markdown files in the content directory
$markdownFiles = Get-ChildItem -Path "content" -Filter "*.md" -Recurse

$totalFiles = $markdownFiles.Count
$processedFiles = 0
$updatedFiles = 0

foreach ($file in $markdownFiles) {
    $processedFiles++
    Write-Progress -Activity "Processing markdown files" -Status "File $processedFiles of $totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileUpdated = $false
    
    # Pattern to match image references like ![](filename.ext) or ![alt text](filename.ext)
    $imagePattern = '!\[([^\]]*)\]\(([^/)][^)]+\.(png|jpg|jpeg|gif|webp|svg|ico))\)'
    
    $matches = [regex]::Matches($content, $imagePattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    
    foreach ($match in $matches) {
        $fullMatch = $match.Value
        $altText = $match.Groups[1].Value
        $imageName = $match.Groups[2].Value
        
        # Skip if already has absolute path or is a URL
        if ($imageName.StartsWith('/') -or $imageName.StartsWith('http') -or $imageName.StartsWith('../')) {
            continue
        }
        
        Write-Host "  Found image reference: $imageName in $($file.Name)" -ForegroundColor Yellow
        
        # Search for the image in the Resources directory
        # First try the original name, then try URL decoded name
        $foundImage = Get-ChildItem -Path "content/Resources" -Filter $imageName -Recurse -File | Select-Object -First 1
        
        if (-not $foundImage) {
            # Try URL decoding the filename
            $decodedName = [System.Web.HttpUtility]::UrlDecode($imageName)
            $foundImage = Get-ChildItem -Path "content/Resources" -Filter $decodedName -Recurse -File | Select-Object -First 1
        }
        
        if ($foundImage) {
            # Get the relative path from content root
            $relativePath = $foundImage.FullName.Replace((Resolve-Path "content").Path, "").Replace('\', '/').TrimStart('/')
            $newImageRef = "![$altText](/$relativePath)"
            
            Write-Host "    → Updating to: /$relativePath" -ForegroundColor Cyan
            
            # Replace the old reference with the new one
            $content = $content.Replace($fullMatch, $newImageRef)
            $fileUpdated = $true
        } else {
            Write-Host "    ⚠️ Image not found in Resources directory: $imageName" -ForegroundColor Red
        }
    }
    
    # Save the file if it was updated
    if ($fileUpdated) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updatedFiles++
        Write-Host "  ✅ Updated: $($file.Name)" -ForegroundColor Green
    }
}

Write-Progress -Completed -Activity "Processing markdown files"

Write-Host ""
Write-Host "🎉 Process completed!" -ForegroundColor Green
Write-Host "   Files processed: $processedFiles" -ForegroundColor White
Write-Host "   Files updated: $updatedFiles" -ForegroundColor White

if ($updatedFiles -gt 0) {
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Review the changes to make sure they look correct"
    Write-Host "   2. Run 'npx quartz build --serve' to test your site"
    Write-Host "   3. Your images should now load properly!"
}