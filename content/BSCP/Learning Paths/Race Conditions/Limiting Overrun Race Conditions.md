---
title: Limiting Overrun Race Conditions
author: Jon Marien
created: 2026-02-17
published: 2026-02-17
tags:
  - bscp
---

| Author     | Published         |
| ---------- | ----------------- |
| Jon Marien | February 17, 2026 |

***
# **What it is**
A limit overrun race condition happens when an attacker sends multiple requests simultaneously to exploit the brief window between when a limit is **checked** and when it is **enforced**. The classic example is reusing a one-time discount code more than once.

## **Core Idea**
The application processes a discount code in three steps: check if it's been used → apply the discount → mark it as used. Normally, sequential requests are handled fine — the second request sees `code_already_used = true` and gets rejected. ![](../../../../Resources/Limiting%20Overrun%20Race%20Conditions-1771366026072.webp)

The problem? If two requests arrive at almost exactly the same time, both can pass the initial check simultaneously while the flag is still `false`. Both see the "race window" where the code hasn't been marked as used yet, so both apply the discount before either has a chance to update the database. This is a **TOCTOU flaw — Time of Check to Time of Use**. ![](../../../../Resources/Limiting%20Overrun%20Race%20Conditions-1771366034364.webp)

The app briefly enters a **temporary sub-state**: the window between when it starts processing request 1 and when it finishes updating the database. That tiny window is all an attacker needs.

### **Real-World Variations**
- Redeeming a gift card multiple times
- Rating a product multiple times
- Withdrawing or transferring funds beyond your actual account balance
- Reusing a single CAPTCHA solution across multiple attempts
- Bypassing anti-brute-force rate limits by flooding simultaneous login attempts

#### **Why it's Bad / Impact**
- Direct financial loss — discounts, gift cards, and transfers can be abused for real monetary gain
- Breaks business logic integrity entirely without any traditional exploit payload
- Hard to catch in testing because it requires precise timing and concurrent requests
- Can be scaled up — the more simultaneous requests, the more times the discount/action is applied

##### **Protect Against It**
- Use **atomic database operations** or transactions that check and update in a single, indivisible step
- Implement **database-level locking** so only one request can process a code at a time
- Use **mutexes or semaphores** server-side to serialize sensitive operations
- Apply **idempotency keys** — unique tokens per action that the server rejects if seen more than once
- Rate-limit and monitor for suspiciously concurrent requests from the same user/session

***
