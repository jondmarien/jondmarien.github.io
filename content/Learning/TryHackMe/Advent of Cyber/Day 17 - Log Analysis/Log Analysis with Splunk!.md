---
description: "An attack now, it seems, on the town's CCTV,\r\ 

  There's a problem with the logs, but what could it be?

  \rAn idea put forward of a log format switch,\r\ 

  Not as expected, the idea of the Glitch!"
title: Day 17 - Log Analysis
created: 2024-12-31
---
#tryhackmeaoc2024 

# Log Analysis with Splunk!

I've already done half of the room, but wanted to have some pictures to refer to.

### CCTV Feed by UserName
![](Pasted%20image%2020241231163613.png)
![](Pasted%20image%2020241231163616.png)
### CCTV Feed by Event Type
![](Pasted%20image%2020241231163657.png)
![](Pasted%20image%2020241231163703.png)

### CCTV Feed by Rare Event
![](Pasted%20image%2020241231163809.png)
![](Pasted%20image%2020241231163811.png)

### CCTV Failed Feeds, sorted by username with session_id's
![](Pasted%20image%2020241231164013.png)
![](Pasted%20image%2020241231164016.png)
Even though the users are the same, it's all originating from the same `session_id`. Let's search that `session_id` specifically!

![](Pasted%20image%2020241231164237.png)
![](Pasted%20image%2020241231164239.png)
It looks like he was trying to login, was failing, and finally succeeded. Then they proceeded to Watch and Delete Recordings. Let's see which ones he accessed.

![](Pasted%20image%2020241231164355.png)
![](Pasted%20image%2020241231164358.png)
We can take the `DeleteRecording` `session_id` and search that! Let's do that now.

![](Pasted%20image%2020241231164509.png)
If we check the `clientip` field within these results, we can see that there is only one IP!
![](Pasted%20image%2020241231164609.png)

## Searching through what the IP has done
![](Pasted%20image%2020241231164727.png)
We can see there are a LOT of events (~600), and that the `session_id` is completely different! Let's go back and search through that id.
![](Pasted%20image%2020241231164903.png)

### Finding out who was doing these actions:
![](Pasted%20image%2020241231165006.png)
![](Pasted%20image%2020241231165008.png)
It was Mayor Malware all along! And his `user_id` is 4.

We are done :)
![](Pasted%20image%2020241231165221.png)