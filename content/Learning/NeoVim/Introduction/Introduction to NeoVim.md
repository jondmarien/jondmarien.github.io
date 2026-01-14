*Using kickstart.nvim*
# NeoVim Tutor

## Basic Commands
<u>Normal Mode:</u>
Use `ESC` to return to normal mode.
<u>Undo:</u>
`ESC + u`=> undo the latest change.
<u>Open Linked Help:</u>
`Enter` on links will => open the linked help section (close window with `:q`).
	`k` will achieve the same outcome.
<u>Delete a character:</u>
Using `h, j, k, or l `hover over the character you wish to be deleted and press `x`.
<u>Inserting text:</u>
Using `i` , you can hover the cursor after the character location you wish to insert at. Use `ESC` to return to normal mode.
<u>Appending text:</u>
Using `A` (capital), you can append text, with the cursor being anywhere on the line. Use `ESC` to return to normal mode.
<u>Editing/Creating a File:</u>
Using `nvim FILENAME` you can create and open said file in NeoVim.

### Undo
There a few more features of the `undo` command in NeoVim. They are as follows:

Typing `u` will undo the last command executed. (lowercase u)
Typing `U` will return the line you are on and editing to its original state. (uppercase U)
Typing `CTRL+R` will *redo* the commands. (undo the undo's)

--------------------
## Deletion Commands
<u>Delete a word:</u>
If you move the cursor to the beginning of the word you want to delete, and press `dw`, it will execute the deletion.
<u>Delete the rest of the line:</u>
If you need to remove some trailing text, go to the end of the line and press `d$`. It will open up a deletion menu after you press `d`, then combine it with `SHIFT + 4` (which is `$`). 

---------------------
## Operators and Motions
In the deletion commands section, the commands get a little more complicated, as you need to combine a few keystrokes. They are classified as `operators` and `motions`. The format for the commands are as follows:

`d` = (delete) operator; `motion` = motion (what the operator will act on)
**Format:** `d motion`

**Basic list of motions:**
`w`: until the start of the next word, EXCLUDING the first character.
`e`: to the end of the current word, INCLUDING the last character.
`$`: to the end of the line, INCLUDING  the last character.

**Example:**
Typing `d` + `e` will delete from the cursor to the end of the word. (`de`)

*Note: You can still use the motions without the operator, it will just move the cursor as specified, instead of deleting.*'

### Full List of Motions
![](Pasted%20image%2020241008185439.png)

### Using Count for Motion
Typing a number with an operator repeats it that many times.

For example:
`2` + `w` = Moves the cursor forward by **two words**. (`2w`)
`3` + `e` = Moves the cursor forward to the end of the **third word**. (`3e`)
`0` = Moves the cursor to the start of the line. 

### Using Count to Delete
In combination of the delete operator, a motion, and a count (before the motion), you can delete more than just single characters or words.

For example:
`d` + `2` + `w` = Deletes 2 words ahead of the current character placement. (`d2w`)
`d` + `4` + `e` = Deletes 4 words at the end of the next word, following the current character placement. (`d4w`)

### Whole Line Deletion
Due to the necessity of deleting whole lines easily, there is a simple command to delete entire lines.

Simply, use `d` + `d`. Or rather, `dd`. You can also combine a count to delete multiple lines.

*Note: When you execute `dd`, whatever you delete on that line gets stored in a NeoVim register for future use. See: [Put Command](#Put%20Command)*

For example:
`2` + `d` + `d` = Deletes two lines. (`2dd`)
`4` + `d` + `d` = Deletes four lines. (`4dd`)
### Conclusion
The final format for a change command, now that we have learned about `operators`, `counts`, and `motions`, is as follows:

```nvim
operator + [number] + motion
```

 Where:
`operator` = What action to execute, such as `d` for delete.
`[number]` = An optional *count* to repeat the following `motion`.
`motion` = Applies the operation on the text following cursor placement.
			i.e.,
			`w` = word
			`$` = end of line

We can also use `0` to move to the start of the line.

We learned some more undo + redo commands: [Undo](#Undo)

----------
## Keybinds to Know
![](Pasted%20image%2020241008175642.png)
<u>Help Menu:</u>
- `SPACE` + `s` + `h`
	- `Space` opens up a menu of options.
		- `s` is for search, `h` is for help.
<u>Keybinds Menu:</u>
- `SPACE` + `s` + `k`
	- `Space` opens up a menu of options.
		- `s` is for search, `k` is for keybinds.
<u>Search by Grep:</u>
- `SPACE` + `s` + `g`
	- `Space` opens up a menu of options.
		- `s` is for search, `g` is for `grep`.
<u>Search Files:</u>
- `SPACE` + `s` + `f`
	- `Space` opens up a menu of options.
		- `s` is for search, `f` is for files.

-------
## Put Command



## Replace Command



## Change Operator



### More Changes with `c`