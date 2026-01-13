---
title: Server-Side Request Forgery
author: Jon Marien
created: 2026-01-13
published: 2026-01-13
tags:
  - certifications
  - bscp
  - burp
---

| Title                       | Author     | Created          | Published        | Tags                                                                     |
| --------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------------------------ |
| Server-Side Request Forgery | Jon Marien | January 13, 2026 | January 13, 2026 | [[#certifications\|#certifications]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Definition
Server-side request forgery (SSRF) is a vulnerability where an attacker tricks a vulnerable server-side application into making HTTP or other network requests to targets the attacker chooses, instead of the intended destination.

![[image-1049.png]]
## What SSRF Allows
- The attacker controls (fully or partially) a URL or network location that the server uses in an outbound request, so the server sends the request on the attacker’s behalf.
- Because the request originates from the server, it can often reach:
  - **Internal-only services** (e.g., `http://127.0.0.1`, internal admin panels, databases, cloud metadata endpoints).  
  - **Arbitrary external systems**, sometimes including sensitive third‑party APIs.

## Why SSRF Is Dangerous
- Internal services often **trust traffic from the server’s own network**, so SSRF can bypass firewalls and network segmentation, exposing services that are not directly accessible from the internet.
- Responses may leak **sensitive data**, such as:
  - Cloud instance metadata and access tokens  
  - Internal configuration, credentials, or admin interfaces  
  This can lead to privilege escalation, lateral movement, or even remote code execution in severe cases.

---