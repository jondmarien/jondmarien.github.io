---
title: Eight Sleep Smart Bed Hack
author:
  - Jon Marien
created: 2025-03-19
published: 2025-03-19
tags:
  - issessions
  - writeups
---

| Title                      | Author                       | Created        | Published      | Tags                                                   |
| -------------------------- | ---------------------------- | -------------- | -------------- | ------------------------------------------------------ |
| Eight Sleep Smart Bed Hack | <ul><li>Jon Marien</li></ul> | March 19, 2025 | March 19, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

# My Bed Has Been Hacked??
###### Security Vulnerabilities in Eight Sleep Smart Beds
***How Jeff Bezos Got Into My Bed: An IoT Security Cautionary Tale***
## Slide 1: The Eight Sleep Security Vulnerability

**Key Findings:**
- A security researcher discovered an exposed AWS key in their Eight Sleep smart bed.
- The researcher also found a backdoor that allowed Eight Sleep engineers to remotely SSH into customers' beds.
- Eight Sleep beds ($2,000) require internet connectivity and a $19/month subscription for basic features.

**What Happened:**
The researcher examined the Eight Sleep firmware and discovered:
1. A live AWS key that could potentially access sensitive customer data.
2. Remote SSH access capabilities allowing engineers to control the bed and potentially access the home network.
3. The ability for the company to collect detailed sleep data and habits.

**Non-Technical Explanation:**
Imagine buying a bed that secretly gives strangers keys to your bedroom and collects data about when you sleep and who you sleep with - all while charging you a monthly fee for the privilege.

## Slide 2: Security Implications & Alternative Solution
**Security Risks:**
- Remote access to beds could reveal when users are sleeping or away from home.
- Exposed AWS keys could lead to data breaches or costly AWS bills ($100,000/month potential).
- Connected devices on home networks could be compromised through the bed.
- No user notifications when remote access occurs.

**Why This Matters for Cybersecurity:**
- Demonstrates the hidden risks of IoT devices in intimate spaces.
- Shows how convenience features can compromise privacy and security.
- Highlights the need for transparency about remote access capabilities.
- Illustrates the vulnerability of subscription-based smart devices.

**The Solution:**
The researcher replaced the Eight Sleep's internet connectivity with a $150 aquarium chiller that:
- Provides the same temperature control functionality.
- Requires no internet connection.
- Has no subscription fees.
- Cannot be remotely accessed or monitored.

**Key Takeaway:**
Always question whether devices need internet connectivity and what data they might be collecting about your most private moments.
## The Solution
The researcher replaced the Eight Sleep system with a simple $150 aquarium chiller that provides the same temperature control functionality without internet connectivity, subscriptions, or security vulnerabilities.

🧠 This case exemplifies the "Internet of Things security problem" where manufacturers prioritize connectivity and data collection over security and privacy. It's a reminder that consumers should question whether devices truly need internet connectivity and what data they might be sharing.

---

# Presentation Script: Hacked Beds

## Slide 1: The Security Issue
Today I'm going to share a concerning cybersecurity case study about Eight Sleep smart beds. A security researcher recently discovered that these $2,000 beds, which require a $19 monthly subscription, had multiple serious security vulnerabilities.

First, the researcher found an exposed AWS key in the bed's firmware that could potentially allow attackers to access Amazon's cloud resources and rack up massive bills.

Second, and perhaps most concerning, they discovered a backdoor allowing Eight Sleep engineers to remotely SSH into customers' beds, giving them complete control over the devices. This means engineers could potentially track when you sleep, detect if one or two people are in the bed, and know when your home is empty.

The researcher found these issues by simply downloading the bed's firmware from Eight Sleep's public update URL and analyzing it.

## Slide 2: Why This Matters
This case highlights several critical cybersecurity lessons:

First, it demonstrates the growing problem of unnecessary internet connectivity in everyday objects. Do we really need our beds connected to the internet?

Second, it shows how backdoors intended for technical support can create significant security vulnerabilities. The SSH key found was associated with a generic engineering email, suggesting the entire team might have access to customers' beds.

Third, it illustrates how IoT devices can become attack vectors for entire home networks. Once compromised, these devices could be used to access other systems in your home.

The researcher's elegant solution was to replace the entire Eight Sleep system with a simple $150 aquarium chiller that provides the same temperature control without internet connectivity, subscriptions, or security vulnerabilities.

For non-technical audiences, think of it this way: Would you be comfortable if the company that made your bed could remotely access it anytime, potentially seeing when you're home or away, and having a key that could cost you thousands if stolen? This case reminds us to always question whether our devices need to be connected and what data they might be sharing.

---
