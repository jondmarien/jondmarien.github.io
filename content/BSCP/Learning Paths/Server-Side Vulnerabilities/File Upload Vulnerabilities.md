---
title: File Upload Vulnerabilities
author: Jon Marien
created: 2026-01-13
published: 2026-01-13
tags:
  - certs
  - bscp
  - burp
---

| Title                       | Author     | Created          | Published        | Tags                                                   |
| --------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| File Upload Vulnerabilities | Jon Marien | January 13, 2026 | January 13, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

---
# Definition
File upload vulnerabilities occur when an application lets users upload files but does not strictly validate their **name, type, content, or size**, so attackers can upload unexpected and dangerous files (for example, scripts instead of images).  These files can then be stored on the server and sometimes executed, leading to issues like remote code execution if the server runs the uploaded script.

In some cases, just uploading the file is enough to cause damage (for example, filling disk or triggering a vulnerable parser); in others, the attacker must send a follow‑up HTTP request to the uploaded file’s URL to trigger its execution or processing.

## How to Protect Against It
- Accept only required file types and verify both **extension and MIME type**, plus inspect file content (magic bytes) rather than trusting user‑supplied metadata.
- Store uploads **outside the web root**, rename them, and never execute or directly include them as code; treat them as passive data only.
- Enforce strict **size limits**, virus scanning, and path sanitization to prevent DoS and path traversal via filenames.

---
## File Upload Vulnerabilities – Why They Arise
File upload vulnerabilities usually happen **not** because there is zero validation, but because the validation is flawed or inconsistent across the app.

### Core Idea
- Developers often add checks on uploaded files (extension, type, etc.), but these checks are:
  - Too weak (easy to bypass).
  - Misconfigured.
  - Applied only on some endpoints or directories, not all.

### Typical Causes
- **Blacklist-based filtering:**  
  - The app blocks "dangerous" extensions (for example, `.php`, `.asp`), but:
    - Misses less common or alternative extensions (`.php5`, `.phtml`, etc.).
    - Suffers from parsing quirks (for example, double extensions like `shell.php.jpg` being treated differently by validation vs. the web server).

- **Trusting easy-to-fake metadata:**  
  - The app checks only:
    - File extension from the filename.
    - Content-Type header (for example, `image/jpeg`).  
  - Both are completely under attacker control and can be modified with an intercepting proxy, so an attacker can upload a script but label it as an image.

- **Inconsistent validation across the site:**  
  - One upload endpoint has stronger checks, another (for avatars, documents, or backups) is less strict.  
  - Files might be stored in different directories or served by different hosts; one path may execute scripts while another treats them as static, creating exploitable discrepancies.

### Protect Against It
- Prefer `allowlists` of safe types, validate extension + MIME + file signature (magic bytes), and treat user-controlled filenames as untrusted.
- Apply the **same strict rules** everywhere uploads are accepted and wherever they are later served.
- Store uploads outside the web root and never let them be executed as code.

---
## Exploiting Unrestricted File Uploads to Deploy a Web Shell
Exploiting unrestricted file uploads to deploy a **web shell** means uploading a server-side script (for example, PHP) through a vulnerable upload feature and having the server execute it, giving you command execution via HTTP.

A **web shell** is a malicious script that lets an attacker run arbitrary commands or actions on a remote web server just by hitting a specific URL with chosen parameters.

## Core Idea
- The app lets you upload a script file (for example, `.php`) into a location that the web server will execute.  
- Simple example shell to read files:  
```php
<?php echo file_get_contents('/path/to/target/file'); ?>
```
  - Requesting this file returns the contents of whatever file path you hard‑coded.  
- More powerful shell using a `command`/`cmd` parameter:
```php
<?php echo system($_GET['command']); ?>
```
  - Called like: 
```http
GET /example/exploit.php?command=id HTTP/1.1
```
   to execute `id`

## Why It’s Bad / Impact
- Once a web shell is uploaded and reachable, you effectively have **RCE on the web server**.  
- You can typically:
  - Read and write arbitrary files (config, source, keys).  
  - Exfiltrate sensitive data (DB creds, secrets).  
  - Pivot to internal infrastructure or use the box to attack other external targets.  

## Protect Against It
- Only allow required, safe file types and treat all uploads as data, **never executable code**.  
- Store uploads outside the web root, rename them, and ensure the web server will not interpret them as scripts.  
- Use `allowlists`, deep validation (extension + MIME + magic bytes), and consistent rules on every upload path.

---
## Flawed File Type Validation
This is exploiting **file type validation that looks strict but is actually superficial**. The server “checks” uploaded files, but only by trusting metadata the attacker controls (like the per-part `Content-Type`), so a malicious script can still be uploaded and later executed.

```http
POST /images HTTP/1.1
Host: normal-website.com
Content-Length: 12345
Content-Type: multipart/form-data; boundary=---------------------------012345678901234567890123456

---------------------------012345678901234567890123456
Content-Disposition: form-data; name="image"; filename="example.jpg"
Content-Type: image/jpeg
[...binary content of example.jpg...]
---------------------------012345678901234567890123456
Content-Disposition: form-data; name="description"
This is an interesting description of my image.
---------------------------012345678901234567890123456
Content-Disposition: form-data; name="username"
wiener
---------------------------012345678901234567890123456--
```
## Core Idea
- The form uses `multipart/form-data`, where each field (image, description, username) is a separate part with its own headers, including `Content-Disposition` and `Content-Type`.  
- Many apps validate uploads by checking that the **part for the file field** (for example, `name="image"`) has an allowed `Content-Type` value such as `image/jpeg` or `image/png`.  
- If the app **implicitly trusts that header** and never inspects the actual bytes, you can:
  - Put a PHP (or other server-side) script in the body of the file part.  
  - Leave/modify the header as `Content-Type: image/jpeg`.  
  - The server accepts and stores your script as if it were a genuine image, because it only looked at the header, not the content.

## Why It’s Bad / Impact
- On the surface, the site appears to have upload validation, so the risk is underestimated.  
- In practice, an attacker can:
  - Upload arbitrary, non-image content while masquerading as an image.  
  - If the upload path is reachable and the server executes that type (for example, `.php` under a PHP-enabled directory), this becomes a **web shell / RCE** vector.  
- Even if it does not execute directly, the bogus file can still be abused by downstream processors (image libraries, parsers, AV, etc.), widening the attack surface.

## Protect Against It
- Never rely solely on the upload part’s `Content-Type` header; it is fully attacker-controlled.  
- Enforce `allowlists` **plus real content verification**:
  - Check extension.  
  - Check MIME at the server.  
  - Check magic bytes / signature to ensure the file really is an image/PDF/etc.  
- Apply identical strict validation on every upload endpoint and every path where files are later served.

---
