# Point Breakdown + Article Link

https://arstechnica.com/security/2024/03/hackers-can-extract-secret-encryption-keys-from-apples-mac-chips/

- Researchers found a bug in the Apple M1, M2 and M3 chipsets that is unpatchable unless you replace the CPU. 
	- AKA you need to go into the store to buy/receive a replacement
- This bug is a local bug, meaning someone has to already have physical access to your computer to exploit this. NO RCE issues.
- The bug uses a side-channel attack to leak cryptographic key information.
	- Side-channel attack is a way to gather information from other channels like time, heat, sound that allow you to gather other information.
- In this case, the bug exploits the cache timing to leak information.
**-- Talk about slide notes (explain side-channel attacks)**
- DMPs (Data Memory Dependent Prefetchers) are a hardware feature in Apple Silicon that speeds up the CPU by pre-fetching memory.
- The bug allows attackers to exploit DMPs to launch cache timing attacks and steal cryptographic keys.
- The Apple engineers when making their own silicon did not do any checking or validation on whether the variable passed into the DMP (data memory dependent prefetchers) is a pointer or not 🥴
- This vulnerability allows an attacker process to listen in to another process and figure out the cryptographic keys.
Can you put this in the slide notes? These don't need to go on the slide, I'm just explaining how side-channel attacks work. Plus I don't think it will all fit on the slide in a nice way.

A Side-channel attack means to aim or target and exploit unintended effects of a computer program to leak sensitive data.
- Traditionally, a program might take a different amount of time to compare a wrong character than a correct character in password checking. By measuring these timings, an attacker can potentially guess the correct password.
- Cache is a small amount of very fast memory that sits between the CPU and the main memory (RAM). When a program needs data, it first checks the cache. If the data is in the cache, it can be accessed very quickly. Otherwise, the CPU has to fetch it from main memory, which is much slower.
- Different processes can share the same cache, allowing a program to potentially observe how long it takes for the cache to be hit or missed and gain information about another process.
- The bug found in Apple M1, M2, and M3 chipsets allows a process to exploit this side-channel attack and leak sensitive data including cryptographic keys from other processes.