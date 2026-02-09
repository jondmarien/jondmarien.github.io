---
title: Clickbandit...
author: Jon Marien
created: 2026-02-07
published: 2026-02-07
tags:
  - bscp
---

| Author     | Published         |
| ---------- | ----------------- |
| Jon Marien | February 07, 2026 |

---
# Definition
Burp has a Clickbandit tool. This is better to use, as the method mentioned in [Constructing a Basic Clickjacking Attack](Constructing%20a%20Basic%20Clickjacking%20Attack.md) can become quite tedious, very fast.

This tool lets you use your browser to perform the desired actions on the frameable page, then creates an HTML file containing a suitable clickjacking overlay. 

You can use this to generate an interactive proof of concept in a matter of seconds, without having to write a single line of HTML or CSS. 

---
## Prefilled Form Input
Some websites that require form completion and submission permit prepopulation of form inputs using GET parameters prior to submission. Other websites might require text before form submission. As GET values form part of the URL then the target URL can be modified to incorporate values of the attacker's choosing and the transparent "submit" button is overlaid on the decoy site as in the basic clickjacking example.

---
### Lab
![](../../../../Resources/Clickbandit.-1770505776244.webp)
![](../../../../Resources/Clickbandit.-1770505795725.webp)

---
