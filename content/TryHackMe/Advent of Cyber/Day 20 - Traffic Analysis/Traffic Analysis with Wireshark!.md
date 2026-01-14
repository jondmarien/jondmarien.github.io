---
created: 2024-12-31
title: Day 20 - Traffic Analysis
---
#tryhackmeaoc2024
```
Glitch snuck through the shadows, swift as a breeze,
He captured the traffic with delicate ease.
A PCAP file from a system gone bad,
Mayor Malware's tricks made everything mad!
```

```
McSkidy peered at the PCAP with care,
"What secrets," she wondered, "are hiding in there?"
With Wireshark, she'll dig through each Byte,
Hoping to shed some much-needed light.
```

Usually, the reply from a C2 server contains the command, instructing the malicious program what to do next. However, the type of instruction depends on the malicious actor’s configuration, intention, and capabilities. These instructions often fall into several categories:

1. **Getting system information:** The attacker may want to know more about the compromised machine to tailor their next moves. This is what we are seeing above.
2. **Executing commands:** If the attacker needs to perform specific actions, they can also send commands directly. However, this is less stealthy and easily attracts attention.
3. **Downloading and executing payloads:** The attacker can also send additional payloads to the machine containing additional functionality or tools.
4. **Exfiltrating data:** This is one of the most common objectives. The program may be instructed to steal valuable data such as sensitive files, credentials, or personal information.

If we follow the HTTP Stream for the `GET /command` packet (Frame 457), we can see that the message was sent out and acknowledges that the payload is inside the victim.
![](Pasted%20image%2020241231190524.png)
If we follow the stream to `2`, another layer, we can see the command that was executed!
![](Pasted%20image%2020241231190553.png)
If we follow the HTTP Stream for the `POST /exfiltrate` packet (Frame 476) sent to the same destination IP, we will see a file exfiltrated to the C2 server.
![](Pasted%20image%2020241231185000.png)
![](Pasted%20image%2020241231185018.png)

```
--f5964f77-daf1-4853-aacb-df4754eaacaf
Content-Disposition: form-data; name="file"; filename="credentials.txt"
Content-Type: application/octet-stream

AES ECB is your chance to decrypt the encrypted beacon with the key: 1234567890abcdef1234567890abcdef
--f5964f77-daf1-4853-aacb-df4754eaacaf--
```

Similarly, if we go up a stream level to `4`, we can see another hidden value:
![](Pasted%20image%2020241231190744.png)

```
Encrypted: 8724670c271adffd59447552a0ef3249 (The exfiltrated file has a clue)
HTTP/1.0 200 OK
Server: BaseHTTP/0.6 Python/3.8.10
Date: Thu, 17 Oct 2024 09:47:04 GMT

Beacon acknowledged
```

If we then take that encrypted value, and put it into [CyberChef](https://gchq.github.io/CyberChef/), we can find the key! Here are the steps I took.

![](Pasted%20image%2020241231190857.png)
Make sure you use the key from the previous step, and select `ECB` mode on the `AES Decrypt` Function.
![](Pasted%20image%2020241231190904.png)
I like to bake the actions myself, so I turned off `auto-bake`, and clicked bake!
![](Pasted%20image%2020241231191132.png)
Finally, we get the secret!
> [!check]- THM Key 
> ![](Pasted%20image%2020241231191057.png)