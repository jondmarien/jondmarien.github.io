---
title: Using Cross-Site WebSockets (CSRF on Handshake)
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
Cross-site WebSocket hijacking (CSWSH) is when an attacker-controlled website causes a victim’s browser to open a WebSocket connection to a vulnerable application, and the application ties that connection to the victim’s authenticated session (often via cookies in the handshake).  It’s essentially a CSRF-style issue on the WebSocket handshake, but with a key difference: once the connection is established, the attacker can get **two-way** interaction over the hijacked WebSocket.

## What It Is
Cross-site WebSocket hijacking (CSWSH), also called cross-origin WebSocket hijacking, is a CSRF-style vulnerability affecting the **WebSocket handshake** when the server relies only on cookies for session handling and doesn’t include CSRF tokens or other unpredictable values.  In that situation, a victim’s browser can be induced by an attacker-controlled site to establish a WebSocket connection that the server treats as authenticated under the victim’s session.

## Core Idea
An attacker hosts a malicious page that runs JavaScript to open a WebSocket connection to the target application while the victim is logged in.  If the server does not validate the `Origin` header (or otherwise bind the handshake to a token), it may accept this cross-site handshake and associate it with the victim’s cookies/session.  Once the socket is established, the attacker can both send messages to the server and read messages the server sends back over that same connection.

## Why It’s Bad / Impact
CSWSH can enable **unauthorized actions as the victim** if the application uses client-sent WebSocket messages to perform sensitive operations (same "act as the user" outcome as CSRF).  Unlike classic CSRF, it can also enable **data theft** because the attacker gets two-way interaction and can read sensitive server-to-client messages (i.e., chat data, notifications, account data) returned over the hijacked socket.  This often makes CSWSH more severe than "one-way" CSRF because the attacker can continuously interact and harvest responses.

## Protect Against It
Validate the `Origin` header during the WebSocket handshake against an `allowlist` of trusted origins, and reject unexpected origins.  Add an unpredictable per-session/per-connection token (CSRF-style) to the handshake or use an authentication approach that isn’t automatically sent cross-site like cookies.  Enforce per-message authorization and input validation so that even an established socket can’t be abused to perform actions the user shouldn’t be able to trigger.

---
## Performing a cross-site WebSocket hijacking attack
Since a cross-site WebSocket hijacking attack is essentially a CSRF vulnerability on a WebSocket handshake, the first step to performing an attack is to review the WebSocket handshakes that the application carries out and determine whether they are protected against CSRF.

In terms of the normal conditions for CSRF attacks, you typically need to find a handshake message that relies solely on HTTP cookies for session handling and doesn't employ any tokens or other unpredictable values in request parameters.

For example, the following WebSocket handshake request is probably vulnerable to CSRF, because the only session token is transmitted in a cookie:

```html
GET /chat HTTP/1.1
Host: normal-website.com
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: wDqumtseNBJdhkihL6PW7w==
Connection: keep-alive, Upgrade
Cookie: session=KOsEJNuflw4Rd9BDNrVmvwBF9rEijeE2
Upgrade: websocket
```

>The `Sec-WebSocket-Key` header contains a random value to prevent errors from caching proxies, and is not used for authentication or session handling purposes.

If the WebSocket handshake request is vulnerable to CSRF, then an attacker's web page can perform a cross-site request to open a WebSocket on the vulnerable site. What happens next in the attack depends entirely on the application's logic and how it is using WebSockets. The attack might involve:

- Sending WebSocket messages to perform unauthorized actions on behalf of the victim user.
- Sending WebSocket messages to retrieve sensitive data.
- Sometimes, just waiting for incoming messages to arrive containing sensitive data.

---
### Lab
