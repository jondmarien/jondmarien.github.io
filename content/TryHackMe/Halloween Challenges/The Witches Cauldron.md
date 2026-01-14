*"Welcome to the enchanting world of witches and wizards. In this mystical laboratory, you find yourself as **Witch Alice**, a sorceress seeking an elusive secret potion recipe. Your trusted friend, **Witch Bob**, has discovered the hidden elixir of wonders and is eager to share it with you. However, an unforeseen obstacle stands in your way – **Goblin Eve**, determined to steal it for herself."*


At first glance, I can immediately tell that this is a problem for the Diffie-Helman Exchange, I learned this in class, and you can read it at [Session 2](Sheridan/Semester%206/Crypto/Week%203/Session%202.md).

<u>For example:</u>
Person A chooses a secret power `a` and sends `g^a mod p` to person B.
		Person B chooses a secret power `b` and sends `g^b mod p` to person A.
			Person A computes `s = (g^b mod)^a mod p`
			Person B computes `s = (g^a mod)^b mod p`
		Person A and B both share a secret encryption key `s = g^ab mod p`

In this example, Alice is Person A and Bob is Person B. Eve is an outsider -- the eavesdropper, so to speak. However, without Alice or Bob's **private** key, it is impossible for her to recreate the **shared secret key**.
## Gameplay Portion
I forgot to take photos throughout the game as I was too involved! I found the secret though :)

> [!check]- Key 1
> ![](The%20Witches%20Cauldron-20241031191216720.webp)
## Technical Portion
Once we install `openssl`, we can start with the challenge. We need to find the flag that is returned after decrypting `encrypted_spell.enc`. I installed `openssl` via `scoop`, with the command `scoop install openssl`.

Now, we can start~!

The following command generates Diffie Helman parameters, in a `dhparams.pen` file. It creates a `2048`-bit long safe prime.
![](The%20Witches%20Cauldron-20241031182252570.webp)

Now, we need to generate Alice and Bob's respective **private** keys, using what we are given.
![](The%20Witches%20Cauldron-20241031182403504.webp)

These commands generate the respective **private** keys with the parameter files:
![](The%20Witches%20Cauldron-20241031182511463.webp)

Now, we need to generate Alice and Bob's respective **public** keys.

These commands generate the respective **public** keys with the parameter files:
![](The%20Witches%20Cauldron-20241031182701012.webp)

Next, we can use Alice's **private** key and Bob's **public** key (or vice versa) to find out the **shared secret key**:
![](The%20Witches%20Cauldron-20241031185526942.webp)

After executing that, we should be left with some more files, including the **shared secret key**:
![](The%20Witches%20Cauldron-20241031183043758.webp)

Now, we just need to replicate the decryption done by Bob (which we have a hint for, at the bottom of the page, near the submit box. *"I encrypted the spell using AES-256-CBC." -Bob*). Easy enough!

To decrypt in `openssl`, with a specific encryption type, use the following command:
![](The%20Witches%20Cauldron-20241031183610483.webp)

After execution, though, it says that I am using a deprecated key derivation, and to swap, because it couldn't decrypt it. Instead of using `-d`, I went with `-pbkdf2`, which I know well, and is the most recognizable one for me. It is called Password Based Key Derivation Function (2). Now the command looks like this:
![](The%20Witches%20Cauldron-20241031183800291.webp)

And we have our recipe.txt!
![](The%20Witches%20Cauldron-20241031183825457.webp)

If we see what is inside, it should be our flag!
> [!check]- Key 2
> `THM{525403e42fba51dfd0572025d78062f}`


