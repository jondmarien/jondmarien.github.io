# PowerShell script to fix URL encoding in image paths
# This script decodes URL-encoded characters in image paths (mainly %20 to spaces)

Add-Type -AssemblyName System.Web

Write-Host "🔧 Fixing URL encoding in image paths..." -ForegroundColor Green

# Get all markdown files in the content directory
$markdownFiles = Get-ChildItem -Path "content" -Filter "*.md" -Recurse

$totalFiles = $markdownFiles.Count
$processedFiles = 0
$updatedFiles = 0
$totalReplacements = 0

# Common URL encodings to fix
$urlEncodings = @{
    '%20' = ' '   # Space
    '%21' = '!'   # Exclamation mark
    '%22' = '"'   # Double quote
    '%23' = '#'   # Hash
    '%24' = '$'   # Dollar
    '%25' = '%'   # Percent
    '%26' = '&'   # Ampersand
    '%27' = "'"   # Single quote
    '%28' = '('   # Left parenthesis
    '%29' = ')'   # Right parenthesis
    '%2A' = '*'   # Asterisk
    '%2B' = '+'   # Plus
    '%2C' = ','   # Comma
    '%2D' = '-'   # Hyphen
    '%2E' = '.'   # Period
    '%2F' = '/'   # Forward slash
    '%3A' = ':'   # Colon
    '%3B' = ';'   # Semicolon
    '%3C' = '<'   # Less than
    '%3D' = '='   # Equals
    '%3E' = '>'   # Greater than
    '%3F' = '?'   # Question mark
    '%40' = '@'   # At symbol
    '%5B' = '['   # Left square bracket
    '%5C' = '\'   # Backslash
    '%5D' = ']'   # Right square bracket
    '%5E' = '^'   # Caret
    '%5F' = '_'   # Underscore
    '%60' = '`'   # Backtick
    '%7B' = '{'   # Left curly brace
    '%7C' = '|'   # Pipe
    '%7D' = '}'   # Right curly brace
    '%7E' = '~'   # Tilde
}

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
        # This captures the entire image markdown syntax
        $imagePattern = '!\[([^\]]*)\]\(([^)]+)\)'
        
        $content = [regex]::Replace($content, $imagePattern, {
            param($match)
            
            $altText = $match.Groups[1].Value
            $imagePath = $match.Groups[2].Value
            $originalImagePath = $imagePath
            
            # Only process paths that contain URL encoding
            $hasUrlEncoding = $false
            foreach ($encoding in $urlEncodings.Keys) {
                if ($imagePath.Contains($encoding)) {
                    $hasUrlEncoding = $true
                    break
                }
            }
            
            if ($hasUrlEncoding) {
                # Decode URL encoding
                foreach ($encoding in $urlEncodings.Keys) {
                    if ($imagePath.Contains($encoding)) {
                        $imagePath = $imagePath.Replace($encoding, $urlEncodings[$encoding])
                        $script:fileReplacements++
                    }
                }
                
                # Alternative method using built-in URL decoding for any missed encodings
                try {
                    $decodedPath = [System.Web.HttpUtility]::UrlDecode($imagePath)
                    if ($decodedPath -ne $imagePath) {
                        $imagePath = $decodedPath
                    }
                } catch {
                    # If URL decoding fails, stick with manual replacements
                }
                
                Write-Host "  🔄 Decoded: $originalImagePath" -ForegroundColor Yellow
                Write-Host "      → To: $imagePath" -ForegroundColor Cyan
                $script:fileUpdated = $true
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
    Write-Host "   3. Your images should now load properly without URL encoding issues!"
}