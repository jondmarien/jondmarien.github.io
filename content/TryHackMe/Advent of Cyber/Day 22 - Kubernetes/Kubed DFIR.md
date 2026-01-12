---
description: 
created: 2024-12-31
---
#tryhackmeaoc2024
```
Mayor Malware laughed hard at what he had done,
another scheme hatched, another scheme won. 
But a thought passed the mayor, the thought then passed twice. 
The list soon to come, the town's "naughty or nice"!

He paced and he paced like the week of election, 
until…that was it! A surprise mayor inspection! 
The list-making wares, well it only seemed fair
would grant him temp access, an account for the mayor.

The list makers agreed, under certain conditions. 
He logged on that day, to confirm his suspicions.
The next day they were, when the naughty list read:
"Mayor Malware" Line 1, he read it with dread.

The conditions they gave, there's something they missed.
As somehow and someway, he accessed the list.
Mayor Malware then smiled, as he'd find no blame.
With this he would find, a new home for his name!
```

### DFIR Questions
- What happened?
- When did it happen?
- Who initiated it?
- To what did it happen?
- Where was it observed?
- From where was it initiated?
- To where was it going?


To start Kubernetes, use `minikube start`.
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231170959.png)

To check that cluster is up and running, use `kubectl get pods -n wareville`. It might take a few tries:
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231171147.png)

We can connect to a specific pod using the command `kubectl exec -n wareville naughty-or-nice -it -- /bin/bash`.
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231171719.png)****

We are supposed to be able to `cat` the `access.log` file from the apache logs, but I cannot see any.
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231171843.png)

I found the log within the original vm, not the pod:
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231172026.png)

Look at docker containers
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231172404.png)

Connect to docker container
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231172424.png)

Using this command `cat docker-registry-logs.log | grep "HEAD" | cut -d ' ' -f 1`, we can find the ip's that are most commonly used. There are two!
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231173146.png)
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231173148.png)

With these results, and the massive log, we can search for connections from that specific ip using grep. Once executed, we get:
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231173324.png)

- The docker CLI application was used to connect to the registry.
- Connections came from 10.10.130.253, which is unexpected since we only upload images from 172.17.0.1.
- The client was authenticated, which allowed the image to be pulled. This means that whoever made the request had access to credentials.

Searching for "PATCH", we can find which credentials pushed an image!
`cat docker-registry-logs.log | grep "10.10.130.253" | grep "PATCH"`
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231173408.png)

These two commands show the rolebindings for users and finds a specific one tied to Mayor Malware:
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231173915.png)

Now, we can see the resources he has access to!
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231174031.png)

```shell-session
cat audit.log | grep --color=always '"user":{"username":"mayor-malware"' | grep --color=always '"resource"' | grep --color=always '"verb"'
```
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231174443.png)

```shell-session
cat audit.log | grep --color=always '"user":{"username":"system:serviceaccount:wareville:job-runner-sa"' | grep --color=always '"resource"' | grep --color=always '"verb"'
```


If we run this final command, we can confirm the attack path!
```shell-session
kubectl get secret pull-creds -n wareville -o jsonpath='{.data.\.dockerconfigjson}' | base64 --decode
```
![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231175124.png)

DONE!

![](/Resources/Learning/TryHackMe/AOC2024/Pasted-image-20241231183815.png)