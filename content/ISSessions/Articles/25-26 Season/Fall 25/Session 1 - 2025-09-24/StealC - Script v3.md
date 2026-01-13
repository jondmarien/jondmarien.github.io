---
title: StealC - Script v3
author: Jon Marien
created: 2025-09-24
published: 2025-09-24
tags:
  - issessions
  - writeups
---

| Title              | Author     | Created            | Published          | Tags                                                   |
| ------------------ | ---------- | ------------------ | ------------------ | ------------------------------------------------------ |
| StealC - Script v3 | Jon Marien | September 24, 2025 | September 24, 2025 | [[#issessions\|#issessions]], [[#writeups\|#writeups]] |

# StealC - Script v3

## The BlockBlasters Breach: Anatomy of a Gaming Cryptostealer

---

### **Slide 1: Title Slide**

**Visuals:**
* Neon cyberpunk title with glowing cyan text
* Subtitle: ISSessions - Fall 2025

**Script:**
"Hey everyone! Jon here. First off, thanks for rolling out to our very first ISSessions gathering of the year. You guys are awesome for showing up—I see lots of familiar faces, and some new ones too, which is always hype.

Tonight, I wanna share a story that hit me right in the feels. It's got gaming, crypto, and cyber chaos all wrapped into one wild ride. We're going to dive into how a simple-looking indie game turned into a financial weapon that stole over $150,000 from hundreds of victims. And the scariest part? It happened on Steam – a platform most of us use and trust every day."

**Speaker Notes:**
* *Start with energy and enthusiasm to engage the audience right away*
* *Make eye contact with different sections of the room*
* *This is about storytelling, not just technical details*
* *The cyberpunk aesthetic of the slides matches the theme of digital theft*

---

### **Slide 2: The Human Cost**

**Visuals:**
* Placeholder for RastalandTV's reaction when his funds were stolen
* Neon highlighted text: "$31,189 for cancer treatment... stolen in an instant"
* Cyberpunk-styled quote box

**Script:**
"So, let me introduce you to Raivo Plavnieks. You might know him by his gamer tag, RastalandTV. He's a 26-year-old Latvian streamer who was diagnosed with stage 4 sarcoma cancer earlier this year. To help pay for his treatment, he created a Solana-based token called 'Help Me Beat Cancer' on Pump.fun, where creators earn fees from trades.

By September, he'd raised over $31,000 for his medical expenses. Then, during a stream, a viewer suggested he try a new game on Steam called BlockBlasters. The moment he launched it, you can see his face change – in real-time, the malware drained his entire wallet. Imagine raising money for cancer treatment, only to have it vanish because you trusted a game on a platform like Steam. That could be literally any of us."

**Speaker Notes:**
* *Speak with genuine empathy here – this is a real person with a real story*
* *Let the impact of the dollar amount sink in*
* *The visual of his reaction adds emotional weight – gesture toward it*
* *Connect the audience to the victim – "that could be any of us"*

---

### **Slide 3: Mission Briefing**

**Visuals:**
* Cyberpunk-styled agenda with neon icons for each section
* Animated hover effects on agenda items

**Script:**
"Now, you're probably thinking: 'Could something like this happen to me? I just wanna play some games for a bit!' Honest question. Tonight, we're gonna dive into how these hackers pulled it off, why Steam looked the other way, and what makes StealC malware so slick. 

We'll unpack this whole incident step by step. We'll look at the technical details of how the attack worked, examine the broader pattern of similar attacks, and most importantly, talk about what we can all do to protect ourselves. Stick with me, and I'll show you how easy trust can blow up in your face."

**Speaker Notes:**
* *Keep this brief – it's just setting expectations*
* *Use hand gestures to emphasize the journey you're taking the audience on*
* *The cyberpunk aesthetic of the "mission briefing" sets the tone for a technical deep dive*

---

### **Slide 4: The Deception: A Perfect Trojan Horse**

**Visuals:**
* *Placeholder for BlockBlasters Steam store page showing positive reviews*
* *Timeline visualization with neon cyan highlights*
* *Cyberpunk-styled warning box*

**Script:**
"Here's the genius move: patience. BlockBlasters launched on Steam at the end of July as a completely legitimate-looking 2D platformer/shooter game. The developers – calling themselves 'Genesis Interactive' – had created what seemed like a typical indie game. For a whole month, not a single red flag—everyone's vibing. The game was completely clean, gathering positive reviews and building a small community.

The attackers were playing the long game; build up trust, then go for the knockout. It's the digital equivalent of a Trojan Horse – appear harmless, gain entry, and then strike when no one's expecting it. Like a boss battle you didn't see coming!"

**Speaker Notes:**
* *Emphasize the word "patience" – this wasn't a smash-and-grab attack*
* *Use the timeline to show how calculated this attack was*
* *The Trojan Horse analogy helps the audience understand the strategy*
* *Gaming references like "boss battle" connect with the audience*

---

### **Slide 5: The Betrayal and Mockery**

**Visuals:**
* *Placeholder for SteamDB showing the timeline of updates, highlighting Build 19799326*
* *Placeholder for SteamDB showing the final "hi.txt" update*
* *Cyberpunk-styled timeline with neon highlights*

**Script:**
"Fast-forward to August 30th – exactly one month after release. Devs drop a 'routine' update: Build 19799326. Hidden in this update was the StealC malware, ready to steal crypto wallets, browser data, and Steam credentials from anyone who launched the game.

But here's where it gets even more brazen. When security folks started catching on, the attackers did the funniest thing—they wiped the whole game, left behind a tiny text file: 'hi.txt'. Their way of flipping the bird at everyone, honestly. It took until September 21st for Steam to finally pull the game down. That's almost a month of active malware distribution on one of the world's largest gaming platforms!"

**Speaker Notes:**
* *Point directly to the build number on the slide – this is the "smoking gun"*
* *The 'hi.txt' detail shows the attackers' arrogance – use your tone to convey this*
* *Express appropriate outrage at the timeline – a month is an eternity in security terms*
* *Use more casual language like "flipping the bird" to keep the tone engaging*

---

### **Slide 6: The Impact & Response**

**Visuals:**
* *Doughnut chart showing types of data compromised*
* *Statistics with neon cyan highlighting*
* *Cyberpunk-styled data visualization*

**Script:**
"The fallout? Over $150,000 stolen from approximately 400 victims. But here's the crazy part—Raivo's story blew up, and the crypto community came together in an incredible way. His 'Help Me Beat Cancer' token surged 3,000% to a $2.5 million market cap. Crypto influencer Alex Becker personally donated $32,500 to cover Raivo's losses. His GoFundMe for cancer treatment saw an influx of donations.

When things get rough, it turns out the internet CAN have your back! But while this story had something of a happy ending for Raivo, most victims weren't so lucky. And the incident revealed just how vulnerable trusted platforms can be when it comes to protecting users from supply chain attacks."

**Speaker Notes:**
* *The statistics help quantify the scale of the attack*
* *The community response shows the positive side of the crypto community*
* *Use the chart to visually represent the types of data that were compromised*
* *Transition to the platform responsibility angle for the next slide*

---

### **Slide 7: Platform Responsibility: The Valve Vector**

**Visuals:**
* *Steam logo with a large question mark over it*
* *Timeline showing the malware's presence on Steam*
* *Cyberpunk-styled warning indicators*

**Script:**
"So, how did this fly on Steam?! A platform most of us trust daily! Turns out: first launch gets reviewed, updates after that? Practically no checks. The critical failure point was in how updates are vetted. While initial game submissions go through some level of review, updates to already-approved games receive minimal scrutiny.

Hackers just drop safe code, make friends, then swap in the malware. For nearly a month, this malicious code sat on Steam's servers, being downloaded by unsuspecting users. That's not just a small oversight – it's a fundamental security gap in how digital distribution platforms operate. Makes you wonder about your next 'routine' game update, right?"

**Speaker Notes:**
* *This is where you can show some righteous indignation on behalf of users*
* *Emphasize that this isn't just about one incident but a systemic issue*
* *The timeline visual helps drive home how long this went unaddressed*
* *The question at the end engages the audience personally*

---

### **Slide 8: A Pattern of Abuse**

**Visuals:**
* *Cyberpunk-styled game cards for "PirateFi," "Chemia," and "Sniper: Phantom's Resolution"*
* *Neon warning indicators*
* *Vertical city decoration in cyberpunk style*

**Script:**
"And this wasn't a one-and-done. Throughout 2025, we've seen other games on Steam being used as malware vectors. Games like PirateFi, Chemia, and Sniper: Phantom's Resolution – same playbook, same outcome. Attackers found a cheat code for exploiting platform trust.

This points to a pattern of abuse that's becoming more common. Attackers have figured out that gaming platforms have a security blind spot when it comes to updates, and they're exploiting it repeatedly. The trust that millions of gamers place in platforms like Steam is being weaponized against them."

**Speaker Notes:**
* *The pattern is important – it shows this isn't an isolated incident*
* *Use these examples to emphasize that this is an ongoing threat*
* *The "cheat code" gaming reference keeps the language relatable*
* *This sets up the technical deep dive that follows*

---

### **Slide 9: Technical Deep Dive: Inside StealC**

**Visuals:**
* *Flowchart showing the infection chain with neon cyberpunk styling*
* *Animated circuit patterns in the background*
* *Cyberpunk-styled code elements*

**Script:**
"Time to nerd out: StealC isn't some random script-kiddy job. It's crimeware for sale, with pro-level features. It's a sophisticated info-stealer that's sold as Malware-as-a-Service on Russian-speaking forums. Think of it as 'crime software' that anyone can buy access to.

When you run the game, it kicks off a VBScript dropper called `launch.vbs`. This script was surprisingly sophisticated – it checks for admin rights, checks your location and IP, finds out if it's being watched by antivirus—and if it feels safe, goes straight for your wallet or Steam account. This isn't amateur hour – this is professional-grade malware designed to adapt to its environment."

**Speaker Notes:**
* *Use the flowchart to guide the audience through the infection chain*
* *Explain the Malware-as-a-Service concept for those unfamiliar with it*
* *Highlight the sophistication – this helps explain why it was effective*
* *The technical details establish your credibility on the subject*

---

### **Slide 10: Theft, Exfiltration, and Targeting**

**Visuals:**
* *Cyberpunk-styled data theft visualization*
* *Code snippet showing the parsing of `loginusers.vdf`*
* *Neural interface decoration in cyberpunk style*

**Script:**
"StealC's primary goal is theft, and it's very good at what it does. When you run the game, it targets browser data like cookies and saved passwords, but it's especially interested in cryptocurrency wallets. In the BlockBlasters variant, it specifically went after Steam's `loginusers.vdf` file – that's where your Steam credentials are stored, especially if you have 'Remember Password' enabled.

What's particularly devious is that the attackers maintained a file called `whitelisted_users.txt` on their command and control server. This contained a list of high-value targets who would receive special, more aggressive payloads. RastalandTV was likely on this list because of his crypto holdings. This wasn't just mass harvesting – there was targeted hunting going on as well."

**Speaker Notes:**
* *The code snippet adds technical credibility to your presentation*
* *The concept of a "whitelist" for targets shows the sophisticated, targeted nature of the attack*
* *Connect back to RastalandTV's story to maintain the human element*
* *Use technical terms but explain them in accessible ways*

---

### **Slide 11: Detection & Response**

**Visuals:**
* *Cyberpunk-styled IOC boxes with neon highlights*
* *YARA rule example with syntax highlighting*
* *Data strand decorations in cyberpunk style*

**Script:**
"How do you spot this? For security professionals, we have some concrete indicators of compromise from the vx-underground report. The command and control server was at this IP address, and we have file hashes for the malicious components.

We can also write YARA rules – think of these as search patterns for malware – to detect StealC variants. For organizations, detection comes down to monitoring your network for traffic to known bad IPs and watching for suspicious process chains – like when a game suddenly starts launching scripts that access your browser's password database.

The security community's response to this incident was actually pretty impressive. Researchers like ZachXBT and the team at vx-underground collaborated to analyze the malware, track the attackers, and even take down their command and control infrastructure."

**Speaker Notes:**
* *Explain YARA in simple terms for those unfamiliar with it*
* *Highlight the collaborative security response as a positive aspect of the story*
* *This section bridges the technical details to the lessons learned*
* *The cyberpunk aesthetic reinforces the "digital detective" nature of this work*

---

### **Slide 12: Lessons Learned**

**Visuals:**
* *Three cyberpunk-styled columns for different stakeholders*
* *Neon highlighting for key points*
* *Table of contents decoration in cyberpunk style*

**Script:**
"This incident taught us a lot. For the security community, it showed how powerful collaborative, open-source intelligence can be. Researchers from different backgrounds came together, shared information, and were able to track and disrupt the attackers' operations.

For the attackers, it showed that bad operational security gets you caught. They left Telegram bot tokens exposed and had vulnerabilities in their command and control server that researchers exploited against them.

And for platforms like Steam, the lesson is crystal clear: you absolutely need continuous security vetting for updates, not just initial submissions. The trust users place in these platforms means they have a responsibility to protect against these kinds of supply chain attacks."

**Speaker Notes:**
* *This slide shows you've thought deeply about the implications beyond just the technical details*
* *Emphasize the collaborative nature of the security community's response*
* *The platform responsibility point can be delivered with some emphasis – this is a key takeaway*
* *The three-column approach makes the lessons clear and distinct*

---

### **Slide 13: The Rogues' Gallery: StealC vs. Others**

**Visuals:**
* *Cyberpunk-styled comparison table with neon borders*
* *Data visualization elements*
* *Data strand decorations in cyberpunk style*

**Script:**
"StealC isn't alone in this space. It's part of a growing ecosystem of information stealers. When we compare it to other major players like Vidar, Raccoon, and RedLine, we see a lot of similarities in their methods. They're all sold as a service, they all target similar data, and they all use similar distribution techniques.

What makes StealC stand out is its technical sophistication. The latest version uses RC4 encryption for its command and control communications, which makes network traffic analysis much harder for security tools. Unlike earlier stealers that used simple HTTP requests, StealC structures its data as JSON objects over HTTP, making its traffic look like legitimate web API calls to evade detection. Most impressively, it uses Themida packing—a commercial-grade protector typically used by legitimate software companies—to obfuscate its code and prevent reverse engineering.

These aren't amateur additions; they're professional anti-analysis techniques that show how the Malware-as-a-Service industry is rapidly evolving. Each new iteration incorporates lessons learned from security researchers' discoveries. It's an arms race, with criminal developers investing significant resources to stay ahead of detection methods. 

Understanding this broader landscape helps us see that this isn't just about one malware family – it's about an entire criminal industry that's constantly innovating and professionalizing."

**Speaker Notes:**
* *Don't read the whole table – just highlight key differences and similarities*
* *This context helps the audience understand the broader threat landscape*
* *Keep this section brief – it's just providing context*
* *The cyberpunk styling of the table makes technical data more visually engaging*

---

### **Slide 14: Protecting Yourself: For Gamers**

**Visuals:**
* *Cyberpunk-styled protection items with neon icons*
* *Hover effects on protection recommendations*
* *Cybernetic enhancement decoration in cyberpunk style*

**Script:**
"What should you *personally* do? If you're a gamer, there are some practical steps you can take. Be skeptical, even of trusted game platforms. Be wary of updates, especially if an update seems unexpected or a game suddenly needs new permissions, that's a red flag.

Never download pirated games – they're a common malware vector. Use a standard user account for gaming, not an admin account – this limits what malware can do even if you get infected. Keep everything patched and updated – your OS, your browser, your drivers – because those patches often fix security holes that malware exploits.

Remember, even legitimate-looking games from trusted platforms can be compromised. Trust, but verify. If something feels off, do double-takes, ask questions, check those updates."

**Speaker Notes:**
* *Deliver this as practical advice that people can implement right away*
* *These are actionable steps that don't require technical expertise*
* *The reminder about trusted platforms reinforces the main lesson of the presentation*
* *The cyberpunk aesthetic reinforces the "digital armor" concept of these protections*

---

### **Slide 15: Protecting Yourself: For Crypto Users**

**Visuals:**
* *Cyberpunk-styled hardware wallet visualization*
* *Protection recommendations with neon highlights*
* *Neural interface decoration in cyberpunk style*

**Script:**
"For those of you involved with cryptocurrency, the stakes are even higher. The single most important thing you can do is use a hardware wallet. These physical devices keep your private keys completely offline, which means they're immune to malware like StealC. Even if your computer is completely compromised, your crypto remains safe.

Beyond that, be paranoid about phishing attempts, enable Two-Factor Authentication on every exchange and service you use, and if possible, use a dedicated device just for crypto transactions. And always, always do your own research before investing in any project.

These steps might seem excessive, but as RastalandTV's story shows, the consequences of a security breach can be devastating – especially when your financial future or, in his case, medical treatment is on the line."

**Speaker Notes:**
* *Hold up the hardware wallet image as a visual aid if possible*
* *Speak with conviction here – these aren't optional best practices*
* *Connecting back to RastalandTV's story brings the presentation full circle*
* *The cyberpunk aesthetic reinforces the high-tech nature of crypto security*

---

### **Slide 16: Conclusion & Q&A**

**Visuals:**
* *Cyberpunk-styled key takeaways*
* *Contact information with neon styling*
* *Circuit line decorations in cyberpunk style*

**Script:**
"If you learned one thing tonight: trust is a vulnerability. The BlockBlasters incident teaches us three critical lessons: First, gaming platforms are increasingly being weaponized for cybercrime. Second, supply chain security – especially for software updates – is more important than ever. And third, a security-first mindset is our best defense against these evolving threats.

We gotta question things, be 'that person' who's always verifying, because that's how you stay safe. Remember, trust is a vulnerability when it's exploited by bad actors. Always verify, always question, and always protect yourself – even on platforms you think you can trust.

Thanks for chilling with me! Open floor: AMA—malware, crypto theft, scary game updates, whatever. Let's talk!"

**Speaker Notes:**
* *End with energy and confidence*
* *Have some anticipated questions ready in case the audience is shy*
* *Be prepared for technical questions about the malware or broader questions about platform responsibility*
* *The cyberpunk aesthetic concludes the presentation with a consistent visual theme*
