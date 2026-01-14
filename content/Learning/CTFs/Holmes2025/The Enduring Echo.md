## "The Enduring Echo"
**1. What was the first (non cd) command executed by the attacker on the host?**
`ipconfig` NOPE X
*(Found in Administrator's PowerShell history line 1)*

**2. Which parent process (full path) spawned the attacker's commands?**
`C:\Windows\System32\sshd.exe` NOPE X
*(SSH.EXE prefetch file indicates SSH was used for remote execution)*

**3. Which remote-execution tool was most likely used for the attack?**
`ssh.exe` NOPE X
*(SSH prefetch file and SSH keys in user directories confirm SSH usage)*

**4. What was the attacker's IP address?**
`10.129.242.110` (attacker IP) ✓

**5. What is the first element in the attacker's sequence of persistence mechanisms?**
`LocalAccountTokenFilterPolicy` NOPE X
*(Registry modification found in PowerShell history line 32)*

**6. Identify the script executed by the persistence mechanism.**
`C:\Users\Werni\AppData\Local\JM.ps1` ✓ 
*(PowerShell script that creates service accounts and exfiltrates credentials)*

**7. What local account did the attacker create?**
`Werni` NOPE X
*(Created via `net user Werni Quantum1! /add` in PowerShell history)*

**8. What domain name did the attacker use for credential exfiltration?**
`NapoleonsBlackPearl.htb` ✓
*(Found in JM.ps1 script line 24)*

**9. What password did the attacker's script generate for the newly created user?**
`Watson_20250824170228` NOPE X
*(Format: Watson_ followed by timestamp in yyyyMMddHHmmss format, found in JM.ps1)*

**10. What was the IP address of the internal system the attacker pivoted to?**
`172.18.6.3` NOPE X
*(Found in PowerShell history network configuration command)*

**11. Which TCP port on the victim was forwarded to enable the pivot?**
Need to find netsh portproxy configuration or registry entries. NOPE X

**12. What is the full registry path that stores persistent IPv4→IPv4 TCP listener-to-target mappings?**
`HKLM\SYSTEM\CurrentControlSet\Services\PortProxy\v4tov4\tcp` ✓
*(Standard Windows netsh portproxy registry location)*

**13. What is the MITRE ATT&CK ID associated with the previous technique?**
`T1090.001` ✓
*(Internal Proxy technique for pivoting)*

**14. Command to capture command line details in event logs:**
`reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f` ✓
*(Found in Administrator's PowerShell history line 37)*

Some answers require deeper analysis of the Windows event logs to find the external attacker IP and specific port forwarding details.