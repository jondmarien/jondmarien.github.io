---
title: Bash Jail 2
author: Jon Marien
created: 2025-01-16
modified: 2025-01-16T20:21:17-05:00
tags: 
---

This one took a little bit of trial and error, but I finally got the flag to print out to the console with a simple operation. See photo:
![](bash_jail_2.png)
I simply read the content of `flag.txt` by using command substitution to bypass the restrictions put on the challenge. I basically used `eval location_of_flag` but instantly redirected the output to console. `<` was not one of the restricted characters. 😁

>[!check]- Flag!
>FLAG-a78i8TFD60z3825292rJ9JK12gIyVI5P
