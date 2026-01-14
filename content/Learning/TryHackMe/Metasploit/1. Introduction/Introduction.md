#tryhackme 
## Introduction
- Primary interaction through Metasploit console (msfconsole)
- Launch from AttackBox terminal using `msfconsole` command
## Key Concepts
- **Vulnerability**: Design, coding, or logic flaw in target system
- **Exploit**: Code that leverages a vulnerability
- **Payload**: Code run on target system after exploitation
    - Determines the outcome (e.g., gaining access, reading info)
## Main Interface
- Metasploit Console (msfconsole)
## Module Categories
1. **Auxiliary**
    - Supporting modules: scanners, crawlers, fuzzers
    - Subdirectories: admin, analyze, client, dos, fuzzers, scanner, server, etc.
2. **Encoders**
    - Encode exploits/payloads to potentially evade signature-based antivirus
    - Limited success rate due to additional AV checks
    - Subdirectories: cmd, generic, mipsbe, mipsle, php, x64, x86, etc.
3. **Evasion**
    - Focused on evading antivirus detection
    - More direct attempt than encoders
    - Primarily targets Windows systems
4. **Exploits**
    - Organized by target system
    - Includes specific exploits for various OS and platforms
5. **NOPs (No OPeration)**
    - Do nothing for one CPU cycle
    - Used as buffer to achieve consistent payload sizes
    - Represented as 0x90 in Intel x86 CPU family
6. **Payloads**
    - Code to run on target systems
    - Types: 
		a. **Singles**: Self-contained, no additional downloads 
		b. **Stagers**: Set up connection channel for staged payloads 
		c. **Stages**: Downloaded by stager, allows larger payloads
    - Naming convention: "_" for inline (single), "/" for staged
    - Adapters: Wrap singles to convert to different formats (e.g., PowerShell)
7. **Post**
    - Post-exploitation modules
    - Useful in final stages of penetration testing

## Important Directories
- Main modules: `/opt/metasploit-framework/embedded/framework/modules`
- Exploits: `.../modules/exploits/`
- Payloads: `.../modules/payloads/`
- Post: `.../modules/post/`
- NOPs `.../modules/nops/`

## Payload Types In-Depth
- **Singles (Inline)**:
    - Self-contained
    - Example: `generic/shell_reverse_tcp`
- **Staged**:
    - Stager: Small initial payload to set up channel
    - Stage: Larger payload downloaded after initial connection
    - Example: `windows/x64/shell/reverse_tcp`
- **Adapters**:
    - Wrap single payloads for format conversion
    - Example: PowerShell adapter for single command execution

## Best Practices
1. Use `msfconsole` for interaction with modules
2. Understand the difference between inline and staged payloads
4. Explore post-exploitation modules for comprehensive penetration testing
5. Be aware of the limitations of encoders for evading antivirus
6. Use evasion modules when more sophisticated AV evasion is needed
7. Leverage the organization of exploits by target system for efficient selection
8. Understand the role of NOPs in payload construction
9. Explore different payload types and adapters for various scenarios
10. Regularly update Metasploit for access to the latest modules and fixes

## Additional Notes
- Antivirus Evasion: Encoders and evasion modules have varying success rates
- Proof of Concept: Simple actions like launching calc.exe can demonstrate successful exploitation
- Interactive Shells: More powerful than simple command execution, allowing ongoing interaction
- Metasploit Structure: Familiarize yourself with the directory structure for custom module development