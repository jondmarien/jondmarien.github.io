---
title: WebSocket Security Vulns
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - bscp
---

| Author     | Published        |
| ---------- | ---------------- |
| Jon Marien | January 19, 2026 |

# Definition
In principle, practically any web security vulnerability might arise in relation to WebSockets:

- User-supplied input transmitted to the server might be processed in unsafe ways, leading to vulnerabilities such as SQL injection or XML external entity injection.
- Some blind vulnerabilities reached via WebSockets might only be detectable using out-of-band (OAST) techniques.
- If attacker-controlled data is transmitted via WebSockets to other application users, then it might lead to XSS or other client-side vulnerabilities.