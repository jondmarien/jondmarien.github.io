---
title: Defending Against LLM Attacks
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - certs
  - bscp
  - burp
---

| Title                         | Author     | Created          | Published        | Tags                                                   |
| ----------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| Defending Against LLM Attacks | Jon Marien | January 19, 2026 | January 19, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Definition
Any API an LLM can call should be treated as effectively **publicly accessible**, because users (and attackers) can reach those capabilities indirectly through prompts and tool/function calls.

## Core Idea
- If the LLM can call an API, then a user can often "drive" those calls by wording prompts that cause the LLM to invoke the API.
- Security must be enforced by the API-owning service itself (`authn`/`authz` on the endpoint), not by assuming the LLM will "self-police" what it should or shouldn’t call.

### Why It’s Bad / Impact
- If an internal API lacks authentication or proper authorization checks, an attacker can use the LLM as a proxy to access it.
- This risk is amplified by indirect prompt injection, where untrusted content can manipulate the LLM into making privileged API calls the user didn’t intend.

### Protect Against It
- Require authentication for every API call and enforce authorization server-side (roles/scopes/object-level checks) in the services the LLM talks to.
- Design with least privilege: give the LLM narrowly scoped credentials and limit which actions/tools are available in the first place, reducing blast radius if it’s manipulated.
- Don’t rely on the model to enforce permissions; treat the model as untrusted and enforce access control at the boundary (the API).

---

## Don’t Feed LLMs Sensitive Data

This section is about treating an LLM as potentially leaky: anything you give it might later be exposed.

LLMs can surface patterns learned from their data, so you should assume that **any data you send to or train into a model could potentially be revealed back to some user later**, especially when fine-tuning is involved or when retrieval over your data is available.

### Core Idea

- **Sanitize training data:** Strip or redact secrets, PII, and other sensitive content before it ever becomes part of the model’s training or fine-tuning set.  
- **Use “lowest-privileged data”:** Only feed the model data that your lowest-privileged user is allowed to see; if it’s too sensitive for them, it’s too sensitive to hand to the model.  
- **Control external sources:** Limit which external data stores the model can query, and enforce strong access controls and auditing across that whole data pipeline.  
- **Continuously test exposure:** Regularly probe the model with targeted prompts to see whether it “remembers” or leaks sensitive information, and treat any leak as a data incident.

### Protect Against It

- Redact PII, secrets, and internal identifiers before storage or training.  
- Scope training/fine-tuning sets to non-sensitive, broadly shareable data.  
- Lock down connectors (DBs, file stores, APIs) and apply least privilege plus logging.  
- Periodically run internal “red team” prompts to check whether sensitive data can be elicited.

Protection depends on the specific vulnerability type, but the core idea is always the same: **remove unnecessary assumptions of trust** and add layered controls (validation, rate limiting, least privilege, monitoring) so a single mistake does not lead to full compromise.

---
## Don’t Feed LLMs Sensitive Data
LLMs can surface patterns learned from their data, so you should assume that **any data you send to or train into a model could potentially be revealed back to some user later**, especially when fine-tuning is involved or when retrieval over your data is available.

### Core Idea
- **Sanitize training data:** Strip or redact secrets, PII, and other sensitive content before it ever becomes part of the model’s training or fine-tuning set.  
- **Use “lowest-privileged data”:** Only feed the model data that your lowest-privileged user is allowed to see; if it’s too sensitive for them, it’s too sensitive to hand to the model.  
- **Control external sources:** Limit which external data stores the model can query, and enforce strong access controls and auditing across that whole data pipeline.  
- **Continuously test exposure:** Regularly probe the model with targeted prompts to see whether it “remembers” or leaks sensitive information, and treat any leak as a data incident.

#### Protect Against It
- Redact PII, secrets, and internal identifiers before storage or training.  
- Scope training/fine-tuning sets to non-sensitive, broadly shareable data.  
- Lock down connectors (DBs, file stores, APIs) and apply least privilege plus logging.  
- Periodically run internal “red team” prompts to check whether sensitive data can be elicited.

---
# Don't Rely on Prompting to Block Attacks
“Don’t rely on prompting” is basically: **LLMs don’t enforce security policy; they follow text, and text is easy to override.**

You can tell an LLM things like “don’t use these APIs” or “ignore any payloads,” but those are just natural-language instructions mixed into the prompt. They are *not* hard technical controls, and the model can be persuaded to ignore them.

## Core Idea
Attackers can send **jailbreaker prompts** like “disregard all previous instructions and…” or wrap malicious requests in roleplay, multi-step reasoning, or indirection so the model ends up doing the very thing you told it not to do.

### Why It’s Bad / Impact
If you treat prompt text as your “security layer,” a clever prompt can bypass it, leading the LLM to call sensitive tools, leak data, or generate dangerous output despite your “don’t do X” instructions.

#### Protect Against It
Enforce real controls outside the model:  
- Restrict which tools/APIs are even available.  
- Validate and gatekeep arguments server-side.  
- Add explicit allow/deny logic and human approvals for risky actions.

---
