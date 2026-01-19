# Sync Obsidian Vault to Quartz Site
# This script copies only the Learning, ISSessions, and Resources folders from your Obsidian vault
# to your Quartz content directory, with proper safety checks and logging.

param(
    [string]$ObsidianVaultPath = "C:\Obsidian\Synced Vaults\Synced Sheridan Vault",
    [string]$QuartzContentPath = "J:\projects\personal-projects\quartz\content",
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

# Color-coded output functions
function Write-Success {
    param([string]$Message)
    Write-Host "[✓] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[⚠] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[✗] $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "[i] $Message" -ForegroundColor Cyan
}

# Validate paths
if (-not (Test-Path -Path $ObsidianVaultPath -PathType Container)) {
    Write-Error "Obsidian vault path not found: $ObsidianVaultPath"
    exit 1
}

if (-not (Test-Path -Path $QuartzContentPath -PathType Container)) {
    Write-Error "Quartz content path not found: $QuartzContentPath"
    exit 1
}

Write-Info "Obsidian Vault: $ObsidianVaultPath"
Write-Info "Quartz Content: $QuartzContentPath"

if ($DryRun) {
    Write-Warning "DRY RUN MODE - No files will be modified"
}

# Define source and destination folders
$foldersToSync = @(
    @{
        Name        = "Learning"
        Source      = Join-Path $ObsidianVaultPath "Learning"
        Destination = $QuartzContentPath
        FlattenContents = $true
    },
    @{
        Name        = "ISSessions"
        Source      = Join-Path $ObsidianVaultPath "ISSessions"
        Destination = Join-Path $QuartzContentPath "ISSessions"
        SubfoldersOnly = @("Articles")
    },
    @{
        Name        = "Resources"
        Source      = Join-Path $ObsidianVaultPath "Resources"
        Destination = Join-Path $QuartzContentPath "Resources"
    }
)

# Sync function using Robocopy (efficient, incremental)
function Sync-Folder {
    param(
        [string]$FolderName,
        [string]$Source,
        [string]$Destination,
        [bool]$IsDryRun,
        [string[]]$SubfoldersOnly = @(),
        [bool]$FlattenContents = $false
    )

    if (-not (Test-Path -Path $Source -PathType Container)) {
        Write-Warning "Source folder not found: $Source (skipping)"
        return
    }

    # Create destination if it doesn't exist (including parent directories)
    if (-not (Test-Path -Path $Destination)) {
        Write-Info "Creating destination folder: $Destination"
        New-Item -ItemType Directory -Path $Destination -Force | Out-Null
    }

    Write-Info "Syncing $FolderName..."

    # If FlattenContents is true, sync each subfolder of Source directly to Destination
    if ($FlattenContents) {
        $subfolders = Get-ChildItem -Path $Source -Directory -ErrorAction SilentlyContinue
        if ($subfolders.Count -eq 0) {
            Write-Warning "No subfolders found in $Source"
            return
        }
        
        foreach ($subfolder in $subfolders) {
            $sourceSubfolder = $subfolder.FullName
            $destSubfolder = Join-Path $Destination $subfolder.Name
            
            if (-not (Test-Path -Path $destSubfolder)) {
                Write-Info "Creating $destSubfolder"
                New-Item -ItemType Directory -Path $destSubfolder -Force | Out-Null
            }
            
            Sync-SingleFolder -SubfolderName $subfolder.Name -Source $sourceSubfolder -Destination $destSubfolder -IsDryRun $IsDryRun
        }
        
        # Sync specific files from the root of Source
        $welcomeFile = Join-Path $Source "Welcome to Chrono's Cyber Chronicles!.md"
        if (Test-Path -Path $welcomeFile) {
            $destFile = Join-Path $Destination "Welcome to Chrono's Cyber Chronicles!.md"
            if (-not $IsDryRun) {
                Copy-Item -Path $welcomeFile -Destination $destFile -Force
                Write-Host "  📄 Copied Welcome to Chrono's Cyber Chronicles!.md" -ForegroundColor Gray
            } else {
                Write-Host "  📄 Would copy Welcome to Chrono's Cyber Chronicles!.md" -ForegroundColor Gray
            }
        }
        return
    }

    # If SubfoldersOnly is specified, only sync those subfolders
    if ($SubfoldersOnly.Count -gt 0) {
        foreach ($subfolder in $SubfoldersOnly) {
            $sourceSubfolder = Join-Path $Source $subfolder
            $destSubfolder = Join-Path $Destination $subfolder
            
            if (-not (Test-Path -Path $sourceSubfolder -PathType Container)) {
                Write-Warning "Subfolder not found: $sourceSubfolder (skipping)"
                continue
            }
            
            if (-not (Test-Path -Path $destSubfolder)) {
                New-Item -ItemType Directory -Path $destSubfolder -Force | Out-Null
            }
            
            Sync-SingleFolder -SubfolderName $subfolder -Source $sourceSubfolder -Destination $destSubfolder -IsDryRun $IsDryRun
        }
        return
    }

    # Normal sync for all subfolders
    Sync-SingleFolder -SubfolderName "" -Source $Source -Destination $Destination -IsDryRun $IsDryRun
}

function Sync-SingleFolder {
    param(
        [string]$SubfolderName,
        [string]$Source,
        [string]$Destination,
        [bool]$IsDryRun
    )

    # Robocopy flags explanation:
    # /E      = Copy subdirectories including empty ones
    # /MT:8   = Use 8 parallel threads for faster copying
    # /XD     = Exclude directories by name
    # /R:3    = Retry 3 times on failed files
    # /W:5    = Wait 5 seconds between retries
    
    $roboArgs = @(
        $Source,
        $Destination,
        "/E",
        "/MT:8",
        "/XD", ".git",
        "/R:3",
        "/W:5"
    )

    if ($IsDryRun) {
        $roboArgs += "/L"  # List only, don't copy
    }

    # Run robocopy
    $output = & robocopy.exe @roboArgs

    # Robocopy exit codes:
    # 0 = no files were copied (no changes needed)
    # 1-7 = successful (files copied, extra files in dest, etc.)
    # 8+ = errors
    if ($LASTEXITCODE -eq 0) {
        Write-Info "$FolderName - No sync required (already up to date)"
    }
    elseif ($LASTEXITCODE -le 7) {
        Write-Success "$FolderName synced successfully"
        
        # Parse and display files/folders from robocopy output
        $fileCount = 0
        $dirCount = 0
        
        foreach ($line in $output) {
            # Skip robocopy metadata and summary lines
            if ($line -match "^\s*$" -or $line -match "^-+$" -or $line -match "ROBOCOPY" -or $line -match "Started :" -or $line -match "Source :" -or $line -match "Dest :" -or $line -match "Files :" -or $line -match "Options :" -or $line -match "Dirs :" -or $line -match "Bytes :" -or $line -match "Times :" -or $line -match "100%" -or $line -match "\*EXTRA File") {
                continue
            }
            
            # Only process lines that look like file paths (contain a backslash)
            if ($line -match "\\" -and $line.Trim() -ne "") {
                $trimmedLine = $line.Trim()
                # Skip lines that are just metadata (e.g., "New File", "Newer", etc.)
                if ($trimmedLine -match "^(New File|Newer|Older|Tweaked|RA File)") {
                    continue
                }
                
                # Check if it's a directory (ends with backslash)
                if ($trimmedLine -match "\\\s*$") {
                    Write-Host "  📁 $trimmedLine" -ForegroundColor Gray
                    $dirCount++
                }
                # Otherwise it's a file
                else {
                    Write-Host "  📄 $trimmedLine" -ForegroundColor Gray
                    $fileCount++
                }
            }
        }
        
        if ($fileCount -gt 0 -or $dirCount -gt 0) {
            Write-Host "  Summary: $dirCount directories, $fileCount files" -ForegroundColor DarkGray
        }
    }
    else {
        Write-Error "$FolderName sync failed with exit code $LASTEXITCODE"
        $output | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    }
}

# Execute sync for each folder
Write-Info "Starting sync process..."
Write-Host ""

foreach ($folder in $foldersToSync) {
    $subfolders = if ($folder.SubfoldersOnly) { $folder.SubfoldersOnly } else { @() }
    $flatten = if ($folder.FlattenContents) { $folder.FlattenContents } else { $false }
    Sync-Folder -FolderName $folder.Name -Source $folder.Source -Destination $folder.Destination -IsDryRun $DryRun -SubfoldersOnly $subfolders -FlattenContents $flatten
}

Write-Host ""
Write-Success "Sync process complete!"
Write-Info "Your Quartz content is now updated from your Obsidian vault."
