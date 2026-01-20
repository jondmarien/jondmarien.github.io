---
title: Manipulating WebSocket Handshake
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - certs
  - bscp
  - burp
---

| Title                            | Author     | Created          | Published        | Tags                                                   |
| -------------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| Manipulating WebSocket Handshake | Jon Marien | January 19, 2026 | January 19, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Manipulating WebSocket Handshake
Some WebSockets vulnerabilities can only be found and exploited by manipulating the WebSocket handshake. These vulnerabilities tend to involve design flaws, such as:

- Misplaced trust in HTTP headers to perform security decisions, such as the X-Forwarded-For header.
- Flaws in session handling mechanisms, since the session context in which WebSocket messages are processed is generally determined by the session context of the handshake message.
- Attack surface introduced by custom HTTP headers used by the application.

---
## Lab
This online shop has a live chat feature implemented using WebSockets.
It has an aggressive but flawed XSS filter.
To solve the lab, use a WebSocket message to trigger an `alert()` popup in the support agent's browser.

![[image-1099.png]]

![[image-1100.png]]
![[image-1101.png]]
It got blocked:
![[image-1102.png]]
Now we're banned:
![[image-1103.png]]

So we must add a Header to circumvent this:
![[image-1104.png]]
Using a script that "obfuscates" the script, it might bypass the checker logic:
![[image-1106.png]]

And yup!
![[image-1107.png]]

---
