---
title: OS Command Injection
author: Jon Marien
created: 2026-01-14
published: 2026-01-14
tags:
  - bscp
---

| Author     | Published        |
| ---------- | ---------------- |
| Jon Marien | January 14, 2026 |

---
# Description
OS command injection (shell injection) is a vulnerability where an application passes user input into an operating system command, allowing the attacker to execute arbitrary OS commands on the server.

## OS Command Injection
OS command injection happens when an application builds or executes system commands (for example, using `bash`, `sh`, `cmd`, or PowerShell) using unsanitized user input.  Instead of just influencing the intended command, the attacker can inject additional commands or entirely replace the original one.

### Core Idea
- The app calls something like `ping`, `nslookup`, `cat`, `dir`, `tar`, etc., and concatenates user input directly into the command string.
- An attacker adds shell metacharacters (such as `;`, `&&`, `|`, `&`, backticks, `$( )`) so the shell treats part of the input as a **new command**, which then runs with the app’s privileges.   

### Why It’s Bad / Impact
- Successful OS command injection typically gives the attacker the ability to:
  - Read, modify, or delete files.
  - Run arbitrary system utilities.
  - Install backdoors or tools on the server.
- From there, the attacker can often **pivot**:
  - Enumerate the network and connected services.
  - Abuse trust relationships to move laterally into other internal systems and data stores.

### Protect Against It
- Avoid passing user input to the shell entirely: use safe APIs that do not invoke a command interpreter (for example, language-native libraries instead of `system()`/`exec()`/`popen()`).
- If a system command is truly required:
  - Use parameterized APIs that do not invoke a shell, and strictly validate and whitelist allowed input values.  
  - Reject or carefully escape shell metacharacters and never concatenate raw user input into command strings.
- Run the application with **least privilege** and monitor for suspicious command execution patterns.

---
## Useful Commands

After you identify an OS command injection vulnerability, it's useful to execute some initial commands to obtain information about the system. Below is a summary of some commands that are useful on Linux and Windows platforms:

| ***Purpose of command***  | **Linux**     | **Windows**     |
| ------------------------- | ------------- | --------------- |
| **Name of current user**  | `whoami`      | `whoami`        |
| **Operating system**      | `uname -a`    | `ver`           |
| **Network configuration** | `ifconfig`    | `ipconfig /all` |
| **Network connections**   | `netstat -an` | `netstat -an`   |
| **Running processes**     | `ps -ef`      | `tasklist`      |

---
## Injecting OS commands
If we imagine a shopping application that lets the user view whether an item is in stock in a particular store. This information is accessed via a URL:
```http
https://insecure-website.com/stockStatus?productID=381&storeID=29
```

To provide the stock information, the application must query various legacy systems. For historical reasons, the functionality is implemented by calling out to a shell command with the product and store IDs as arguments:
```bash
stockreport.pl 381 29
```

This command outputs the stock status for the specified item, which is returned to the user.

---

In this scenario, the app takes user input and passes it directly into a shell command with **no OS command injection defenses**.

If an attacker submits this as `productID`:

```bash
& echo aiwefwlguh &
```

the resulting command becomes:

```bash
stockreport.pl & echo aiwefwlguh & 29
```

Here, `&` acts as a command separator in many shells, so this actually runs three commands in sequence:

1. `stockreport.pl` (without its expected argument)  
2. `echo aiwefwlguh`  
3. `29` (treated as a command name)

The response:

```bash
Error - productID was not provided
aiwefwlguh
29: command not found
```

shows:

- `stockreport.pl` ran first and errored because it did not get `productID`.  
- `echo aiwefwlguh` ran and printed `aiwefwlguh`.  
- `29` was treated as a command and failed (`command not found`).  

Adding a trailing `&` after the injected `echo` helps **decouple** the injected command from what follows, so later tokens (like `29`) are less likely to break execution of the injected part.  

---

