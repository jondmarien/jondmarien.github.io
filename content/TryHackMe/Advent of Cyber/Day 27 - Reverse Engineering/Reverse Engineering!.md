---
title: Day 27 - Reverse Engineering!
created: 2024-12-31
---
#tryhackmeaoc2024 
```
McSkidy’s alert dashboard lit up with an unusual alert. A file-sharing web application built by Glitch had triggered a security warning. Glitch had been working hard during this season's SOC-mas after the last scare with the Yule Log Exploit, but this new alert caused McSkidy to question his intentions.

McSkidy began to investigate. It seemed the source of the alert came from a binary file that made its way to the web app’s backend. It did not belong there and had some anomalous activity. The binary was compiled with .NET. This whole setup seemed quite unusual, and with Glitch working on the latest security updates, McSkidy was filled with suspicion.

As McSkidy continued her investigation, Glitch rushed into the room: “I swear I did not put it there! I was testing defences, but I wouldn’t go that far!

McSkidy reassured him, “This doesn’t look like your work. Let's get to the bottom of this. Put on your decompiling hat, and let’s see what we are dealing with.”
```

Binaries have a specific structure depending on the operating system they are designed to run. For example, Windows binaries follow the Portable Executable (PE) structure, whereas on Linux, binaries follow the Executable and Linkable Format (ELF). This is why, for example, you cannot run a **.exe** file on MacOS. With that said, all binaries will contain at least:
- **A code section:** This section contains the instructions that the CPU will execute
- **A data section:** This section contains information such as variables, resources (images, other data), etc
- **Import/Export tables:** These tables reference additional libraries used (imported) or exported by the binary. Binaries often rely on libraries to perform functions. For example, interacting with the Windows API to manipulate files

## Disassembly Vs. Decompiling
Disassembling a binary shows the low-level machine instructions the binary will perform, in assembly.

Decompiling, however, converts the binary into its high-level code, such as C++, C#, etc., making it easier to read. However, we can lose out on information such as variable names. This is useful for a high-level understanding of an application and how the data flows.

This challenge was really cool but I didn't take a lot of screenshots. I was really enjoying it. Here is what I have:

![](Pasted%20image%2020241231202801.png)
![](Pasted%20image%2020241231202804.png)
![](Pasted%20image%2020241231202806.png)
![](Pasted%20image%2020241231202831.png)


![](Pasted%20image%2020241231202755.png)

![](Pasted%20image%2020241231202743.png)


![](Pasted%20image%2020241231202838.png)