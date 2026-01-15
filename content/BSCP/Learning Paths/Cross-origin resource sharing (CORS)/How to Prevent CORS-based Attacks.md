---
title: How to Prevent CORS-based Attacks
author: Jon Marien
created: 2026-01-14
published: 2026-01-14
tags:
  - certs
  - bscp
  - burp
---

| Title                             | Author     | Created          | Published        | Tags                                                   |
| --------------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| How to Prevent CORS-based Attacks | Jon Marien | January 14, 2026 | January 14, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

---
# How to Prevent CORS-based Attacks?
CORS vulnerabilities arise primarily as misconfigurations. Prevention is therefore a configuration problem. The next sections describe effective defenses against these strains of attacks.

## Proper configuration of cross-origin requests
If a web resource contains sensitive information, the origin should be properly specified in the `Access-Control-Allow-Origin` header.

## Only allow trusted sites
It may seem obvious but origins specified in the `Access-Control-Allow-Origin` header should only be sites that are trusted. In particular, dynamically reflecting origins from cross-origin requests without validation is readily exploitable and should be avoided.

## Avoid whitelisting `null`
Avoid using the header `Access-Control-Allow-Origin: null`. Cross-origin resource calls from internal documents and sandboxed requests can specify the null origin. CORS headers should be properly defined in respect of trusted origins for private and public servers.

## Avoid wildcards in internal networks
Avoid using wildcards in internal networks. Trusting network configuration alone to protect internal resources is not sufficient when internal browsers can access untrusted external domains.

## CORS is not a substitute for server-side security policies
CORS defines browser behaviors and is never a replacement for server-side protection of sensitive data - an attacker can directly forge a request from any trusted origin. Therefore, web servers should continue to apply protections over sensitive data, such as authentication and session management, in addition to properly configured CORS.

---
