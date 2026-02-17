---
title: Blind SSRF Attacks
author: Jon Marien
created: 2026-02-17
published: 2026-02-17
tags:
  - bscp
---

| Author     | Published         |
| ---------- | ----------------- |
| Jon Marien | February 17, 2026 |

---
# **What it is**
Blind SSRF is when you can cause an application to make a back-end HTTP request to a URL you supply, but the response is **never returned** to you. You're firing requests into the dark — you know *something* happened, but you can't see the result.

## **Core Idea**
Unlike regular SSRF where the server's response leaks back to you, blind SSRF is a one-way street. The server makes the request, but you get nothing back. This makes it trickier to confirm and exploit, but it's still dangerous.

***

### Why it's Bad / Impact

Because you can't read responses, you can't directly pull sensitive data like you could with standard SSRF. That said, it's far from harmless:

- **Internal network probing** — you can sweep internal IP ranges and port-scan back-end services blindly
- **Vulnerability detection** — you can send known exploit payloads to internal servers and see if they trigger callbacks, potentially uncovering unpatched systems
- **Malicious response attacks** — if you can get the server to connect *to you*, you can serve crafted malicious responses back to its HTTP client, potentially triggering client-side vulnerabilities and achieving **RCE**
- **Full RCE is possible**, though it requires chaining vulnerabilities and is harder to pull off than standard SSRF

***

### How to Find It — OAST Techniques

The go-to method for detecting blind SSRF is **Out-of-Band Application Security Testing (OAST)**. Since you can't see the response, you instead watch for the server "calling home" to a domain you control.

The workflow looks like this:
1. Generate a unique external domain using **Burp Collaborator** (or an alternative like `interactsh`)
2. Inject that domain into a request parameter the app might use for back-end HTTP calls
3. Monitor Collaborator for any DNS lookups or HTTP requests coming from the app's server
4. If you see a hit — the app is vulnerable to blind SSRF

> **Important nuance:** You might see a DNS lookup but *no* HTTP request follow up. This means the app tried to reach your domain (triggering a DNS resolution), but a network-level firewall blocked the actual HTTP connection. DNS is commonly allowed outbound even when HTTP isn't, so this partial hit still confirms something useful — there's likely a blind SSRF present, just with outbound HTTP filtering in place.

***

### How to Exploit It

Just finding the blind SSRF isn't enough on its own — you need to chain it into something useful. Here are the main exploitation paths:

- **Internal IP sweeping** — blindly send requests to internal IP ranges (e.g., `192.168.0.0/24`) with payloads targeting known CVEs on common services; use OAST callbacks to confirm hits
- **Unpatched internal server discovery** — internal servers are often less patched than public-facing ones; a blind sweep can uncover critical vulnerabilities on systems that were never meant to be exposed
- **Malicious server response (RCE path)** — force the application to connect to a server you control, then return a malicious HTTP response crafted to exploit vulnerabilities in the server's HTTP client library, potentially achieving remote code execution inside the application's infrastructure

***

### Protect Against It

- Apply the same SSRF defenses as standard SSRF — allowlists, blocking internal IP ranges, disabling unnecessary redirects
- **Validate and restrict outbound traffic** at the network level — limit what the app server can reach externally
- Keep internal systems patched, since blind SSRF is often used to exploit vulnerable internal services
- Monitor for unusual outbound DNS/HTTP traffic from your application servers — anomalous external lookups can be an early indicator
- Avoid using user-supplied input to construct back-end HTTP requests wherever possible

***
### Lab
Replace `Referer` with collaborator URL! Then check Collaborator.
![](../../../../Resources/Blind%20SSRF%20Attacks-1771363237720.webp)
![](../../../../Resources/Blind%20SSRF%20Attacks-1771363271634.webp)
![](../../../../Resources/Blind%20SSRF%20Attacks-1771363302782.webp)
![](../../../../Resources/Blind%20SSRF%20Attacks-1771363333638.webp)

All done!

---

