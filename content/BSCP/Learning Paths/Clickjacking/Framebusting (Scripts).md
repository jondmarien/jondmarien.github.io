---
title: Framebusting
author: Jon Marien
created: 2026-02-07
published: 2026-02-07
tags:
  - bscp
---

| Author     | Created           | Published         |
| ---------- | ----------------- | ----------------- |
| Jon Marien | February 07, 2026 | February 07, 2026 |

# Definition

> **Clickjacking attacks are possible whenever websites can be framed.**

Therefore, preventative techniques are based upon restricting the framing capability for websites. A common client-side protection enacted through the web browser is to use frame busting or frame breaking scripts. 

These can be implemented via proprietary browser `JavaScript` add-ons or extensions such as `NoScript`. Scripts are often crafted so that they perform some or all of the following behaviors:
- Check and enforce that the current application window is the main or top window,
- Make all frames visible,
- Prevent clicking on invisible frames,
- Intercept and flag potential clickjacking attacks to the user.

---
 
 Frame busting techniques are often browser and platform specific and because of the flexibility of HTML they can usually be circumvented by attackers. As frame busters are JavaScript then the browser's security settings may prevent their operation or indeed the browser might not even support JavaScript. 
 
 An effective attacker workaround against frame busters is to use the HTML5 `iframe` sandbox attribute. When this is set with the allow-forms or allow-scripts values and the allow-top-navigation value is omitted then the frame buster script can be neutralized as the `iframe` cannot check whether or not it is the top window:
 
 ```HTML
<iframe id="victim_website" src="https://victim-website.com" sandbox="allow-forms"></iframe>
 ```

Both the `allow-forms` and `allow-scripts values` permit the specified actions within the `iframe` but top-level navigation is disabled. 

This inhibits frame busting behaviors while allowing functionality within the targeted site. 

---

## Lab
![](../../../../Resources/Framebusting%20(Scripts)-1770506570769.webp)

![](../../../../Resources/Framebusting%20(Scripts)-1770506670743.webp)

---

