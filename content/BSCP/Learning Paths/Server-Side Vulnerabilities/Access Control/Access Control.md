---
title: Access Control
author: Jon Marien
created: 2025-12-18
published: 2025-12-18
tags:
  - certifications
  - bscp
  - burp
---

| Title          | Author     | Created           | Published         | Tags                                                                     |
| -------------- | ---------- | ----------------- | ----------------- | ------------------------------------------------------------------------ |
| Access Control | Jon Marien | December 18, 2025 | December 18, 2025 | [[#certifications\|#certifications]], [[#bscp\|#bscp]], [[#burp\|#burp]] |

# Access Control

## Definition
Access control is the constraints on an application on who or what is authorized to perform actions or access resources. In the context of web apps, access control is dependent on the authentication and session management:
- **Authentication** confirms who they are.
- **Session management** identifies which subsequent HTTP requests are being made by that same user.
- ***Access Control*** determines whether the user is *allowed* to carry out the action that they are attempting to perform.

Broken Access Controls are very common and present (often) a critical security vulnerability. The design and management of these controls are a complex and dynamic problem.

![[image-1044.png]]

### Vertical Privilege Escalation
If a user can gain access to function that they are not permitted to access, then this is vertical privilege escalation. For example, if **a non-admin user** can **gain access to an admin page** *where they can delete user accounts*, then this is **vertical privilege escalation.**

#### Unprotected function(ality)
Vertical Priv. Esc. usually shows itself when a web-app does not enforce any protection for sensitive functions. For example, admin functions linking only from admin pages, but not user pages. But somehow, the user can access the admin functions just by browsing to the URL, since there are no user/password protections on it.

For example, `https://insecure-website.com/admin` could be visited just by trying the page.

And where might you find these pages, other than trying common paths?

Well, the `https://insecure-website.com/robots.txt` page usually has to disclose which paths to not crawl. And as such, you should check those paths!

You could also brute-force these paths.

In some cases, sensitive functions are concealed by giving it a less "predictable URL". This is an example of so-called "security by obscurity". Doing it this way does not really provide effective Access Control because users might discover the obfuscated URL in any number of ways.

Imagine the same administrative-panel URL but with this "less predictable URL":
`https://insecure-website.com/administrator-panel-yb556`

This might not be directly guessable by an attacker (and not in `robots.txt`). The URL might be disclosed in JavaScript that constructs the user interface based on the user's role:

```js
<script>
	var isAdmin = false;
	if (isAdmin) {
		...
		var adminPanelTag = document.createElement('a');
		adminPanelTag.setAttribute('href', 'https://insecure-website.com/administrator-panel-yb556');
		adminPanelTag.innerText = 'Admin panel';
		...
	}
</script>
```

This script adds a link to the user's UI if they are an admin user. Although the script containing the URL is visible to all users regardless of their role.

![[image-1045.png]]

### Parameter-Based Access Control Methods
