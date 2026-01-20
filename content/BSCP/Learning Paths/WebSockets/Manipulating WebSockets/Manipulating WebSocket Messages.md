---
title: Manipulating WebSocket Messages
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - certs
  - bscp
  - burp
---

| Title                           | Author     | Created          | Published        | Tags                                                   |
| ------------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| Manipulating WebSocket Messages | Jon Marien | January 19, 2026 | January 19, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

## Manipulation of Messages
The majority of input-based vulnerabilities affecting WebSockets can be found and exploited by tampering with the contents of WebSocket messages.

For example, suppose a chat application uses WebSockets to send chat messages between the browser and the server. When a user types a chat message, a WebSocket message like the following is sent to the server:
```html
{"message":"Hello Carlos"}
```

The contents of the message are transmitted (again via WebSockets) to another chat user, and rendered in the user's browser as follows:
```html
<td>Hello Carlos<td>
```
In this situation, provided no other input processing or defenses are in play, an attacker can perform a proof-of-concept XSS attack by submitting the following WebSocket message:
```html
{"message":"<img src=1 onerror='alert(1)'>"}
```

---

## Lab
![[image-1098.png]]

So, the first two did not work. I had to use Burp Proxy, capture the WebSocket message, and edit it to not use URL encoded text. Then, when I forwarded the request, I solved the lab, and the script execute an `alert` with the value of `1` on my screen.

---
