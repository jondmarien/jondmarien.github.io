---
title: Bash Jail 3
author:
  - Jon Marien
created: 2025-01-16
tags:
  - issessions
---

| Title       | Author                       | Created          | Published | Tags                         |
| ----------- | ---------------------------- | ---------------- | --------- | ---------------------------- |
| Bash Jail 3 | <ul><li>Jon Marien</li></ul> | January 16, 2025 | \-        | [[#issessions\|#issessions]] |

This one took me **EVEN LONGER*** than the 2nd challenge did. And for good reason, `stdout` and `stderr` are being redirected to `/dev/null`, so nothing is printed to the screen. If we redirect to `stdin`, though (which is at `0`), we can solve the solution and get the flag:
![](bash_jail_3.png)
This works because we are still allowed to use `eval`, and `stdin` was not being redirected to `/dev/null`. 

>[!check]- Flag!
>FLAG-s9wXyc9WKx1X6N9G68fCR0M78sx09D3j