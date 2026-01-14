---
title: Bash Jail 1
author: Jon Marien
created: 2025-01-16
modified:
  - 2025-01-16T20:18:50-05:00
tags: 
---

This one is quite easy, as it is the first Jail escape challenge. It is solved like so:
![](bash_jail_1.png)

We connect to the host, and we enter the username and password. We are given the challenge's bash code, and are asked for an input. If we enter in `bash`, it will spawn another shell! I used `1>&2` to ignore the jail's restrictions, and print the output directly to the screen. If we browse the machine on the new `bash` terminal, we can find the `flag.txt` and `cat` it to our screen, once again using the `1>&2` redirect operator.

>[!check]- Flag!
>FLAG-U96l4k6m72a051GgE5EN0rA85499172K