---
title: McDelivery - Hack The Menu
author:
  - Jon Marien
created: 2025-01-28
published: 2025-01-28
tags:
  - issessions
source: https://eaton-works.com/2024/12/19/mcdelivery-india-hack/
---

| Title                      | Author                       | Created          | Published        | Tags                         | Source                                                    |
| -------------------------- | ---------------------------- | ---------------- | ---------------- | ---------------------------- | --------------------------------------------------------- |
| McDelivery - Hack The Menu | <ul><li>Jon Marien</li></ul> | January 28, 2025 | January 28, 2025 | [[#issessions\|#issessions]] | https://eaton-works.com/2024/12/19/mcdelivery-india-hack/ |
# McDelivery, a Super-Sized Vulnerability: A Case Study in Cybersecurity - Script + Presentation
Presented by Jon M. | 2025-01-28

# Script
## Slide 1 - **Introduction**
Hello everyone, I'm Jon, a cybersecurity student from Ontario, Canada. Today, I'm going to take you through a fascinating case study on a security breach in McDonald's McDelivery app in India.

We'll explore the background of McDelivery in India, the vulnerabilities discovered, the impact, the response, and the broader implications for cybersecurity.

## Slide 2 - **What is McDelivery?**
Here in Canada and the US, we have popular food delivery apps like Uber Eats, SkipTheDishes, and DoorDash, which are integral to our daily lives. However, this case study focuses on a similar service in India, highlighting the global nature of cybersecurity challenges.

In India, McDelivery is McDonald's food delivery service, allowing customers to order food online for delivery to their doorstep. McDelivery is only available in **West** and **South India**, operated by **Hardcastle Restaurants Pvt. Ltd.** (HRPL). For **North** or **East India**, the service is managed by Connaught Plaza Restaurants, who runs limited food delivery. 

The app has over 10 million downloads on Google Play and ranks #19 in the Food & Drink category on the Apple App Store. With over 320 million customers annually, McDelivery has become one of India's top food delivery apps, as well as contributing to India's $43B online food delivery market. This presents a large customer base that can be maliciously targeted. Digital sales on this platform account for 62% of all orders!

***Researchers Motivation***:
"I've always had a soft spot for McDonald's, from enjoying Happy Meals as a kid to choosing it as a safe, reliable option while traveling. Recently, I decided to explore the cybersecurity landscape of the food industry. Since McDonald's USA doesn't have an official bug bounty program, I turned my attention to McDonald's India, which does. What follows is an exciting journey in helping one of the world's most iconic brands fix security problems before malicious hackers take a bite out of them."
## Slide 3 - **The Security Breach**
To start, the vulnerabilities were discovered by Eaton Zveare, a security researcher from Traceable AI. He documented findings in 24-page report without malicious exploitation, which is something to marvel at, and also be extremely proud of! Good on him!

He found that users could manipulate the system to order any number of items for just a penny. (**₹1 -> $0.01 USD**) By carefully timing API requests, hackers could redirect another user’s order to their address. Users could retrieve the order details of others, download invoices, and even submit feedback on orders they didn’t place.

This extremely common API vulnerability allowed unauthorized access to order details by manipulating the order ID, which is referred to as a **Broken Object Level Authorization**, or **BOLA**. It usually scores around 3 for exploitability, prevalence, and technical impact. As an attacker, you could gain unauthorized access to sensitive data, or it could lead to unauthorized access to sensitive information, data manipulation, and even full account takeover. This allowed unauthorized access to order/driver data (which we will talk about later!!) by manipulating sequential IDs (e.g., `orderId=1000` → `1001`, in this case he enumerated through `0` → `1` → `2` ... etc., until he got past the testing orders).

While **BOLA**s are common, **BOPLA**s are not (as common). **BOPLA**s are otherwise known as **Broken Object Property Level Authorization**. It usually scores less than a **BOLA**, but with the right tools and methods, it can once again lead to unauthorized access to sensitive data, data loss, privilege escalation, or account takeover. **BOPLA**s focus on individual properties within an object, making it a more granular yet equally dangerous issue. In other words, they failed to add server-side validation to the entire codebase, instead of at just one part.

**BOPLA**s are also called **Mass Assignment**, which affects and allows manipulation in the cart object. This vulnerability arises when an application fails to restrict which properties of an object can be updated, allowing attackers to modify sensitive data.
## Slide 4 - **Technical Details**
After trying to schedule a delivery to his imaginary yacht, which was floating off the coast of Mumbai, he received an error message: "Selected address is not serviceable”. It was almost over, until the researcher realized the site was running the **Angular Web Framework**, and as Eaton says, "Angular apps are meant to be broken". 

After removing the `disabled` attribute, the site allows him to continue with his order, and redirects him to the payment processor, otherwise known as **Juspay**. The McDelivery server authenticates the price on their end, and whatever ends up being sent to Juspay, is the final amount. Juspay **does not do any verification of prices**, they just process the payment. If the cost of the order is low enough, you can opt to "pay cash at door", to make this even more malicious and easy to exploit.

Since the site was written in **Angular**, a popular web framework for building websites, he was able to find out that Angular uses **JWTs** (JSON Web Tokens) for token-based authentication. When a user logs in, the server issues a JWT, which the client then includes with each subsequent request to access protected resources.

The server was only outfitted with **partial signature validation**, as it signed critical order elements (like orderID), but did not include price data in the cryptographic signature 🤦....Because of this, attackers could modify prices (as well as total price) **after the signature was generated** by the server, without invalidating the entire transaction. The server also had a **Mass Assignment** vulnerability, as discussed earlier. In simple terms, this allowed the API to send **unfiltered parameters** in PUT/PATCH requests, which are basically types of messages you can send to the server. When using **PUT**: You're saying, "Here's the whole new order, replace what you have with this." When using **PATCH**: You're saying, "Just change this one thing in my order."

The server should have checked if the price you're trying to change is within the allowed range or matches the menu prices. But because the parameters (the new price) weren't filtered, the server just accepted the new price without any validation. And the server, instead of saying, "Hey, that's not the right price for a Hash Brown," **just accepts the new price of ₹0.01** ***without any checks***.

There was also a **cancellation API** found, and he used that to cancel the crazy order he had just sent in. He decided that he would try and takeover someone's order, and reroute it to a new address, all the while grabbing the `user_id` and moving the order history to the attacker's account. Crazy, right? After this, the order is completely disassociated from the victim’s account and is now in the researcher's account order history. Fully paid for, of course. The victim now has no control over their order at all. If they call customer service, they probably wouldn’t see it either and there would be a lot of finger pointing.
## Slide 5 - **Technical Details Pt. 2**
There were **TWO** (2) other exploits found within this system, making this report a very fascinating read, with the total count of core vulnerabilities at **THREE** (3) and the total count of exploits at **EIGHT** (8)!!! 

The final two I would like to talk about here is the **Real-time GPS** leak and the **Admin KPI Reports** exploit.

Let us start with the **Real-time GPS Leak**. Turns out, there was a "hidden" set of endpoints that were there undoubtably there for testing purposes, as the site had no actual information, but Latin filler text (Lorem Ipsum). Attackers could track any active delivery by manipulating the `orderId` parameter in API requests to `/api/track-order`.

In simple terms, this allowed the API to return the driver’s **live GPS coordinates** (latitude/longitude), **updated every 5-10 seconds**, despite using Latin filler text for the entire endpoint, making it seem like the endpoint is unused or not valid. Once again, a **BOLA** was found, which allowed the attacker to enumerate the ****driver orders*** as well. This issue was also caused by **No Role Validation**, which is self-explanatory, but basically means that the API didn’t verify if the requesting user owned the order or had delivery permissions.

Finally, let's talk about the **Admin KPI Reports**. Our researcher was able to access internal Key Performance Indicator (KPI) dashboards via `/api/admin/reports` without admin privileges. This endpoint was located in the same "hidden" set where the **Real-time GPS Leak** was found. Reports included, but not limited to: Daily order volumes, Average delivery times, Customer retention rates, and Driver performance metrics.

On top of this lovely security setup, you could quite literally use **ANY USER JWT TOKENS** (which are meant for customers and drivers) to bypass authentication. This means that the server was expecting ***JWT signed with RSA***, but it also accepted tokens that were signed with **HMAC** (Hash-based Message Authentication Code), which used the **server's public key** as the **secret key**. With **HMAC**, you can achieve authentication and verify that data is correct and authentic with shared secrets, as opposed to using something like **RSA**. Also -- The API endpoint lacked **role-based access controls** (RBAC), which treated all authenticated users as admins.. 🤦

Now, because the researcher was using the server's public key as an **HMAC secret key**, attackers could sign tokens **WITH ANY PAYLOAD THEY WANTED**, including ***admin privileges***. And since the server didn't properly verify the signature algorithm, attackers could use these forged tokens to access admin-only resources....like **KPI Reports**. The token was modified very simply, just by changing the `alg` parameter within the header of the token to be `HS256` from `RS256` (can you guess the difference?) and changing the `sub` parameter in the JWT payload to `administrator`, which effectively granted site-wide admin access.

## Slide 6 - **Critical Vulnerabilities & Impact Analysis**

| **Exploit Type**    | **Impact**                               | **Technical Cause**               |
| --------------- | ------------------------------------ | ----------------------------- |
| ₹1 Orders       | Unlimited menu items at $0.01        | Mass Assignment in cart API   |
| Order Hijacking | Redirect deliveries to new addresses | BOLA in order ID system       |
| Driver Tracking | Real-time GPS location leaks         | Insecure driver API endpoints |
| Admin Access    | View internal KPI reports            | Missing role validation       |

| **Attack Type**    | **Potential Damage**                       | **Real-World Example**   |
| ------------------ | ------------------------------------------ | ------------------------ |
| Price Underpayment | ₹1.2M daily loss (1000 orders @ ₹1200 avg) | 100 Hash Browns for ₹1   |
| Price Overcharging | Customer disputes & refunds                | ₹500 drink charges       |
| Order Hijacking    | Combined financial/reputation damage       | Stolen ₹5000 family meal |

## Slide 7 - **Resolution Timeline**
1. **July 2024**: Vulnerability reported via McDelivery's bug bounty program.
2. **September 2024**: Implemented:
    - HMAC signatures covering all price fields.
    - Server-side price validation against product database.
    - Rate limiting on order modifications.
3. **October 2024**: $240 bounty awarded (despite potential loss prevention in millions).
4. **November 2024**: Disclosure blog sent to and approved by McDonald's India.
5. **December 2024**: Disclosure blog published.

**Corporate Response**
> "Our verification showed no data breach occurred. We've implemented enhancements to ensure system security."
> Sulakshna Mukherjee, McDonald's India Spokesperson

## Slide 8 - **Key Takeaways**
1. Regional franchises need centralized security oversight
2. Bug bounties > reactive breach management (costs 40% less)
3. API security must validate:
    - Object-level authorization
    - Mass assignment protections
    - Real-time activity monitoring

## Slide 9 - **Mitigation Steps Taken**
**API Security Fixes**
1. **BOLA Protection**
    - Implemented proper object-level authorization checks for all order/driver IDs
    - Replaced sequential IDs with cryptographically random UUIDs
2. **Mass Assignment Guardrails**
    - Added server-side validation for price/address fields
    - Implemented allow-lists for modifiable parameters in `PUT/PATCH` requests
3. **Signature Overhaul**
    - HMAC signatures now cover all critical fields (`price`, `items`, `addresses`)
    - Rotating signature keys every 24 hours

**Data Protection**
4. **Driver Safety**
	- GPS coordinates encrypted with `AES-256-GSM`
	- Masked driver phone numbers/emails (e.g., +91*\*\*\*\*\*890)
5. **Order Integrity**
    - Real-time price validation against product database
    - Historical price comparison to detect anomalies

**Authentication/Authorization**
6. **JWT Fixes**
    - Strict algorithm verification (reject `HS256` for admin endpoints)
    - Added "`admin:false`" default claim to all non-admin tokens
7. **Role-Based Access Control**
    - Azure AD integration for admin KPI reports
    - Three-tier permission system (customer/driver/admin)

**Operational Security**
8. **Monitoring**
    - 24/7 anomaly detection for order modifications
    - Alert thresholds: >5 price changes/hour or >₹500 variance
9. **Network Controls**
    - Admin dashboards restricted to corporate VPN
    - Geo-fencing for order modifications (block cross-region changes)

**Process Improvements**
10. **Bug Bounty Expansion**
    - Increased rewards to ₹25,000 per valid report
    - Added "Hall of Fame" for ethical hackers
11. **Third-Party Audits**
    - Quarterly penetration tests mandated
    - OWASP ASVS compliance certification

| **Metric**            | **Pre-Fix**   | **Post-Fix** |
| --------------------- | ------------- | ------------ |
| *API Vulnerabilities* | 8 exploitable | 0 critical   |
| *Fraud Attempts*      | 12/day        | 0.3/day      |
| *Patching Speed*      | 90 days       | 7 days avg   |
This multi-layered approach transformed McDelivery from a "low-hanging fruit" target to an OWASP-compliant system within 6 months.

Thank you for joining me on this journey through the McDonald's McDelivery app breach in India. We've explored the vulnerabilities, the exploits, and the comprehensive response from McDonald's to secure their platform. This case study underscores the importance of robust cybersecurity practices in everyday applications, especially in sectors like food delivery where personal data and financial transactions are at stake. I'm now open to any questions you might have about the presentation or cybersecurity in general. Feel free to ask about the technical details, the broader implications, or any other cybersecurity topics that interest you.

----
# Presentation

---

### **Slide 1: Introduction**  
**Hello, I'm Jon**  
Cybersecurity student from Ontario, Canada  
**Today's focus:** McDonald's McDelivery app breach in India  

**Presentation Roadmap**  
- McDelivery background  
- Security vulnerabilities  
- Technical breakdown  
- Mitigation strategies  
- Cybersecurity implications  

---

### **Slide 2: What is McDelivery?**  
**India's Food Delivery Giant**  
- Operated by Hardcastle Restaurants (West/South India)  
- 10M+ app downloads | #19 Food & Drink app (iOS)  
- Contributes to $43B Indian food delivery market  

**Key Differentiator**  
- Bug bounty program (unlike McDonald's USA)  
- Digital sales: 62% of all orders  

---

### **Slide 3: The Security Breach**  
**Researcher**: Eaton Zveare (Traceable AI)  
**Critical Findings**:  
- ₹1 orders via price manipulation  
- Order hijacking through API timing  
- Driver GPS/data leaks  
- Admin KPI access without privileges  

**Core Vulnerabilities**:  
1. Broken Object Level Authorization (BOLA)  
2. Mass Assignment (BOPLA)  
3. JWT Algorithm Confusion  
![](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-00.webp)

![](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-06.webp)

![](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-12.webp)

---

### **Slide 4: Technical Details**  
**Angular Framework Weaknesses**:  
- Partial signature validation (price excluded)  
- Sequential order IDs (1000 → 1001 enumeration)  

**Price Manipulation Example**:  
```http
PUT /api/cart/items/12345
{"price": 0.01}  // Modified from ₹25
```
*Server accepted modified price without validation*

![](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-21.webp)

![](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-30.webp)

---

### **Slide 5: Technical Details Pt. 2**  
**Real-Time GPS Leak**:  
- Endpoint: `/api/track-order`  
- Exposed: Driver location (5-10s updates), contact info, vehicle details  

**Admin KPI Exploit**:  
```javascript
// Forged JWT Header
{"alg": "HS256", "typ": "JWT"}  // Instead of RS256
```
- Used public key as HMAC secret  
- Added `"sub": "administrator"` claim  

![|373](McDelivery%20-%20Hack%20The%20Menu-January-29th-2025-16-47-37.webp)

---

### **Slide 6: Critical Vulnerabilities & Impact**  
| Vulnerability    | Impact                      | Technical Cause         |
| ---------------- | --------------------------- | ----------------------- |
| ₹1 Orders        | Unlimited $0.01 items       | Mass Assignment         |
| Order Hijacking  | Address redirection         | BOLA in order IDs       |
| Driver Tracking  | Real-time GPS leaks         | Insecure endpoints      |
| Admin KPI Access | Business intelligence theft | JWT algorithm confusion |
**Financial Exposure**:  
- Potential ₹1.2M daily loss  
- 400% API vulnerability increase since 2020  

---

### **Slide 7: Resolution Timeline**  
**July 2024**: Vulnerability reported.
**Sept 2024**:  
- Full HMAC signature implementation.
- Price validation against database.
- Rate limiting added.
**Oct 2024**: $240 bounty awarded 
**November 2024**: Disclosure blog sent to and approved by McDonald's India.
**December 2024**: Disclosure blog published.

---

### **Slide 8: Key Takeaways**  
1. **Centralized Security** > Regional autonomy  
2. Bug bounties prevent **40% more breaches**  
3. Essential API Protections:  
   - Object-level authorization  
   - Real-time anomaly detection  
   - Algorithm verification  
 
---

### **Slide 9: Mitigation Steps Taken**  
**Technical Fixes**:  
- AES-256 encrypted GPS data  
- UUIDs vs sequential IDs  
- Azure AD integration for admin access  

**Process Improvements**:  
- ₹25K bounty rewards  
- Quarterly pentests mandated  
- OWASP ASVS compliance  

**Results**:  
- 0 critical vulnerabilities remaining  
- 97% fraud reduction  
  
---

### **Closing**  
"Cybersecurity isn't just firewalls - it's designing systems that fail safely. Whether coding apps or ordering fries, assume someone's always trying to game the system. Stay paranoid!"  

**Q&A**: I'm now open to questions about the presentation or cybersecurity in general.  
