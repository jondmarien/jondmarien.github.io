---
title: Finding a Hidden Attack Surface
author: Jon Marien
created: 2026-02-17
published: 2026-02-17
tags:
  - bscp
---

| Author     | Published         |
| ---------- | ----------------- |
| Jon Marien | February 17, 2026 |

---
# Finding Hidden SSRF Attack Surface

## **What it is**
Not all SSRF is obvious. While some vulnerabilities are easy to spot (full URLs in request parameters), many are hidden in less obvious places that require a closer look during recon.

### **Core Idea**
Developers often expose partial or indirect URL handling without realizing it creates an SSRF surface. The attack surface exists anywhere the server constructs and issues an HTTP request — even if the user only controls *part* of the input.

#### **Why it's Bad / Impact**
Harder to find = more likely to be missed in audits. Hidden SSRF surfaces are frequently overlooked, leaving critical internal access points unprotected.

##### **Protect Against It**
- Audit all locations where user input is incorporated into server-side requests, even partially
- Don't assume partial control of a URL is safe — treat it as a potential SSRF vector

***

# Partial URLs in Requests

## **What it is**
Instead of passing a full URL, the application only accepts a hostname or a URL path fragment, then constructs the full URL server-side before making the request.

### **Core Idea**
You might only control something like `evil-host.net` or `/admin/path`, and the server fills in the rest (e.g., `https://[your-input]/endpoint`). Because you don't control the entire URL, full SSRF exploitation is limited — but you can still influence the destination hostname or path, which may be enough to probe internal systems or redirect to unintended targets.

#### **Why it's Bad / Impact**
- Even partial control can allow internal hostname substitution
- Can be used to redirect requests to attacker-controlled infrastructure
- Often flies under the radar because it doesn't *look* like a classic SSRF parameter

##### **Protect Against It**
- Never directly incorporate user-supplied hostnames or path fragments into server-side requests
- Validate and allowlist any accepted hostname or path values strictly
- Construct URLs entirely server-side using hardcoded base values

***

# URLs Within Data Formats (e.g., XML / XXE)

## **What it is**
Some data formats — most notably XML — support referencing external URLs as part of their specification. When an application parses user-supplied data in these formats, the parser itself may fetch those URLs server-side, creating an SSRF vector.

### **Core Idea**
When an app accepts XML and parses it, an attacker can embed an external entity reference pointing to an internal resource. The XML parser dutifully fetches the URL, acting as a proxy for the attacker. This is the intersection of **XXE injection** and **SSRF** — two vulnerabilities in one payload.

#### **Why it's Bad / Impact**
- Can access internal services and metadata endpoints via the XML parser
- May exfiltrate file contents or internal data depending on parser behavior
- XXE-based SSRF is often underestimated because developers think of XXE as a separate issue

##### **Protect Against It**
- Disable external entity processing in your XML parser (this is the #1 fix)
- Avoid accepting XML from untrusted sources where possible
- Use safer data formats like JSON when XML isn't strictly necessary

***

# SSRF via the Referer Header

## **What it is**
Some server-side analytics tools automatically visit URLs found in the `Referer` header to analyze incoming traffic and referring pages. This behavior can be hijacked to trigger SSRF.

### **Core Idea**
When you make a request to the application, you include a crafted `Referer` header pointing to an internal resource (e.g., `http://192.168.0.1/admin`). The analytics software sees the header, tries to "visit" the referring URL to gather metadata about it, and unknowingly makes a server-side request to your target. The app never intended to expose SSRF — it's the analytics layer doing it.

#### **Why it's Bad / Impact**
- Completely indirect — the SSRF isn't in the main app logic, it's in a third-party analytics component
- Easy to overlook during security reviews since the `Referer` header isn't typically treated as dangerous input
- Can still reach internal services, metadata endpoints, or trigger blind SSRF callbacks

##### **Protect Against It**
- Ensure any analytics or logging software does **not** automatically fetch URLs from request headers
- Treat the `Referer` header as untrusted user input — sanitize and validate it
- Apply outbound request controls to analytics components the same way you would your main application

***

