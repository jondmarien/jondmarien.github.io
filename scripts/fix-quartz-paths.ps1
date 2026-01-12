# PowerShell script to fix image paths to match Quartz URL structure
# Quartz converts spaces to hyphens in both directory and file names

Write-Host "🔧 Fixing image paths to match Quartz URL structure..." -ForegroundColor Green

# Function to convert a path to Quartz URL format (spaces to hyphens)
function ConvertTo-QuartzPath {
    param($Path)
    
    # Split the path into segments
    $segments = $Path -split '/'
    
    # Convert each segment (spaces to hyphens)
    $convertedSegments = $segments | ForEach-Object {
        $_ -replace ' ', '-'
    }
    
    # Rejoin the path
    return $convertedSegments -join '/'
}

# Get all markdown files in the content directory
$markdownFiles = Get-ChildItem -Path "content" -Filter "*.md" -Recurse

$totalFiles = $markdownFiles.Count
$processedFiles = 0
$updatedFiles = 0
$totalReplacements = 0

foreach ($file in $markdownFiles) {
    $processedFiles++
    Write-Progress -Activity "Processing markdown files" -Status "File $processedFiles of $totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    try {
        # Read file content with error handling
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8 -ErrorAction Stop
        
        # Skip if content is null or empty
        if ([string]::IsNullOrEmpty($content)) {
            Write-Host "  ⚠️ Skipping empty file: $($file.Name)" -ForegroundColor Yellow
            continue
        }
        
        $originalContent = $content
        $fileUpdated = $false
        $fileReplacements = 0
        
        # Pattern to match image references like ![](path) or ![alt text](path)
        $imagePattern = '!\[([^\]]*)\]\(([^)]+)\)'
        
        $content = [regex]::Replace($content, $imagePattern, {
            param($match)
            
            $altText = $match.Groups[1].Value
            $imagePath = $match.Groups[2].Value
            $originalImagePath = $imagePath
            
            # Only process paths that start with /Resources/
            if ($imagePath.StartsWith('/Resources/')) {
                # Convert the path to Quartz format
                $quartzPath = ConvertTo-QuartzPath $imagePath
                
                if ($quartzPath -ne $imagePath) {
                    Write-Host "  🔄 Converting: $originalImagePath" -ForegroundColor Yellow
                    Write-Host "      → To: $quartzPath" -ForegroundColor Cyan
                    $script:fileUpdated = $true
                    $script:fileReplacements++
                    $imagePath = $quartzPath
                }
            }
            
            # Return the reconstructed image markdown
            return "![$altText]($imagePath)"
        })
        
        # Update file-level variables from script scope
        $fileUpdated = $script:fileUpdated
        $fileReplacements = $script:fileReplacements
        
        # Save the file if it was updated
        if ($fileUpdated) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            $updatedFiles++
            $totalReplacements += $fileReplacements
            Write-Host "  ✅ Updated: $($file.Name) ($fileReplacements replacements)" -ForegroundColor Green
        }
        
        # Reset script-level variables for next file
        $script:fileUpdated = $false
        $script:fileReplacements = 0
    }
    catch {
        Write-Host "  ❌ Error processing file $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Progress -Completed -Activity "Processing markdown files"

Write-Host ""
Write-Host "🎉 Process completed!" -ForegroundColor Green
Write-Host "   Files processed: $processedFiles" -ForegroundColor White
Write-Host "   Files updated: $updatedFiles" -ForegroundColor White
Write-Host "   Total replacements: $totalReplacements" -ForegroundColor White

if ($updatedFiles -gt 0) {
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Review the changes to make sure they look correct"
    Write-Host "   2. Run 'npx quartz build --serve' to test your site"
    Write-Host "   3. Your images should now load properly with Quartz URL structure!"
}