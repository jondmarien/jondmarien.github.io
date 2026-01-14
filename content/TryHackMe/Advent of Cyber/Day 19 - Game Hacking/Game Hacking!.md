---
title: Day 19 - Game Hacking
created: 2024-12-31
---
#tryhackmeaoc2024 

```
Dirt on the Mayor, the Glitch needed more,
But the dirt was protected by a pesky locked door!
But no need for panic, no need for dramatics,
The Glitch would get through with these game mechanics. 
```
![](hiding.png)
## Learning Objectives
- Understand how to interact with an executable's API.
- Intercept and modify internal APIs using Frida.
- Hack a game with the help of Frida.

I changed the OTP.js file to include a log statement where it prints out the OTP in an int format.
![](Pasted%20image%2020241231193427.png)

I then ran `frida-trace` again.
![](Pasted%20image%2020241231193452.png)

I inputted the OTP:
![](Pasted%20image%2020241231193527.png)

> [!check]- First flag received!
> ![](Pasted%20image%2020241231193552.png)

For the 2nd flag, I originally put these logs in the code to see what the different variables mean.
![](Pasted%20image%2020241231194116.png)

I got this in the console:
![](Pasted%20image%2020241231194125.png)
Param 1 is the Item ID, Param 2 is the price, and Param 3 is the player's coins.

I changed the purchase.js file to look like this, which allows me to buy any item I want!

> [!check]- Second flag received!
> ![](Pasted%20image%2020241231194354.png)

The third flag is a bit harder as the function checks for `String`s, not `Int`s.

I originally changed the code to grab the memory of the String, but that did not work the best.
![](Pasted%20image%2020241231194721.png)
![](Pasted%20image%2020241231194724.png)

Let's change it to something else. Let's add use the `onLeave` function, to find the return value!
![](Pasted%20image%2020241231194909.png)

If we leave the return value as is, it will still be false, which will not let us pass! If we change it to `True`, though, that should work! We can do so like this:
![](Pasted%20image%2020241231195016.png)

Now, if we run the game again, we should be let in! Let's try it :)
![](Pasted%20image%2020241231195102.png)

> [!check]- Third flag received!
> ![](Pasted%20image%2020241231195127.png)

Frida is a very cool tool! Will definitely continue to use it :)