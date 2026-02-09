---
title: Clickjacking via DOM XSS
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

# Combining Clickjacking with a DOM XSS Attack
Historically, clickjacking has been used to perform behaviors such as boosting "likes" on a Facebook page. However, the true potency of clickjacking is revealed when it is used as a carrier for another attack such as a DOM XSS attack. 

Implementation of this combined attack is relatively straightforward assuming that the attacker has first identified the XSS exploit. The XSS exploit is then combined with the `iframe` target URL so that the user clicks on the button or link and consequently executes the DOM XSS attack.

---
## Lab
![](../../../../Resources/Clickjacking%20via%20DOM%20XSS-1770506880569.webp)
![](../../../../Resources/Clickjacking%20via%20DOM%20XSS-1770506905911.webp)

---
