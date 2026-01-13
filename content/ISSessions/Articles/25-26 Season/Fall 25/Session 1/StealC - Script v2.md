---
title: StealC - Script v2
author: Jon Marien
created: 2025-09-24
published: 2025-09-24
tags:
  - issessions
  - writeups
---

| Title              | Author     | Created            | Published          | Tags                                                   |
| ------------------ | ---------- | ------------------ | ------------------ | ------------------------------------------------------ |
| StealC - Script v2 | Jon Marien | September 24, 2025 | September 24, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

# StealC - Script v2

## Updated Presentation Script v2: The BlockBlasters Breach

---

### **Slide 1: Title Slide**

**Visuals:**
*   Title: The BlockBlasters Breach: Anatomy of a Gaming Cryptostealer
*   Subtitle: ISSessions - Fall 2025
*   Your Name/Handle

**Script:**
"Hey everyone! Welcome to the first ISSessions meeting of the school year. Tonight, I want to share a story that's honestly pretty wild – it's about gaming, crypto, and cybersecurity all colliding in the worst possible way. We're going to dive into how a simple-looking indie game turned into a financial weapon that stole over $150,000 from hundreds of victims. And the scariest part? It happened on Steam – a platform most of us use and trust every day."

_**Speaker Notes:**_ 
*   _Start with energy and enthusiasm to engage the audience right away._
*   _Make eye contact with different sections of the room._
*   _This is about storytelling, not just technical details._

---

### **Slide 2: The Hook - A Story of Betrayal**

**Visuals:**
*   Screenshot of RastalandTV's reaction when his funds were stolen
*   Text on screen: "$31,189 for cancer treatment... stolen in an instant."

**Script:**
"Let me introduce you to Raivo Plavnieks, a 26-year-old Latvian streamer known online as RastalandTV. Earlier this year, Raivo was diagnosed with stage 4 sarcoma – a rare and aggressive form of cancer. To help pay for his treatment, he created a Solana-based token called 'Help Me Beat Cancer' on a platform called Pump.fun, where creators earn fees from trades.

By September, he'd raised over $31,000 for his medical expenses. Then, during a stream, a viewer suggested he try a new game on Steam called BlockBlasters. The moment he launched it, you can see his face change – in real-time, the malware drained his entire wallet. In his own words: 'I can't breathe, I can't think... Can't shake the feeling that it's my fault.' Imagine raising money for cancer treatment, only to have it vanish because you trusted a game on a platform like Steam."

_**Speaker Notes:**_
*   _Speak with genuine empathy here – this is a real person with a real story._
*   _Let the impact of the dollar amount sink in._
*   _The quote adds emotional weight – deliver it with appropriate gravity._

---

### **Slide 3: Agenda**

**Visuals:**
*   Simple list of the presentation sections.

**Script:**
"So how did this happen? And could it happen to any of us? Over the next 20-30 minutes, we'll unpack this whole incident. We'll look at how the attackers pulled it off, why Steam failed to catch it, and exactly how the StealC malware works under the hood. Most importantly, we'll talk about what we can all do to protect ourselves, because this isn't just about one game – it's about a growing trend of attacks targeting gamers and crypto users."

_**Speaker Notes:**_
*   _Keep this brief – it's just setting expectations._
*   _Use hand gestures to emphasize the journey you're taking the audience on._

---

### **Slide 4: The Deception: A Perfect Trojan Horse**

**Visuals:**
*   Screenshot of BlockBlasters Steam store page showing positive reviews
*   Screenshot of early positive Steam reviews

**Script:**
"The genius of this attack was its patience. BlockBlasters launched on Steam at the end of July as a completely legitimate-looking 2D platformer. The developers – calling themselves 'Genesis Interactive' – had created what seemed like a typical indie game. For an entire month, the game was completely clean. It gathered positive reviews. It built a small community. People played it, enjoyed it, and recommended it to others.

This wasn't a rushed job – the attackers played the long game. They knew that building trust first would make their eventual attack much more effective. It's the digital equivalent of a Trojan Horse – appear harmless, gain entry, and then strike when no one's expecting it."

_**Speaker Notes:**_
*   _Emphasize the word "patience" – this wasn't a smash-and-grab attack._
*   _Use the screenshots to show how convincing the deception was._
*   _The Trojan Horse analogy helps the audience understand the strategy._

---

### **Slide 5: The Betrayal and the Mockery**

**Visuals:**
*   Screenshot of SteamDB showing the timeline of updates, highlighting Build 19799326
*   Screenshot of SteamDB showing the final "hi.txt" update

**Script:**
"Then came August 30th – exactly one month after release – when the developers pushed what looked like a routine update: Build 19799326. Hidden in this update was the StealC malware, ready to steal crypto wallets, browser data, and Steam credentials from anyone who launched the game.

But here's where it gets even more brazen. After security researchers discovered the malware and started making noise about it, the attackers pushed one final update that replaced the entire game with a single text file that just said 'hi.' It was their way of thumbing their nose at everyone before Steam finally pulled the game down on September 21st. That's almost a month of active malware distribution on one of the world's largest gaming platforms."

_**Speaker Notes:**_
*   _Point directly to the build number on the slide – this is the "smoking gun."_
*   _The 'hi.txt' detail shows the attackers' arrogance – use your tone to convey this._
*   _Express appropriate outrage at the timeline – a month is an eternity in security terms._

---

### **Slide 6: The Impact & Response**

**Visuals:**
*   Statistics showing victim count and financial impact
*   Chart showing types of data compromised
*   Community response details

**Script:**
"The damage was extensive – over $150,000 stolen from approximately 400 victims. But what happened next shows the power of community. When word got out about RastalandTV's situation, the crypto community rallied in an incredible way. His 'Help Me Beat Cancer' token surged 3,000% to a $2.5 million market cap, generating substantial creator rewards. Crypto influencer Alex Becker personally donated $32,500 to cover Raivo's losses. His GoFundMe for cancer treatment saw an influx of donations.

While this story had something of a happy ending for Raivo, most victims weren't so lucky. And the incident revealed just how vulnerable trusted platforms can be when it comes to protecting users from supply chain attacks."

_**Speaker Notes:**_
*   _The statistics help quantify the scale of the attack._
*   _The community response shows the positive side of the crypto community._
*   _Transition to the platform responsibility angle for the next slide._

---

### **Slide 7: Platform Responsibility: The Valve Vector**

**Visuals:**
*   Steam logo with a large question mark over it.
*   Timeline showing the malware's presence on Steam

**Script:**
"Let's talk about the elephant in the room: How did this happen on Steam? This wasn't some shady third-party site – this was Valve's Steam, one of the most trusted gaming platforms in the world.

The critical failure point was in how updates are vetted. While initial game submissions go through some level of review, updates to already-approved games receive minimal scrutiny. The attackers exploited this gap perfectly – get approved with clean code, build trust, then slip in the malware through an update.

For nearly a month, this malicious code sat on Steam's servers, being downloaded by unsuspecting users. That's not just a small oversight – it's a fundamental security gap in how digital distribution platforms operate."

_**Speaker Notes:**_
*   _This is where you can show some righteous indignation on behalf of users._
*   _Emphasize that this isn't just about one incident but a systemic issue._
*   _The timeline visual helps drive home how long this went unaddressed._

---

### **Slide 8: A Pattern of Abuse**

**Visuals:**
*   Logos/names of other compromised games: "PirateFi," "Chemia," "Sniper: Phantom's Resolution."

**Script:**
"And here's the really concerning part – BlockBlasters wasn't a one-off. Throughout 2025, we've seen other games on Steam being used as malware vectors. Games like 'PirateFi,' 'Chemia,' and 'Sniper: Phantom's Resolution' have all been identified as carrying similar payloads.

This points to a pattern of abuse that's becoming more common. Attackers have figured out that gaming platforms have a security blind spot when it comes to updates, and they're exploiting it repeatedly. The trust that millions of gamers place in platforms like Steam is being weaponized against them."

_**Speaker Notes:**_
*   _The pattern is important – it shows this isn't an isolated incident._
*   _Use these examples to emphasize that this is an ongoing threat._
*   _This sets up the technical deep dive that follows._

---

### **Slide 9: Technical Deep Dive: Inside StealC**

**Visuals:**
*   Flowchart showing the infection chain: `Game Launch -> launch.vbs -> Recon -> AV Check -> Payload`

**Script:**
"Now let's get into the technical stuff. The malware behind this attack comes from the StealC family – a sophisticated info-stealer that's sold as Malware-as-a-Service on Russian-speaking forums. Think of it as 'crime software' that anyone can buy access to.

When you launched BlockBlasters, it kicked off a VBScript dropper called `launch.vbs`. This script was surprisingly sophisticated – it would check if it had admin rights, gather data about your location and IP, and run a check against a huge list of antivirus and security tools to see if it was being monitored.

If it detected security software, it would change its behavior to try to evade detection. This isn't amateur hour – this is professional-grade malware designed to adapt to its environment."

_**Speaker Notes:**_
*   _Use the flowchart to guide the audience through the infection chain._
*   _Explain the Malware-as-a-Service concept for those unfamiliar with it._
*   _Highlight the sophistication – this helps explain why it was effective._

---

### **Slide 10: Theft, Exfiltration, and Targeting**

**Visuals:**
*   Icons representing what was stolen: Steam logo, Chrome/Firefox logos, Bitcoin/Ethereum logos.
*   Code snippet showing the parsing of `loginusers.vdf`.

**Script:**
"StealC's primary goal is theft, and it's very good at what it does. It targets browser data like cookies and saved passwords, but it's especially interested in cryptocurrency wallets. In the BlockBlasters variant, it specifically went after Steam's `loginusers.vdf` file – that's where your Steam credentials are stored, especially if you have 'Remember Password' enabled.

What's particularly devious is that the attackers maintained a file called `whitelisted_users.txt` on their command and control server. This contained a list of high-value targets who would receive special, more aggressive payloads. RastalandTV was likely on this list because of his crypto holdings. This wasn't just mass harvesting – there was targeted hunting going on as well."

_**Speaker Notes:**_
*   _The code snippet adds technical credibility to your presentation._
*   _The concept of a "whitelist" for targets shows the sophisticated, targeted nature of the attack._
*   _Connect back to RastalandTV's story to maintain the human element._

---

### **Slide 11: Detection & Response**

**Visuals:**
*   A text box with the key IOCs (C2 IP, a few file hashes).
*   A simple YARA rule example.

**Script:**
"So how do we find and stop this kind of threat? For security professionals, we have some concrete indicators of compromise from the vx-underground report. The command and control server was at this IP address, and we have file hashes for the malicious components.

We can also write YARA rules – think of these as search patterns for malware – to detect StealC variants. For organizations, detection comes down to monitoring your network for traffic to known bad IPs and watching for suspicious process chains – like when a game suddenly starts launching scripts that access your browser's password database.

The security community's response to this incident was actually pretty impressive. Researchers like ZachXBT and the team at vx-underground collaborated to analyze the malware, track the attackers, and even take down their command and control infrastructure."

_**Speaker Notes:**_
*   _Explain YARA in simple terms for those unfamiliar with it._
*   _Highlight the collaborative security response as a positive aspect of the story._
*   _This section bridges the technical details to the lessons learned._

---

### **Slide 12: Lessons Learned**

**Visuals:**
*   Three columns: "For the Community," "For the Attackers," "For the Platforms."

**Script:**
"This incident taught us a lot. For the security community, it showed how powerful collaborative, open-source intelligence can be. Researchers from different backgrounds came together, shared information, and were able to track and disrupt the attackers' operations.

For the attackers, it showed that bad operational security gets you caught. They left Telegram tokens exposed and had vulnerabilities in their command and control server that researchers exploited against them.

And for platforms like Steam, the lesson is crystal clear: you absolutely need continuous security vetting for updates, not just initial submissions. The trust users place in these platforms means they have a responsibility to protect against these kinds of supply chain attacks."

_**Speaker Notes:**_
*   _This slide shows you've thought deeply about the implications beyond just the technical details._
*   _Emphasize the collaborative nature of the security community's response._
*   _The platform responsibility point can be delivered with some emphasis – this is a key takeaway._

---

### **Slide 13: The Rogues' Gallery**

**Visuals:**
*   The comparison table of StealC vs. Vidar, Raccoon, and RedLine.

**Script:**
"StealC isn't alone in this space. It's part of a growing ecosystem of information stealers. When we compare it to other major players like Vidar, Raccoon, and RedLine, we see a lot of similarities in their methods. They're all sold as a service, they all target similar data, and they all use similar distribution techniques.

What makes StealC stand out is its use of RC4 encryption in its latest version and its particularly effective targeting capabilities. It represents an evolution of the infostealer model, becoming more sophisticated with each iteration. Understanding this broader landscape helps us see that this isn't just about one malware family – it's about an entire criminal industry that's constantly innovating."

_**Speaker Notes:**_
*   _Don't read the whole table – just highlight key differences and similarities._
*   _This context helps the audience understand the broader threat landscape._
*   _Keep this section brief – it's just providing context._

---

### **Slide 14: Protecting Yourself: For Gamers**

**Visuals:**
*   Simple, clear icons for each recommendation.

**Script:**
"So what can we do to protect ourselves? If you're a gamer, there are some practical steps you can take. First, be incredibly wary of game updates, even on trusted platforms like Steam. If an update seems unexpected or a game suddenly needs new permissions, that's a red flag.

Never download pirated games – they're a primary vector for malware. Use a standard user account for gaming, not an admin account – this limits what malware can do even if you get infected. And keep everything updated – your OS, your browser, your drivers – because those patches often fix security holes that malware exploits.

Remember, even legitimate-looking games from trusted platforms can be compromised. The BlockBlasters incident proves that we need to stay vigilant, even in spaces we consider safe."

_**Speaker Notes:**_
*   _Deliver this as practical advice that people can implement right away._
*   _These are actionable steps that don't require technical expertise._
*   _The reminder about trusted platforms reinforces the main lesson of the presentation._

---

### **Slide 15: Protecting Yourself: For Crypto Users**

**Visuals:**
*   Image of a hardware wallet (like a Ledger or Trezor).

**Script:**
"For those of you involved with cryptocurrency, the stakes are even higher. The single most important thing you can do is use a hardware wallet. These physical devices keep your private keys completely offline, which means they're immune to malware like StealC. Even if your computer is completely compromised, your crypto remains safe.

Beyond that, be paranoid about phishing attempts, enable Two-Factor Authentication on every exchange and service you use, and if possible, use a dedicated device just for crypto transactions. And always, always do your own research before investing in any project.

These steps might seem excessive, but as RastalandTV's story shows, the consequences of a security breach can be devastating – especially when your financial future or, in his case, medical treatment is on the line."

_**Speaker Notes:**_
*   _Hold up the hardware wallet image as a visual aid if possible._
*   _Speak with conviction here – these aren't optional best practices._
*   _Connecting back to RastalandTV's story brings the presentation full circle._

---

### **Slide 16: Conclusion & Q&A**

**Visuals:**
*   A summary of the three key takeaways.
*   Your contact info (email, Twitter/X handle, etc.).

**Script:**
"To wrap things up, the BlockBlasters incident teaches us three critical lessons: First, gaming platforms are increasingly being weaponized for cybercrime. Second, supply chain security – especially for software updates – is more important than ever. And third, a security-first mindset is our best defense against these evolving threats.

Remember, trust is a vulnerability when it's exploited by bad actors. Always verify, always question, and always protect yourself – even on platforms you think you can trust.

Thank you all for coming to our first meeting of the year! I'm happy to take any questions you might have about this incident or cryptostealers in general."

_**Speaker Notes:**_
*   _End with energy and confidence._
*   _Have some anticipated questions ready in case the audience is shy._
*   _Be prepared for technical questions about the malware or broader questions about platform responsibility._
