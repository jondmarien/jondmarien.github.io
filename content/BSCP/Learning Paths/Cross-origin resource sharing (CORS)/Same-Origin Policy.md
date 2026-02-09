---
title: Same-Origin Policy
author: Jon Marien
created: 2026-01-14
published: 2026-01-14
tags:
  - bscp
---

| Author     | Created          | Published        |
| ---------- | ---------------- | ---------------- |
| Jon Marien | January 14, 2026 | January 14, 2026 |

---
# Same Origin Policy
The same-origin policy (SOP) is a browser security rule that restricts how pages from different origins can interact so one site cannot freely read another site’s data in the user’s browser.

It defines `origin` as `scheme + host + port`, and generally allows a page to *send* requests cross-origin (for example, via forms, images, or scripts) but blocks JavaScript from *reading* most cross-origin responses. This helps prevent a malicious site from silently reading private data loaded from another site where the user is logged in.

---
# Relaxation of the Same-Origin Policy
Relaxation of the same-origin policy is basically "safe exceptions" to SOP so some cross-origin reads are allowed, but only under rules the target site defines.

Many apps need their frontend on one origin to talk to an API on another, or to subdomains, so the browser uses CORS to relax SOP in a controlled way. With CORS, the server sends HTTP headers (like `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials`) telling the browser which origins are trusted and whether credentials can be included. The browser and cross-origin site do a header "handshake", and only if the rules match does the browser allow JS to read the cross-origin response.

---
# Vulns Arising from CORS Config Issues
Many modern websites use CORS to allow access from subdomains and trusted third parties. Their implementation of CORS may contain mistakes or be overly lenient to ensure that everything works, and this can result in exploitable vulnerabilities.

---
# Lab

![[image-1062.png]]
![[image-1061.png]]
![[image-1063.png]]

Bit sloppy on the report here but this one was fun.