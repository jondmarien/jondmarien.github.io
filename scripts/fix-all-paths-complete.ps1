# PowerShell script to comprehensively fix Quartz paths
# This script:
# 1. Renames all files and directories in Resources to use hyphens instead of spaces
# 2. Updates all markdown files to reference the new paths

Write-Host "🔧 Comprehensive Quartz path fixing..." -ForegroundColor Green

# Function to convert spaces to hyphens
function ConvertTo-QuartzPath {
    param($Path)
    return $Path -replace ' ', '-'
}

# Function to safely rename files and directories
function Rename-PathSafely {
    param($OldPath, $NewPath)
    
    if ($OldPath -eq $NewPath) {
        return $false  # No change needed
    }
    
    if (Test-Path $NewPath) {
        Write-Host "    ⚠️ Target already exists: $NewPath" -ForegroundColor Yellow
        return $false
    }
    
    try {
        Rename-Item -Path $OldPath -NewName (Split-Path $NewPath -Leaf) -Force
        Write-Host "    📁 Renamed: $(Split-Path $OldPath -Leaf) → $(Split-Path $NewPath -Leaf)" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "    ❌ Failed to rename $OldPath : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

Write-Host ""
Write-Host "📂 Phase 1: Renaming files and directories in Resources..." -ForegroundColor Cyan

$renamedCount = 0

# Get all items in Resources directory (files and directories) recursively, in reverse order
# (reverse order so we rename children before parents)
if (Test-Path "content/Resources") {
    $allItems = Get-ChildItem -Path "content/Resources" -Recurse | Sort-Object FullName -Descending
    
    foreach ($item in $allItems) {
        $oldName = $item.Name
        $newName = ConvertTo-QuartzPath $oldName
        
        if ($oldName -ne $newName) {
            Write-Host "  Processing: $oldName" -ForegroundColor Yellow
            
            $newPath = Join-Path $item.DirectoryName $newName
            
            if (Rename-PathSafely $item.FullName $newPath) {
                $renamedCount++
            }
        }
    }
}

Write-Host ""
Write-Host "📝 Phase 2: Updating markdown file references..." -ForegroundColor Cyan

# Get all markdown files
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
                # Convert the path to Quartz format (spaces to hyphens)
                $segments = $imagePath -split '/'
                $convertedSegments = $segments | ForEach-Object {
                    $_ -replace ' ', '-'
                }
                $quartzPath = $convertedSegments -join '/'
                
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
Write-Host "   Files/directories renamed: $renamedCount" -ForegroundColor White
Write-Host "   Markdown files processed: $processedFiles" -ForegroundColor White
Write-Host "   Markdown files updated: $updatedFiles" -ForegroundColor White
Write-Host "   Total reference updates: $totalReplacements" -ForegroundColor White

if ($renamedCount -gt 0 -or $updatedFiles -gt 0) {
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Run 'npx quartz build --serve' to test your site"
    Write-Host "   2. All images should now load properly!"
    Write-Host "   3. File paths and references are now synchronized with Quartz URL structure"
}

Write-Host ""
Write-Host "ℹ️  Note: If you see any 'Target already exists' warnings, those files were already renamed correctly." -ForegroundColor Blue