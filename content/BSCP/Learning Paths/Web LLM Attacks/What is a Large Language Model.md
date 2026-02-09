---
title: What is a Large Language Model -- (LLM)
author: Jon Marien
created: 2026-01-14
published: 2026-01-14
tags:
  - bscp
---

| Author     | Created          | Published        |
| ---------- | ---------------- | ---------------- |
| Jon Marien | January 14, 2026 | January 14, 2026 |

# Definition
A **large language model (LLM)** is a type of artificial intelligence algorithm that uses deep learning and massive data sets to understand, summarize, generate, and predict content. These models are trained on vast amounts of semi-public data, enabling them to recognize intricate patterns and relationships within human language.

## Core Idea
- LLMs are built on **transformer architectures**, which are neural networks that use self-attention mechanisms to weigh the importance of different words in a sequence, regardless of their distance from each other.
- They typically consist of billions to trillions of **parameters**, which are variables that define the model's predictive power and its ability to generalize across various natural language processing tasks.
- Users interact with these models through a chat interface by providing a **prompt**, which the model uses to generate a plausible sequence of words as a response.

### Why It’s Important / Impact
- LLMs represent a significant shift in technology due to their ability to **generalize across tasks** with minimal specific supervision, replacing the need for bespoke systems for every individual application.
- They enable a wide range of modern website functionalities, including:
    - **Conversational Agents:** Customer service virtual assistants and chatbots.
    - **Content Processing:** Translation, summarization, and sentiment analysis of user-generated content.
    - **Productivity:** Code generation, SEO improvement, and automated reasoning.
- However, they also inherit the **inaccuracies and biases** present in their massive training datasets, which can impact the quality and safety of their outputs.

#### Protect Against It
- Implement robust **input validation** and filtering rules on the prompt interface to prevent malicious instructions or injection attacks.
- Use **fine-tuning** and specific guardrails to align the model’s behavior with safety policies and to reduce the likelihood of generating biased or incorrect information.
- Employ **human-in-the-loop** systems to verify critical outputs, especially in high-stakes environments like customer service or data analysis.

---
# LLM attacks and prompt injection
Many web LLM attacks rely on a technique known as prompt injection. This is where an attacker uses crafted prompts to manipulate an LLM's output. Prompt injection can result in the AI taking actions that fall outside of its intended purpose, such as making incorrect calls to sensitive APIs or returning content that does not correspond to its guidelines

---
# Detecting LLM vulnerabilities
PortSwigger's recommended methodology for detecting LLM vulnerabilities is:

1. Identify the LLM's inputs, including both direct (such as a prompt) and indirect (such as training data) inputs.
2. Work out what data and APIs the LLM has access to.
3. Probe this new attack surface for vulnerabilities.

---
