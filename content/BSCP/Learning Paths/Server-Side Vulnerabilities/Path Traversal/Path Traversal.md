---
title: Path Traversal
author: Jon Marien
created: 2025-12-18
published: 2025-12-18
tags:
  - certifications
  - bscp
  - burp
---

| Title          | Author     | Created           | Published         | Tags                                                                    |
| -------------- | ---------- | ----------------- | ----------------- | ----------------------------------------------------------------------- |
| Path Traversal | Jon Marien | December 18, 2025 | December 18, 2025 | [[#certifications\|#certifications]], [[#bscp\|#bscp]],[[#burp\|#burp]] |
# Path Traversal

## Definition
**Path Traversal** is also called **Directory Traversal**.

It **enables attackers to read arbitrary files on a server that is running an application**. It could possibly include:
- Application Code & data.
- Credentials for backend systems.
- Sensitive OS files.

In some cases, an attacker can write to these arbitrary files on the server, allowing them to modify the app's data or behaviour, and possibly, ultimately, take full control of the server.

### Reading Arbitrary Files via Path Traversal
Image a shopping app that displays images of items for sale. They might load it using: `<img src="/loadImage?filename=218.png">`.

the `loadImage` URL takes a `filename` parameter and returns the content of the file specified. They are stored on disk at `/var/www/images/`. To return an image, the app appends the requested filename to the base directory, and uses a filesystem API to read the contents. The proceeding path would become: `/var/www/images/218.png`.

The current application implements no defense against path traversal attacks. As a result, an attacker can request the following URL to retrieve the `/etc/passwd` file from the server's filesystem:
`https://insecure-website.com/loadImage?filename=../../../etc/passwd`

This would then cause the application to read from the following path (you guessed it):
`/var/www/images/../../../etc/passwd` :)

Since the `../` sequence is valid within a file path, it steps up one level in the directory structure. Since there are 3 `../`'s, the final file path that gets read is: `/etc/passwd`.

On Unix, this is standard, but **for Windows, both** `../` **and** `..\` **are valid directory traversal sequences**.

This is an example of a path traversal attack on a Windows-based server:
`https://insecure-website.com/loadImage?filename=..\..\..\windows\win.ini`

And this will be the final path: `\windows\win.ini`.

### Parameter Based Access-Control Methods
Some applications determine the user's access rights or role at login, and then store this information in a user-controllable location. This could be:

- **A hidden field.**
- **A cookie.**
- **A preset query string parameter.**

The application makes access control decisions based on the submitted value. For example: 
```HTML
https://insecure-website.com/login/home.jsp?admin=true
https://insecure-website.com/login/home.jsp?role=1
```
This approach is insecure because a user can modify the value and access functionality they're not authorized to, such as administrative functions. 

## Horizontal Privilege Escalation
- If a user is able to access resources that they're not supposed to. So, if your ID is 123, you can enumerate through them and do ID 124 or 125, and maybe that has an admin access in that user. This is also an example of an IDOR vulnerability, which is an insecure direct object reference. 
- In some applications, you cannot predict the value of the exploitable parameter. For example, some applications instead of incrementing numbers, they might use something called a global unique identifier, which is a GUID. These cannot be enumerated as easily as normal numbers, but they can still be enumerated if you know what is going on.
- The lab was solved by finding a blog post written by a certain author and then clicking on their profile. Then, looking in the URL for their GUID, and when you go to my account, you basically replace your GUID with the GUID that you found for `carlos`, and then you can access his profile, and receive the API key for the solution.
#### Horizontal to Vertical Privilege Escalation
- So when talking about horizontal and vertical privilege escalation, the two are quite similar because not in the way that they actually are but in the way that they are able to be accessed.

- For horizontal escalation, you can have an attacker reset or capture the password belonging to another user. If the attacker targets an admin user and compromises their account, they can gain admin access.
- So instead of just using the parameter tampering technique from horizontal privilege escalation and enumerating the number.
	- For vertical escalation, if you enumerate through the number and end up on an application administrator, then you have vertical privilege escalation.

- For the lab, this one was solved by retrieving the administrator's password and then using it to delete the user Carlos.

So what we did was we changed the ID parameter in the URL from Weiner or Carlos to administrator and then we clicked on the reset password button with the intercept off so we could see what the data was for the password field. Then we copied the password field, logged out of the other users, and logged into the administrator account. That allowed us to get access to the administrator panel and delete the user Carlos.

## Authentication Vulnerabilities
