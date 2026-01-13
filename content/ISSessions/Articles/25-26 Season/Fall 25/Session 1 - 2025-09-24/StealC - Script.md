---
title: StealC - Script
author: Jon Marien
created: 2025-09-24
published: 2025-09-24
tags:
  - issessions
  - writeups
---

| Title           | Author     | Created            | Published          | Tags                                                   |
| --------------- | ---------- | ------------------ | ------------------ | ------------------------------------------------------ |
| StealC - Script | Jon Marien | September 24, 2025 | September 24, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

# StealC - Script

## Presentation Script: The BlockBlasters Breach

---

### **Slide 1: Title Slide**

**Visuals:**
*   Title: The BlockBlasters Breach: Anatomy of a Gaming Cryptostealer
*   Subtitle: ISSessions - Fall 2025
*   Jon Marien | chrono

**Script:**
"Good evening, everyone. Thanks for coming to the first ISSessions meeting of the school year. I hope everyone enjoyed Adam's awesome talk about hacking his Mazda3!! Tonight, we're diving into a story that sits at the perfect intersection of gaming, cryptocurrency, and cybersecurity. It’s a story about a simple-looking game that turned into a financial weapon, and it highlights a critical vulnerability in a platform that millions of us trust every single day. We're talking about the BlockBlasters breach."

_**Speaker Notes:**_ 
*   _Welcome everyone back from the summer break._
*   _Keep the energy up and engaging._
*   _Set the stage for a compelling story, not just a dry technical talk._

---

### **Slide 2: The Hook - A Story of Betrayal**

**Visuals:**
*   `[Screenshot or clip: RastalandTV losing funds live on stream - if available]`
*   Text on screen: "$32,000 for cancer treatment... gone in an instant."

**Script:**
"To understand the real impact of this, I want to start with a person, not a piece of code. This is Raivo Plavnieks, a Latvian streamer known as RastalandTV. He was battling stage 4 cancer and was raising money for his treatment by streaming. One evening, while playing a game called BlockBlasters, his crypto wallet was drained of $32,000, live, in front of his viewers. This wasn't a random hack; he was specifically targeted. His story is the human cost of the malware we're dissecting tonight."

_**Speaker Notes:**_
*   _Speak with empathy. This is the emotional core of the presentation._
*   _Pause for a moment after saying "gone in an instant" to let the impact sink in._

---

### **Slide 3: Agenda**

**Visuals:**
*   Simple list of the presentation sections.

**Script:**
"So, how did this happen? Over the next 20-30 minutes, we'll unpack this entire incident. We’ll start with the case study of BlockBlasters itself, then we'll look at the responsibility of the platform it was on—Steam. We'll do a technical deep dive into the malware, called StealC, and discuss how to detect it. We'll cover the lessons learned, and most importantly, we'll finish with actionable steps you can take to protect yourselves."

_**Speaker Notes:**_
*   _Quickly go through the agenda. Don't spend too much time here._
*   _This sets expectations and provides a roadmap for the audience._

---

### **Slide 4: The Deception: A Perfect Trojan Horse**

**Visuals:**
*   `[Screenshot: BlockBlasters Steam store page showing positive reviews and legitimate appearance]`
*   `[Screenshot: Early positive Steam reviews showing legitimate gameplay feedback]`

**Script:**
"The attack on RastalandTV and hundreds of others began with a classic Trojan Horse. BlockBlasters was released on Steam at the end of July. For a full month, it was a perfectly normal, clean game. It gathered positive reviews. It built a community. It established trust. The attackers played the long game, patiently waiting for their moment."

_**Speaker Notes:**_
*   _Emphasize the word "trust." This is the central theme of the deception._
*   _Use the screenshots to show how convincing the fake game was._

---

### **Slide 5: The Betrayal and the Mockery**

**Visuals:**
*   `[Screenshot: SteamDB showing the timeline of updates, highlighting Build 19799326]`
*   `[Screenshot: SteamDB patch notes showing the final "hi.txt" update before removal]`

**Script:**
"And that moment came on August 30th, with a malicious patch: Build 19799326. This update, hidden among legitimate-looking changes, contained the cryptostealer. The game that users had trusted was now a weapon aimed directly at their digital lives. And to add insult to injury, after the malware was discovered, the attackers pushed one final, arrogant update that replaced the entire game with a single text file that just said 'hi,' moments before Steam finally took it down."

_**Speaker Notes:**_
*   _Point directly to the build number on the slide. This is the "smoking gun."_
*   _The 'hi.txt' detail shows the attackers' mindset and adds a memorable detail to the story._

---

### **Slide 6: Platform Responsibility: The Valve Vector**

**Visuals:**
*   Steam logo with a large question mark over it.
*   Text: "A month. The malware was live for a month."

**Script:**
"This brings us to a critical question of platform responsibility. The malware was active on one of the world's largest gaming platforms for nearly a month. This wasn't a shady third-party site; this was Steam. This incident reveals a colossal failure in Valve's security vetting process, specifically for game *updates*. While the initial game was clean, the subsequent patch was not, and it slipped right through."

_**Speaker Notes:**_
*   _Pose this as a question to the audience. Engage them directly._
*   _Stress the word "updates" as the key failure point._

---

### **Slide 7: A Pattern of Abuse**

**Visuals:**
*   Logos/names of other compromised games: "PirateFi," "Chemia," "Sniper: Phantom's Resolution."

**Script:**
"And BlockBlasters wasn't an isolated case. Throughout 2025, other games on Steam have been used for similar purposes, including titles like 'PirateFi' and 'Chemia.' This shows a clear pattern of abuse that threat actors are exploiting. The trust that users place in the Steam platform is being systematically weaponized, and it raises serious questions about the security models of digital distribution platforms."

_**Speaker Notes:**_
*   _This slide shows that you've done your research and this isn't just a one-off event._
*   _Connects the dots for the audience, showing a larger trend._

---

### **Slide 8: Technical Deep Dive: Inside StealC**

**Visuals:**
*   Flowchart showing the infection chain: `Game Launch -> launch.vbs -> Recon -> AV Check -> Payload`

**Script:**
"So, let's get technical. The malware behind this is from the StealC family, a potent info-stealer sold as a Malware-as-a-Service. The infection chain in BlockBlasters started with a VBScript dropper called `launch.vbs`. This script was highly environment-aware. It would check if it had admin rights, gather data about the victim's IP and location, and most importantly, it would run a check against a huge list of antivirus and EDR process names to see if it was being watched."

_**Speaker Notes:**_
*   _This is for the technical members of your audience. Use the flowchart to guide them._
*   _Explain what "Malware-as-a-Service" means (democratizing cybercrime)._

---

### **Slide 9: Theft, Exfiltration, and Targeting**

**Visuals:**
*   Icons representing what was stolen: Steam logo, Chrome/Firefox logos, Bitcoin/Ethereum logos.
*   Code snippet showing the parsing of `loginusers.vdf`.

**Script:**
"StealC's primary goal is theft. It targets browser data—cookies, passwords—and is especially interested in cryptocurrency wallets. In this case, it specifically targeted Steam's `loginusers.vdf` file to hijack player accounts. All this stolen data was then exfiltrated to a Command and Control server. The attackers even used a `whitelisted_users.txt` file on their server to deploy special, more aggressive payloads against high-value targets like our streamer, demonstrating a tiered and targeted attack strategy."

_**Speaker Notes:**_
*   _The code snippet adds technical credibility._
*   _The concept of a "whitelist" for targets is a key detail that shows sophistication._

---

### **Slide 10: Detection & Response**

**Visuals:**
*   A text box with the key IOCs (C2 IP, a few file hashes).
*   A simple YARA rule example.

**Script:**
"So, how do we find this? For defenders, we have clear Indicators of Compromise from the vx-underground report, like the C2 IP address and file hashes. We can also write YARA rules, which are like fingerprints for malware, to hunt for these threats. For organizations, detection relies on monitoring your network for traffic to these known bad IPs and monitoring your endpoints for suspicious process chains—like a game suddenly launching a script that tries to access your browser's password files."

_**Speaker Notes:**_
*   _Explain YARA in simple terms: "It's like CTRL+F for malware hunters."_
*   _Keep this section concise and focused on actionable detection methods._

---

### **Slide 11: Lessons Learned**

**Visuals:**
*   Three columns: "For the Community," "For the Attackers," "For the Platforms."

**Script:**
"This incident taught us a lot. For the security community, it showed the incredible power of collaborative, open-source intelligence in tracking and taking down threats. For the attackers, it showed that bad OPSEC gets you caught—they left Telegram tokens and vulnerabilities in their C2 server that researchers used against them. And for platforms like Steam, the lesson is clear: you MUST have robust, continuous security vetting for software updates, not just the initial submission."

_**Speaker Notes:**_
*   _This is a powerful summary slide. It shows critical thinking beyond just the technical details._
*   _Highlight the collaborative nature of the security community's response._

---

### **Slide 12: The Rogues' Gallery**

**Visuals:**
*   The comparison table of StealC vs. Vidar, Raccoon, and RedLine.

**Script:**
"To put StealC in context, it's part of a large and growing family of info-stealers. When we compare it to other major players like Vidar, Raccoon, and RedLine, we see a lot of similarities in their methods. They are all sold as a service, they all target similar data, and they all use similar distribution methods. StealC is not unique, but it is a highly effective evolution of the modern info-stealer."

_**Speaker Notes:**_
*   _Don't read the whole table. Just use it to make the point that this is a widespread problem._
*   _Spend no more than a minute on this slide._

---

### **Slide 13: Protecting Yourself: For Gamers**

**Visuals:**
*   Simple, clear icons for each recommendation.

**Script:**
"So, how do we stay safe? For gamers, the advice is practical. Be incredibly wary of game updates, even on trusted platforms. Never download pirated games—they are a primary vector for malware. Use a standard, non-admin user account for your daily activities, including gaming. And keep everything—your OS, your browser, your drivers—patched and up to date."

_**Speaker Notes:**_
*   _Make this section empowering. You're giving the audience tools to protect themselves._
*   _Keep the points clear and concise._

---

### **Slide 14: Protecting Yourself: For Crypto Users**

**Visuals:**
*   Image of a hardware wallet (like a Ledger or Trezor).

**Script:**
"For those involved in cryptocurrency, the stakes are even higher. The single most important thing you can do is use a hardware wallet. This keeps your private keys completely offline, immune to malware like StealC. Beyond that, be paranoid about phishing, enable Two-Factor Authentication on every single exchange and service you use, and always, always do your own research before investing in a project."

_**Speaker Notes:**_
*   _Be firm and direct here. These are non-negotiable security practices._
*   _Emphasize that a hardware wallet is the gold standard._

---

### **Slide 15: Conclusion & Q&A**

**Visuals:**
*   A summary of the three key takeaways.
*   Your contact info (email, Twitter/X handle, etc.).

**Script:**
"In conclusion, the BlockBlasters incident is a perfect storm of modern cyber threats. It shows how gaming platforms can be weaponized, it underscores the critical importance of supply chain security, and it proves that a security-first mindset is our best defense. Thank you for your time, and I'm now happy to answer any questions you might have."

_**Speaker Notes:**_
*   _End on a strong, conclusive note._
*   _Be prepared for questions about Valve's response, other similar incidents, or more technical details._

