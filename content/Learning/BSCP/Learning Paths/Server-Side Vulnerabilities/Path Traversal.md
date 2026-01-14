---
title: Path Traversal
author: Jon Marien
created: 2025-12-18
published: 2025-12-18
tags:
  - certs
  - bscp
  - burp
---

| Title          | Author     | Created           | Published         | Tags                                                   |
| -------------- | ---------- | ----------------- | ----------------- | ------------------------------------------------------ |
| Path Traversal | Jon Marien | December 18, 2025 | December 18, 2025 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |
# Path Traversal

## Definition
**Path Traversal** is also called **Directory Traversal**.

It **enables attackers to read arbitrary files on a server that is running an application**. It could possibly include:
- Application Code & data.
- Credentials for backend systems.
- Sensitive OS files.

In some cases, an attacker can write to these arbitrary files on the server, allowing them to modify the app's data or behaviour, and possibly, ultimately, take full control of the server.

### Reading Arbitrary Files via Path Traversal
Image a shopping app that displays images of items for sale. They might load it using: `<img src="/loadImage?filename=218.png">`.

the `loadImage` URL takes a `filename` parameter and returns the content of the file specified. They are stored on disk at `/var/www/images/`. To return an image, the app appends the requested filename to the base directory, and uses a filesystem API to read the contents. The proceeding path would become: `/var/www/images/218.png`.

The current application implements no defense against path traversal attacks. As a result, an attacker can request the following URL to retrieve the `/etc/passwd` file from the server's filesystem:
`https://insecure-website.com/loadImage?filename=../../../etc/passwd`

This would then cause the application to read from the following path (you guessed it):
`/var/www/images/../../../etc/passwd` :)

Since the `../` sequence is valid within a file path, it steps up one level in the directory structure. Since there are 3 `../`'s, the final file path that gets read is: `/etc/passwd`.

On Unix, this is standard, but **for Windows, both** `../` **and** `..\` **are valid directory traversal sequences**.

This is an example of a path traversal attack on a Windows-based server:
`https://insecure-website.com/loadImage?filename=..\..\..\windows\win.ini`

And this will be the final path: `\windows\win.ini`.