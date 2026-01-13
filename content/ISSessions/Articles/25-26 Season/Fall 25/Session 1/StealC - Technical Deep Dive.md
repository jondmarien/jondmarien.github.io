---
title: StealC - Technical Deep Dive
author: Jon Marien
created: 2025-09-24
published: 2025-09-24
tags:
  - issessions
  - writeups
---

| Title                        | Author     | Created            | Published          | Tags                                                   |
| ---------------------------- | ---------- | ------------------ | ------------------ | ------------------------------------------------------ |
| StealC - Technical Deep Dive | Jon Marien | September 24, 2025 | September 24, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

---
# StealC Malware Family - Technical Deep Dive
---
## Introduction
StealC is a prominent information stealer that has been active since at least January 2023. It is sold as a Malware-as-a-Service (MaaS) on Russian-speaking underground forums, making it accessible to a wide range of threat actors. The malware is designed to steal sensitive information from infected systems, including credentials from web browsers, cryptocurrency wallets, and various applications. This report provides a technical breakdown of the StealC malware family, drawing from the vx-underground forensic report on the BlockBlasters incident and other publicly available research.

### The BlockBlasters Incident: A Case Study
The recent incident involving the Steam game "BlockBlasters" serves as a prime example of StealC's capabilities and distribution methods. The game, which was initially perceived as legitimate, was updated with a malicious payload that included a variant of the StealC malware. This Trojan horse strategy allowed the attackers to bypass initial security checks and infect a large number of users.

The vx-underground forensic report [1] provides a detailed analysis of the malware used in the BlockBlasters incident. The report highlights the following key aspects:

- Infection Vector: The malware was delivered through a game update on Steam. The game's launch script (launch.vbs) was responsible for executing the malicious payload.
- Payloads: The malware consisted of multiple components, including Block1.exe, Client-built2.exe, and msimg32.dll. These files worked in concert to perform the information-stealing functions.
- Command and Control (C2): The malware communicated with a C2 server at http://203.188.171.156:30815 to exfiltrate stolen data and receive further instructions. The C2 infrastructure was later taken down by security researchers.
- Targeting: The attackers specifically targeted cryptocurrency users, as evidenced by the list of targeted individuals in the forensic report.

## StealC Malware: Technical Analysis
**StealC** is a sophisticated information stealer with a wide range of capabilities. The following is a technical breakdown of its key features:

### StealC V2: Key Enhancements
StealC has undergone significant evolution, with version 2 (V2) introducing several key improvements [2]:

- RC4 Encryption: StealC V2 uses RC4 encryption for its network communications, making it more difficult to detect and analyze.
- Expanded Payload Delivery: In addition to executable files, StealC V2 can now deliver Microsoft Software Installer (MSI) packages and PowerShell scripts.
- Redesigned Control Panel: The new control panel includes an integrated builder that allows threat actors to customize payload delivery rules based on various factors, such as geolocation and installed software.
- Enhanced Data Theft: StealC V2 includes a unified file grabber that targets a wide range of applications, including crypto wallets, gaming applications, and email clients.

### How StealC Works

The following is a step-by-step breakdown of how StealC infects a system and steals information:

1. Initial Infection: StealC is typically delivered through social engineering tactics, such as phishing emails or malicious downloads. In the case of BlockBlasters, the malware was delivered through a compromised game update.
2. Execution: Once executed, the malware performs a series of checks to ensure it is running in a suitable environment. This includes checking for the presence of virtual machines and security software.
3. Data Collection: The malware then proceeds to collect sensitive information from the infected system. This includes:
	- Browser Data: Cookies, passwords, and other data from popular web browsers.
	- Cryptocurrency Wallets: Private keys and other sensitive information from cryptocurrency wallets.
	- Application Data: Credentials and other data from various applications, such as FTP clients and email clients.
4. Data Exfiltration: The stolen data is then exfiltrated to a C2 server controlled by the attackers. StealC V2 uses a JSON-based protocol with RC4 encryption for its C2 communications.

## Conclusion
The **StealC malware family** represents a significant threat to individuals and organizations alike. Its sophisticated features, coupled with its availability as a MaaS, make it a popular choice for cybercriminals. The BlockBlasters incident highlights the importance of being vigilant when downloading and installing software, even from trusted sources like Steam. As StealC continues to evolve, it is crucial for security researchers and defenders to stay up-to-date on its latest tactics and techniques.

References

[1] vx-underground. (2025, September 21). Block Blasters - Forensic Report. Retrieved from https://s3.us-east-005.backblazeb2.com/vx-underground-main/Malware%20Analysis/2025/2025-09-21%20-%20Block%20Blasters%20-%20Forensic%20Report/Paper/2025-09-21%20-%20Block%20Blasters%20-%20Forensic%20Report.pdf

[2] Zscaler ThreatLabz. (2025, May 1). I StealC You: Tracking the Rapid Changes To StealC. Retrieved from https://www.zscaler.com/blogs/security-research/i-stealc-you-tracking-rapid-changes-stealc

