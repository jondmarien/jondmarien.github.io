---
title: What IS Clickjacking...
author: Jon Marien
created: 2026-02-07
published: 2026-02-07
tags:
  - bscp
---

| Author     | Created           | Published         |
| ---------- | ----------------- | ----------------- |
| Jon Marien | February 07, 2026 | February 07, 2026 |

---
# Definition
![](../../../../Resources/What%20IS%20Clickjacking.-1770503338078.webp)  
Clickjacking is an interface-based attack where a victim is tricked into clicking on hidden, actionable content from one site while believing they are interacting with visible, harmless content on another site. The attacker typically embeds the target site inside an invisible or transparent overlay (often an `iframe`) and aligns a sensitive control (for example, "Pay", "Like", "Delete") under a decoy button or link on their own page.

## Core Idea  
The attacker loads a legitimate, actionable page from the target site inside a hidden or partially transparent frame and positions it over the visible UI of a decoy site. When the victim clicks what they see (for example, "Click to win a prize"), the browser actually sends the click to the hidden control in the overlaid frame. The victim’s authenticated session with the target site is used, so the action happens as if they had intentionally clicked there.

### Why It’s Bad / Impact  
Clickjacking can cause the victim to perform unintended actions such as making payments, changing security settings, following/liking content, or enabling features (for example, camera/mic) without realizing it. 

Unlike CSRF, which forges a whole request without real user intent, clickjacking abuses *genuine* user actions that are misdirected, making them harder to detect and sometimes harder for users to dispute.

### Protect Against It  
Prevent your pages from being framed by untrusted sites using headers like `X-Frame-Options` (for example, `DENY`, `SAMEORIGIN`) or `Content-Security-Policy: frame-ancestors`. 

Design critical UI actions with additional confirmation steps or contextual cues that are hard to overlay convincingly (for example, re-auth prompts, visual anti-framing designs). 

Protection depends on the specific vulnerability type, but the core idea is always the same: remove unnecessary assumptions of trust and add layered controls (validation, rate limiting, least privilege, monitoring) so a single mistake does not lead to full compromise.

Protection against CSRF attacks is often provided by the use of a CSRF token: a session-specific, single-use number or nonce. 

Clickjacking attacks are not mitigated by the CSRF token as a target session is established with content loaded from an authentic website and with all requests happening on-domain. CSRF tokens are placed into requests and passed to the server as part of a normally behaved session. The difference compared to a normal user session is that the process occurs within a hidden `iframe`. 

---

