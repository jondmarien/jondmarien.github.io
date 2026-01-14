**Format String Attacks**

API, like `printf`, has issues with exploits

![](Pasted%20image%2020240212130435%201.png)
![](Pasted%20image%2020240212130440%201.png)

| Character | Description |
| ---- | ---- |
| d, i | Signed integer |
| u | Unsigned integer |
| f, F | Double |
| e, E | Double in normal form (think IEEE 754 floating point standard) |
| g, G | Double in scientific notation |
| x, X | Unsigned integer as a hex number |
| o | Unsigned int in octal (ya, octal, some people still want to know this) |
| s | Null terminated string |
| c | Character (char data type) |
| p | Pointer to void…depends on implementation. |
| n | Don’t print anything but write the number of characters successfully written so far into an int pointer |

**Invocation of `printf`**
![](Pasted%20image%2020240212130754%201.png)


**Insufficient Arguments to `printf`**
![](Pasted%20image%2020240212131540%201.png)
![](Pasted%20image%2020240212131548%201.png)
- In this case, once the program is done reading the `value` at memory address `b`, it will continue to read what is on the stack (where the "cursor" left off). In this case it will print whatever value is above the memory address of `b`.

**Exploiting Inconsistent `printf`

*Crashing a Program*
![](Pasted%20image%2020240212132843%201.png)

*Printing Contents of Stack*
![](Pasted%20image%2020240212132858%201.png)

**Printing any Memory Location**
*(1)*
![](Pasted%20image%2020240212132929%201.png)

*(2)*
![](Pasted%20image%2020240212133009%201.png)

*(3)*
![](Pasted%20image%2020240212133037%201.png)


**More Format Specifiers**
- Reduce the number of `%x` with `%N$s`
	- ![](Pasted%20image%2020240212133856%201.png)
	- ![](Pasted%20image%2020240212133905%201.png)
- `%n` format specifier:
	- Returns the number of characters printed so far.
		- `i` is filled with 5 here
		- ![](Pasted%20image%2020240212134009%201.png)
- `%hn` format specifier (Will only use 16 bits, can be used to store large numbers):
	-  Used to write a **short integer** value into memory
	- It takes the number of characters printed so far by `printf` and writes that number, as a short integer, into a memory location that you specify as the target argument.
		![](Pasted%20image%2020240212140554%201.png)
		![](Pasted%20image%2020240212140630%201.png)

**Overwrite an Arbitrary Location**
- Using the same approach to read data from any location, `printf` can be used to modify a location as well
	- Can be used to change *function pointers* as well as *return addresses*

*With some Number*
![](Pasted%20image%2020240212140311%201.png)

*With Arbitrary Number*
![](Pasted%20image%2020240212140325%201.png)
- Arbitrary number in this case is `%53x`, as shown before `%7$n`
	- ![](Pasted%20image%2020240212141438%201.png)

**`%n` in `printf`**
- There are 16 characters before `%n`, so the value of `c` would be `16`.
	![](Pasted%20image%2020240212140238%201.png)



**Recon**
- This basic level of reading stack data can be used for recon against a target program
- Useful for reading usernames, passwords, return addresses, ***canary values***, and other interesting data from the stack

- What about using `%n` specifier to write arbitrary values in conjunction with the `%0##x` function used previously ???



**Safe Code for `printf`**
![](Pasted%20image%2020240212141158%201.png)