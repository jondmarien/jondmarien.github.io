---
title: Multi-step Clickjacking
author: Jon Marien
created: 2026-02-07
published: 2026-02-07
tags:
  - certs
  - bscp
  - burp
---

| Title                   | Author     | Created           | Published         | Tags                                                   |
| ----------------------- | ---------- | ----------------- | ----------------- | ------------------------------------------------------ |
| Multi-step Clickjacking | Jon Marien | February 07, 2026 | February 07, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

---

# Multistep clickjacking

Attacker manipulation of inputs to a target website may necessitate multiple actions. For example, an attacker might want to trick a user into buying something from a retail website so items need to be added to a shopping basket before the order is placed. 

These actions can be implemented by the attacker using multiple divisions or `iframe`s. Such attacks require considerable precision and care from the attacker perspective if they are to be effective and stealthy.

---
## Lab
![](../../../../Resources/Multi-step%20Clickjacking-1770507228467.webp)
![](../../../../Resources/Multi-step%20Clickjacking-1770507240175.webp)
![](../../../../Resources/Multi-step%20Clickjacking-1770507308172.webp)

---
