---
title: WebSockets
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - certs
  - bscp
  - burp
---

| Title      | Author     | Created          | Published        | Tags                                                   |
| ---------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| WebSockets | Jon Marien | January 19, 2026 | January 19, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Definition
WebSockets are an HTTP-initiated upgrade that creates a long-lived, bidirectional connection, which means many classic web vulnerabilities can still apply—just over a different channel.  Because they often carry user actions and sensitive data, weaknesses in session handling, origin checks, and message validation can become high impact.

![[image-1097.png]]
WebSockets start with an HTTP handshake and then "upgrade" to a persistent connection that supports asynchronous messages in both directions. They’re used for real-time features (apps, dashboards, chat, trading, etc.) and can carry sensitive data and privileged actions.

## Core Idea
Most HTTP-session context (like cookies) is established during the WebSocket handshake, and then all subsequent WebSocket messages run under that same authenticated context. That means issues like missing authorization checks, unsafe handling of user-supplied message data, or misplaced trust in headers during the handshake can lead to vulnerabilities similar to SQLi/XSS/XXE, plus WebSocket-specific issues like cross-site WebSocket hijacking.

## Why It’s Bad / Impact
If a malicious site can initiate an authenticated WebSocket connection using a victim’s browser (cookies sent in the handshake), the attacker may be able to perform actions or read data as the victim (cross-site WebSocket hijacking). If attacker-controlled data is forwarded through WebSockets to other users or processed unsafely server-side, it can still trigger client-side issues (like XSS) or server-side injection flaws.

## Protect Against It
- Enforce robust authentication and authorization for WebSocket actions, not just at connect time—verify the user is allowed to perform each message-level operation.
- Defend against cross-site WebSocket hijacking by validating the `Origin` header during the handshake and using strong session controls.
- Validate and sanitize message payloads the same way as HTTP inputs, and use `wss://` (TLS) to protect data in transit.

---
