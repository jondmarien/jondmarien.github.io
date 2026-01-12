---
title: StealC - How it Works
author: Jon Marien
created: 2025-09-24
published: 2025-09-24
tags:
  - issessions
  - writeups
---

| Title                 | Author     | Created            | Published          | Tags                                                   |
| --------------------- | ---------- | ------------------ | ------------------ | ------------------------------------------------------ |
| StealC - How it Works | Jon Marien | September 24, 2025 | September 24, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |
# StealC - How it Works
## Technical Deep Dive: How StealC Works

This section provides a detailed technical breakdown of the StealC malware, focusing on the specific variant used in the "BlockBlasters" incident. Our analysis is heavily based on the comprehensive forensic report published by the security research group vx-underground [1].

### Infection and Execution

The initial infection vector in the BlockBlasters case was a classic Trojan horse delivered via a game update on Steam. A malicious VBScript dropper, `launch.vbs`, was bundled with the game. Once the user launched the game, this script would initiate the infection chain.

As detailed in the vx-underground report, the dropper is highly environment-aware and performs several key actions upon execution:

1.  **Privilege Detection:** It first checks if it is running with administrative privileges. If it is, it executes a specific payload (`launch1.vbs`) and immediately exfiltrates a status report to the Command and Control (C2) server before exiting. This suggests a different infection path for privileged versus non-privileged execution.

2.  **Reconnaissance:** The script gathers detailed information about the victim's machine, including public IP address and geolocation data (city, region, country) by querying services like `ipinfo.io`.

3.  **AV/EDR Evasion:** A significant portion of the script is dedicated to detecting the presence of antivirus (AV) and Endpoint Detection and Response (EDR) solutions. It contains a large, obfuscated list of process names for common security products (e.g., `msmpeng.exe`, `crowdstrike.exe`). The script checks the running processes against this list and reports any findings back to the C2 server. This allows the malware to alter its behavior or halt execution if it detects a hostile analysis environment.

### Data Theft and Exfiltration

StealC's primary objective is to steal sensitive information. The variant used in the BlockBlasters attack had a clear focus on gaming and cryptocurrency credentials.

> "Parses `loginusers.vdf` line-by-line looking for `\"AccountName\"`, `\"PersonaName\"`, and `\"RememberPassword\"`, and writes entries to `%TEMP%\\us_report.txt` with `SteamID`, `AccountName`, `PersonaName`, and remember-flag." [1]

This functionality is particularly dangerous for gamers, as it allows attackers to hijack Steam accounts, especially if the "Remember Password" option is enabled.

Once the data is collected, it is exfiltrated to the C2 server. The forensic report identified the C2 server at `http://203.188.171.156:30815`. The communication is handled via HTTP POST requests, with the stolen data being sent in text files.

### C2 Communication and Payload Delivery

The interaction between the infected client and the C2 server is a critical part of the malware's operation. The dropper downloads a `whitelisted_users.txt` file and a `settings.txt` file from the C2 server. This allows the attackers to deploy special payloads for high-value targets.

The report notes a specific list of "key user targets" who would receive a special payload designed to steal their cryptocurrency [1]. This indicates a targeted approach within a broader, opportunistic campaign.

Based on the C2 server's response and the results of the environment checks, the malware decides which payload to execute:

*   If the victim is on the whitelist or if certain settings are enabled, the malware proceeds to download and execute more potent payloads, such as `v1.zip` or `v2.zip`, which contain the core stealer executables (`launch1.vbs` and `Block1.exe`).
*   The archives are password-protected (`"121"`), a simple technique to evade static analysis by some security products.

This dynamic payload system, controlled by the C2 server, allows the attackers to adapt their attack on a per-victim basis, increasing their chances of success and making the malware harder to analyze.

### References

[1] vx-underground. (2025, September 21). *Block Blasters - Forensic Report*. Retrieved from https://s3.us-east-005.backblazeb2.com/vx-underground-main/Malware%20Analysis/2025/2025-09-21%20-%20Block%20Blasters%20-%20Forensic%20Report/Paper/2025-09-21%20-%20Block%20Blasters%20-%20Forensic%20Report.pdf

