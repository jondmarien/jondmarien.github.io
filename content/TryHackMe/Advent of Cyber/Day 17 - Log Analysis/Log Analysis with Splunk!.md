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
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163613.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163616.png)
### CCTV Feed by Event Type
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163657.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163703.png)

### CCTV Feed by Rare Event
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163809.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231163811.png)

### CCTV Failed Feeds, sorted by username with session_id's
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164013.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164016.png)
Even though the users are the same, it's all originating from the same `session_id`. Let's search that `session_id` specifically!

![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164237.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164239.png)
It looks like he was trying to login, was failing, and finally succeeded. Then they proceeded to Watch and Delete Recordings. Let's see which ones he accessed.

![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164355.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164358.png)
We can take the `DeleteRecording` `session_id` and search that! Let's do that now.

![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164509.png)
If we check the `clientip` field within these results, we can see that there is only one IP!
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164609.png)

## Searching through what the IP has done
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164727.png)
We can see there are a LOT of events (~600), and that the `session_id` is completely different! Let's go back and search through that id.
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231164903.png)

### Finding out who was doing these actions:
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231165006.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231165008.png)
It was Mayor Malware all along! And his `user_id` is 4.

We are done :)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231165221.png)