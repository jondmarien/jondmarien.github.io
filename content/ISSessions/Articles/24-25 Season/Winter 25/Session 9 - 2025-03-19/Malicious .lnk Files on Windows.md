---
title: Malicious .lnk Files on Windows
author:
  - Jon Marien
created: 2025-03-19
published: 2025-03-19
tags:
  - issessions
  - writeups
---

| Title                           | Author                       | Created        | Published      | Tags                                                   |
| ------------------------------- | ---------------------------- | -------------- | -------------- | ------------------------------------------------------ |
| Malicious .lnk Files on Windows | <ul><li>Jon Marien</li></ul> | March 19, 2025 | March 19, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

# Windows Shortcut Zero-Day (ZDI-CAN-25373): A Critical Cybersecurity Threat

## Slide 1: What Happened & How

**The Discovery:**
- Trend Micro's Zero Day Initiative (ZDI) uncovered Windows vulnerability exploited since 2017.
- Nearly 1,000 malicious shortcut (`.lnk`) files identified.
- 11 state-sponsored groups from North Korea, Iran, Russia, and China actively using it.

**How It Works (Non-Technical):**
- Attackers create special Windows shortcut files with hidden commands.
- When users view these files, Windows doesn't show the dangerous commands.
- Like a gift box that looks normal on the outside but contains something harmful inside.
- When clicked, these shortcuts secretly run malicious code without the user's knowledge.

## Slide 2: Why It Matters & Impact

**Why This Is Significant:**
- Microsoft declined to patch despite widespread exploitation.
- Primarily used for espionage (70%) and financial theft (20%).
- Targets include government, financial, military, and energy sectors.
- Global impact across multiple continents.

**About the ZDI-CAN-25373 Identifier:**
- Assigned by Zero Day Initiative (ZDI), a legitimate vulnerability research program.
- ZDI serves as a CVE Numbering Authority (CNA).
- No CVE assigned yet as Microsoft declined to patch -- due to it being a "UI issue".
- ZDI uses internal tracking IDs before official CVE assignment.

**Protection Measures:**
- Implement endpoint protection that detects suspicious shortcut files.
- Train users to be cautious of file attachments, especially shortcuts.
- Use security tools to inspect shortcut files.
- Monitor for unusual activity related to `.lnk` files.

---

# Presentation Script: Windows Shortcut Zero-Day Vulnerability

## Introduction
Hey everyone, thanks for joining me today. I'm going to quickly walk you through this Windows shortcut zero-day vulnerability that's been flying under the radar but actually has some serious implications for our security posture.

## Slide 1: What Happened & How
So check this out - we've got this vulnerability called `ZDI-CAN-25373` that was discovered by Trend Micro's Zero Day Initiative. The wild thing is that this has been actively exploited since 2017 - that's over 6 years of active exploitation in the wild!

Researchers have found almost 1,000 malicious shortcut files in the wild using this technique. And it's not just random hackers - we're talking about 11 different state-sponsored groups from countries like North Korea, Russia, China, and Iran. This is serious nation-state level stuff.

Now, let me break down how this works in simple terms. You know those Windows shortcut files - the .lnk files we use all the time? Well, attackers have figured out a way to create special shortcuts that contain hidden commands. When you look at these files in Windows Explorer, everything looks normal - Windows doesn't show you the dangerous commands hidden inside.

Just to be clear about what these `.lnk` files actually are - they're legitimate Windows shortcuts we all use daily. Normally, they store things like the path to the target file or program, working directory, command-line arguments, icon location, and even keyboard shortcuts. They're designed to make our lives easier by giving us quick access to our frequently used stuff. You know, like those shortcuts on your desktop to launch Word or Chrome.

It's kind of like getting a gift box that looks perfectly normal on the outside, but when you open it - boom - there's something harmful inside. When users click on these shortcuts, they're unknowingly executing malicious code on their systems.

## Slide 2: Why It Matters & Impact
So why am I bringing this to your attention? First off, Microsoft has actually declined to patch this vulnerability despite how widely it's being exploited. They don't consider it critical enough -- they consider it to be a UI issue, not a security issue, which is pretty concerning.

The impact is significant - about 70% of these attacks are being used for espionage and another 20% for financial theft. The targets aren't random either - they're going after government agencies, financial institutions, military organizations, and critical infrastructure like energy sectors. And this is happening globally - North America, Europe, Asia, you name it.

Now, about this weird name - `ZDI-CAN-25373`. This isn't your typical CVE identifier because it's still in the tracking system of the Zero Day Initiative. ZDI is a legitimate vulnerability research program that's been around since 2005 and is now owned by Trend Micro. They're actually authorized to assign official CVE numbers as a CVE Numbering Authority.

The reason this vulnerability doesn't have a proper CVE yet is because Microsoft has declined to patch it, so it's stuck in this limbo state with just the ZDI tracking number.

So what can we do about it? We need to make sure our endpoint protection can detect these suspicious shortcut files. We should remind our users to be extra cautious about shortcut files they receive. Since Windows won't show the dangerous commands, we need security tools that can inspect these files properly. And we should be monitoring our environment for any unusual activity related to `.lnk` files.

Any questions before we wrap up?

---
