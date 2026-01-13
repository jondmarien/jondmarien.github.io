---
title: Ivanti Incidents
author:
  - Jon Marien
created: 2025-01-16
tags:
  - issessions
---

| Title            | Author                       | Created          | Published | Tags                         |
| ---------------- | ---------------------------- | ---------------- | --------- | ---------------------------- |
| Ivanti Incidents | <ul><li>Jon Marien</li></ul> | January 16, 2025 | \-        | [[#issessions\|#issessions]] |

---

# Presentation
## Ivanti Vulnerabilities: Current Exploitation Incidents

**Overview**
- **Recent Vulnerabilities**: Multiple critical vulnerabilities in Ivanti products
- **Affected Products**: Ivanti Virtual Traffic Manager (vTM), Endpoint Manager, and others
- **Active Exploitation**: Confirmed by CISA and security researchers

**Key Vulnerabilities**
1. **CVE-2024-7593**:
    - Product: Ivanti Virtual Traffic Manager (vTM)
    - Issue: Erroneous authentication algorithm
    - Impact: Allows bypassing authentication to create rogue admin accounts
    - Mitigation: Patch available since August 2024; CISA mandates federal agencies patch by October 15.
    
2. **CVE-2024-29847**:
    - Product: Ivanti Endpoint Manager
    - Issue: Deserialization of untrusted data leading to remote code execution (RCE)
    - Exploit: PoC publicly available, making it critical to apply patches immediately.
    ![](Pasted%20image%2020241001154700.png)
    
3. **CVE-2024-21893**:
    - Products: Ivanti Connect Secure, Policy Secure, Neurons for ZTA
    - Issue: Server-Side Request Forgery (SSRF)
    - Impact: Access to restricted resources on vulnerable devices
    - Status: Limited but targeted exploitation observed.

**Security Implications**
- **Widespread Risk**: Potential for large-scale attacks due to public availability of exploit codes
- **Urgency**: Immediate patching required to prevent unauthorized access and exploitation

**Mitigation Efforts**
- **Patches Released**: Security updates provided for affected products, including hot patches for Endpoint Manager.
- **CISA Involvement**: Added vulnerabilities to Known Exploited Vulnerabilities catalog, emphasizing urgency for remediation.

**Recommendations**
- **Immediate Action Required**: Apply all available patches promptly
- **Network Security Measures**: Avoid exposing systems like vTM to the internet without proper controls such as IP whitelisting and VPNs.
- **Monitoring and Verification**: Regularly check audit logs for unauthorized access attempts and maintain updated security configurations

# Presenter Notes

## *Ivanti Info:*
- **Clientele**: Ivanti serves high-profile clients across various sectors, such as healthcare (Memorial Health System), finance (Grand Bank), and logistics (Radial).
- **Systems Managed**: They offer solutions like Unified Endpoint Management and IT Service Management, which are critical for maintaining IT infrastructure and security in large organizations.

## *Explaining the Image:*
The image illustrates a communication process between a client (user) and a server (admin) using a remoting channel. Here's what's happening:

1. **Client Actions**:
    - The client calls `ILease::Register`, initiating the interaction.
    - It creates a `DirectoryInfo` object using the `IConvertible` interface.
    - The client captures the `DirectoryInfo` reference through `IEqualityComparer`.
    - Finally, it creates a file at `C:\WriteWhatWhere.bin`.
    
2. **Server Actions**:
    - The server handles the incoming remoting message via `BinaryServerFormatterSink`.
    - It coerces arguments and deserializes the `DirectoryInfo` object.
    - The server then marshals the `DirectoryInfo` by reference, allowing operations on the specified directory.
	Don't use .NET Remoting, it's an old technology. Instead, use WCF, its intended replacement. It is a new service-oriented architecture for handling *plain data* rather than object instances, like its predecessor. this should reduce the risk of insecure deserialization, which is the process of taking data that has been stored or sent as a series of bytes and converting it back into a usable object in a program. Insecure deserialization occurs when untrusted data is used to recreate objects without proper security checks.
## *Moral of the story:*

**Timely Patching**: The availability of patches before widespread exploitation highlights the necessity for organizations to apply security updates promptly. Delays in patching can leave systems vulnerable to known exploits, as seen with Ivanti's vulnerabilities.

**Vulnerability Management**: Regular monitoring and assessment of software vulnerabilities are crucial. Organizations should maintain a robust vulnerability management program to identify and mitigate risks before they are exploited by threat actors.

## *The CVEs: What Are They*
### CVE-2024-7593: Authentication Bypass in Ivanti Virtual Traffic Manager (vTM)
- **What It Is**: This vulnerability is an authentication bypass flaw in Ivanti's Virtual Traffic Manager (vTM), a software that helps manage and balance internet traffic for businesses.
- **How It Works**: Due to an error in the authentication algorithm, attackers can bypass security checks and gain unauthorized access. This allows them to create fake administrator accounts without needing a password.
- **Impact**: If exploited, attackers can control the system as if they were legitimate administrators, potentially causing significant harm by changing settings or disrupting services.
- **Mitigation**: Ivanti released a patch in August 2024. Organizations should ensure they have applied this update to protect against exploitation

## CVE-2024-29847: Remote Code Execution via Deserialization in Ivanti Endpoint Manager (EPM)
- **What It Is**: This is a critical vulnerability in Ivanti Endpoint Manager, which is used to manage IT assets and deploy software across networks.
- **How It Works**: The flaw involves deserialization of untrusted data. Deserialization is the process of converting data back into its original form. If not handled securely, it can allow attackers to execute arbitrary code on the system.
- **Impact**: Attackers can remotely take control of affected systems without needing any special privileges or user interaction, leading to complete system compromise.
- **Mitigation**: A patch is available as of September 2024. It's crucial for users to update their systems to the latest version to mitigate this risk

## CVE-2024-21893: Server-Side Request Forgery (SSRF) in Ivanti Connect Secure
- **What It Is**: This vulnerability affects Ivanti Connect Secure, a tool used for secure remote access. It involves a server-side request forgery (SSRF) issue.
- **How It Works**: SSRF allows attackers to trick the server into making unauthorized requests on their behalf. This can be used to access restricted resources or sensitive information without proper authentication.
- **Impact**: Attackers can exploit this flaw to bypass security measures and potentially gain access to internal systems or data that should be protected.
- **Mitigation**: Ivanti has released patches and mitigation strategies. Users should apply these updates and ensure their systems are configured according to security best practices
## Script For Presenting
**Introduction**
Welcome, everyone. Today, we'll discuss recent vulnerabilities affecting Ivanti products and the critical need for immediate action.
**Overview**
Ivanti has faced multiple critical vulnerabilities across its products, including the Virtual Traffic Manager and Endpoint Manager. These issues have been actively exploited, as confirmed by CISA and security researchers."

**Key Vulnerabilities**
- Let's look at three major vulnerabilities:
    - **CVE-2024-7593**: Found in the Virtual Traffic Manager, this flaw allows attackers to bypass authentication and create rogue admin accounts. A patch has been available since August 2024.
    - **CVE-2024-29847**: This involves deserialization of untrusted data in the Endpoint Manager, leading to remote code execution. Exploit codes are publicly available, making patching urgent.
    - **CVE-2024-21893**: A Server-Side Request Forgery vulnerability in Connect Secure and related products, allowing access to restricted resources. -> EXPLAIN SSRF
	    -  **How It Works**: SSRF allows attackers to trick the server into making unauthorized requests on their behalf. This can be used to access restricted resources or sensitive information without proper authentication.
		- **Impact**: Attackers can exploit this flaw to bypass security measures and potentially gain access to internal systems or data that should be protected.

**Security Implications**
The public availability of exploit codes poses a widespread risk. Immediate patching is essential to prevent unauthorized access and exploitation

**Mitigation Efforts**
Ivanti has released patches for affected products, including hot patches for Endpoint Manager. CISA has added these vulnerabilities to its Known Exploited Vulnerabilities catalog, stressing the urgency for remediation

**Recommendations**
- To mitigate risks:
    - Apply all available patches promptly.
    - Implement network security measures like IP whitelisting and VPNs to protect systems such as vTM.
    - Regularly monitor audit logs for unauthorized access attempts and maintain updated security configurations.