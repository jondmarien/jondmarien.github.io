---
title: Dark Injector
author:
  - Jon Marien
created: 2025-03-17
published: 2025-03-17
tags:
  - ctfs
  - writeups
  - tryhackme
---

| Title         | Author                       | Created        | Published      | Tags                                                                   |
| ------------- | ---------------------------- | -------------- | -------------- | ---------------------------------------------------------------------- |
| Dark Injector | <ul><li>Jon Marien</li></ul> | March 17, 2025 | March 17, 2025 | [[#ctfs\|#ctfs]], [[#writeups\|#writeups]], [[#tryhackme\|#tryhackme]] |

# Dark Injector Solution
Opening up the VM, I immediately browsed to `/tmp/` and listed the files within it. I checked the hidden files, with `ls -la`, and I found a text file which contained information concerning the public key!
![[image-134.png]]
I used Claude 3.7 Sonnet to factor the `n` value I found:
![[image-132.png]]
I then used this simple script to calculate the private key of RSA:
```python
#!/usr/bin/env python3

# The known public key components
n = 34028236692093846084393694896501188881
e = 65537

# After factoring n, enter the values of p and q
p = 5842673006673423723 # First prime factor you found
q = 5824603262460268301 # Second prime factor you found

# Calculate totient: φ(n) = (p-1)(q-1)
phi = (p - 1) * (q - 1)

# Calculate d (private exponent): d ≡ e^(-1) (mod φ(n))
# In Python 3.8+:
d = pow(e, -1, phi)
# For older Python:
# from sympy import mod_inverse
# d = mod_inverse(e, phi)

print(f"Private exponent (d): {d}")

```
![[image-131.png]]
Now, we know `d` is `7587021479694414575537988236040711273`.

RSA_Key.py:
![[image-136.png]]

AES_Decrypt.py
![[image-137.png]]
![[image-135.png]]
