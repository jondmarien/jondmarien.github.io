---
title: What IS SSRF...
author: Jon Marien
created: 2026-02-08
published: 2026-02-08
tags:
  - bscp
---

| Author     | Published         |
| ---------- | ----------------- |
| Jon Marien | February 08, 2026 |

---
# Definition
![](../../../../Resources/What%20IS%20SSRF.-1770587855551.webp)Server-side request forgery is a web security vulnerability that allows an attacker to cause the server-side application to make requests to an unintended location.

In a typical SSRF attack, the attacker might cause the server to make a connection to internal-only services within the organization's infrastructure. In other cases, they may be able to force the server to connect to arbitrary external systems. This could leak sensitive data, such as authorization credentials.

---
# SEE THIS FILE:
[Server-Side Request Forgery](Server-Side%20Request%20Forgery.md)