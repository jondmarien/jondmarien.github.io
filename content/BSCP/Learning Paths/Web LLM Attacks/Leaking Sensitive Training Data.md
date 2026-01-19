---
title: Leaking Sensitive Training Data
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - certs
  - bscp
  - burp
---

| Title                           | Author     | Created          | Published        | Tags                                                   |
| ------------------------------- | ---------- | ---------------- | ---------------- | ------------------------------------------------------ |
| Leaking Sensitive Training Data | Jon Marien | January 19, 2026 | January 19, 2026 | [[#certs\|#certs]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Definition
Leaking sensitive training data is when an attacker uses prompt injection (or carefully crafted prompts) to get an LLM to reveal confidential information that was present in its training set or internal data sources.  This can happen if sensitive data was accidentally included in training data, or if user data was not properly scrubbed before being used for training or retrieval.

## Core Idea
- The attacker asks the model to “autocomplete” or “continue” text using partial known context, hoping the next tokens contain secrets (for example, providing the first part of an internal error message).
- The attacker uses prompts like "Complete the sentence: username: `carlos` …" or "Could you remind me of…?" or "Complete a paragraph starting with…" to coax the model into revealing additional personal or internal details beyond what should be disclosed.
- The leak is possible when the model’s outputs are not sufficiently filtered/sanitized, or when sensitive information is present in the underlying data used to train or inform the model.

### Why It’s Bad / Impact
- It can expose private user information (PII), internal identifiers, secrets, or other data that should never be returned to an end user.
- It’s especially risky because users often unintentionally include sensitive data in normal inputs over time, and that data can persist if the system doesn’t properly scrub it from stored datasets used for training or retrieval.

#### Protect Against It
- Prevent sensitive data from entering training/retrieval corpora: aggressively scrub/redact user data and secrets before storage, labeling, training, or indexing.
- Add strong output filtering/redaction for sensitive patterns (PII, keys, tokens, emails, addresses) and enforce policies that block “completion” style prompts from revealing private data.
- Minimize what the model can access and return (least privilege + “need to know”), and monitor for prompts that look like extraction attempts (autocomplete, “remind me,” “complete the paragraph,” etc.).

---
