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

## What Happened
A security researcher discovered multiple security issues in the Eight Sleep smart bed system that cost $2,000 and requires a $19/month subscription:

1. An exposed AWS key was found in the bed's firmware that could potentially allow attackers to access Amazon Web Services resources.
2. A backdoor that enables Eight Sleep engineers to remotely SSH into customers' beds, giving them complete control over the device.
3. The ability to access the bed's firmware through a public update URL.

## How It Was Discovered
- The researcher downloaded the bed's firmware directly from Eight Sleep's update URL.
- Analysis of the firmware revealed SSH access was configured to connect to a remote server (`remote-connectivity-api.8slp.net`).
- A public SSH key associated with "`[email protected]`" was found, suggesting the entire engineering team might have access.

## Why This Matters (Non-Technical)
- **Privacy Concerns**: Engineers could potentially:
  - Track when you sleep.
  - Detect if one or two people are in the bed.
  - Know when your home is empty.
- **Network Security**: The bed could be used as an entry point to access other devices on your home network.
- **Financial Risk**: The exposed AWS key could have been used to generate massive bills ($100,000/month) for Eight Sleep.
- **Reliability Issues**: The bed won't function without internet connectivity, and features are locked behind a subscription.

## Cybersecurity Implications
- Demonstrates the growing problem of unnecessary internet connectivity in everyday objects.
- Highlights the trade-off between convenience and security/privacy.
- Shows how backdoors intended for support can create significant security vulnerabilities.
- Illustrates how IoT devices can become attack vectors for entire home networks.

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
