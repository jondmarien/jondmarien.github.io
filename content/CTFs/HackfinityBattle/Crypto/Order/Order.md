---
title: Order
author:
  - Jon Marien
created: 2025-03-17
published: 2025-03-17
tags:
  - ctfs
  - writeups
  - tryhackme
---

| Title | Author                       | Created        | Published      | Tags                                                                   |
| ----- | ---------------------------- | -------------- | -------------- | ---------------------------------------------------------------------- |
| Order | <ul><li>Jon Marien</li></ul> | March 17, 2025 | March 17, 2025 | [[#ctfs\|#ctfs]], [[#writeups\|#writeups]], [[#tryhackme\|#tryhackme]] |

# Order
## Understanding the Challenge
This is a repeating-key XOR cipher problem where:
- We know the ciphertext starts with `ORDER:`.
- This known plaintext can help you determine the encryption key.

## Solution Using CyberChef
1. Go to [CyberChef](https://gchq.github.io/CyberChef/)

2. Input your ciphertext in the "Input" section:
```
1c1c01041963730f31352a3a386e24356b3d32392b6f6b0d323c22243f6373
1a0d0c302d3b2b1a292a3a38282c2f222d2a112d282c31202d2d2e24352e60
```

3. For this specific challenge, add these operations in sequence:
   - "From Hex" (to convert the hex string to bytes)
   - "XOR" (to perform the decryption)

4. Finding the key:
   - We know the plaintext starts with `ORDER:` (hex: 4F 52 44 45 52 3A)
   - The first 6 bytes of ciphertext are: 1C 1C 01 04 19 63
   - XORing these together: 
     - 1C ⊕ 4F = 53 (S)
     - 1C ⊕ 52 = 4E (N)
     - 01 ⊕ 44 = 45 (E)
     - 04 ⊕ 45 = 41 (A)
     - 19 ⊕ 52 = 4B (K)
     - 63 ⊕ 3A = 59 (Y)
   - This gives us the key: `SNEAKY`

5. In the XOR operation in CyberChef:
   - Enter `SNEAKY` as the key
   - Check the "Standard" format option
   - Make sure "UTF8" encoding is selected

The decrypted message should appear in the output window, revealing Cipher's next target.

So, based on my decryption, Cipher's next target is `THM{the_hackfinity_highschool}`. This looks like a flag format for a CTF challenge, so it seems right!

## Alternative Tools

🧠 If you prefer command-line tools:
- **xortool**: Can help identify key length and possible keys
- **Python script**: You could write a simple script using Python's built-in XOR capabilities

Here's a basic Python script I created:

```python
def xor_decrypt(ciphertext_hex, key):
    ciphertext = bytes.fromhex(ciphertext_hex.replace('\n', ''))
    key_bytes = key.encode()
    plaintext = bytearray()
    
    for i in range(len(ciphertext)):
        plaintext.append(ciphertext[i] ^ key_bytes[i % len(key_bytes)])
    
    return plaintext.decode('ascii')

ciphertext = """1c1c01041963730f31352a3a386e24356b3d32392b6f6b0d323c22243f6373
1a0d0c302d3b2b1a292a3a38282c2f222d2a112d282c31202d2d2e24352e60"""
key = "SNEAKY"

print(xor_decrypt(ciphertext, key))
```