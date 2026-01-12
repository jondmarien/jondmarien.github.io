
```gdb
$1 = {void (int)} 0x7ffff7dee280 <__GI_exit>
$2 = {int (const char *)} 0x7ffff7dfe8f0 <__libc_system>
$3 = {void ()} 0x555555555169 <vulnerable_function>
```


exit address: 0x7ffff7dee280 
system address: 0x7ffff7dfe8f0 
puts@plt address: 0x0000555555555030
"SHELL=/bin/bash"  → 0x00007fffffffd059 

0x7fffffffd059: "SHELL=/bin/bash" 

``` gef
gef➤  break main
Breakpoint 1 at 0x5555555551bf: file baby-pwn-2.c, line 14.
gef➤  run
Starting program: /home/chrono/Desktop/ctfs/uoftCTF/pwn/babypwn2/baby-pwn-2 
gef➤  [Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".

Breakpoint 1, main () at baby-pwn-2.c:14
14          setvbuf(stdout, NULL, _IONBF, 0);
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x00005555555551bb  →  <main+0000> push rbp
$rbx   : 0x00007fffffffcc78  →  0x00007fffffffd01f  →  "/home/chrono/Desktop/ctfs/uoftCTF/pwn/babypwn2/bab[...]"
$rcx   : 0x0000555555557dd8  →  0x0000555555555120  →  <__do_global_dtors_aux+0000> endbr64 
$rdx   : 0x00007fffffffcc88  →  0x00007fffffffd059  →  "SHELL=/bin/bash"
$rsp   : 0x00007fffffffcb60  →  0x0000000000000001
$rbp   : 0x00007fffffffcb60  →  0x0000000000000001
$rsi   : 0x00007fffffffcc78  →  0x00007fffffffd01f  →  "/home/chrono/Desktop/ctfs/uoftCTF/pwn/babypwn2/bab[...]"
$rdi   : 0x1               
$rip   : 0x00005555555551bf  →  <main+0004> mov rax, QWORD PTR [rip+0x2e6a]        # 0x555555558030 <stdout@GLIBC_2.2.5>
$r8    : 0x0               
$r9    : 0x00007ffff7fcbf40  →  <_dl_fini+0000> push rbp
$r10   : 0x00007fffffffc8a0  →  0x0000000000800000
$r11   : 0x206             
$r12   : 0x0               
$r13   : 0x00007fffffffcc88  →  0x00007fffffffd059  →  "SHELL=/bin/bash"
$r14   : 0x00007ffff7ffd000  →  0x00007ffff7ffe2e0  →  0x0000555555554000  →   jg 0x555555554047
$r15   : 0x0000555555557dd8  →  0x0000555555555120  →  <__do_global_dtors_aux+0000> endbr64 
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00 
────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffcb60│+0x0000: 0x0000000000000001   ← $rsp, $rbp
0x00007fffffffcb68│+0x0008: 0x00007ffff7dd5d68  →  <__libc_start_call_main+0078> mov edi, eax
0x00007fffffffcb70│+0x0010: 0x00007fffffffcc60  →  0x00007fffffffcc68  →  0x0000000000000038 ("8"?)
0x00007fffffffcb78│+0x0018: 0x00005555555551bb  →  <main+0000> push rbp
0x00007fffffffcb80│+0x0020: 0x0000000155554040
0x00007fffffffcb88│+0x0028: 0x00007fffffffcc78  →  0x00007fffffffd01f  →  "/home/chrono/Desktop/ctfs/uoftCTF/pwn/babypwn2/bab[...]"
0x00007fffffffcb90│+0x0030: 0x00007fffffffcc78  →  0x00007fffffffd01f  →  "/home/chrono/Desktop/ctfs/uoftCTF/pwn/babypwn2/bab[...]"
0x00007fffffffcb98│+0x0038: 0x2a8bb764077eaa72
──────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
   0x5555555551ba <vulnerable_function+0051> ret    
   0x5555555551bb <main+0000>      push   rbp
   0x5555555551bc <main+0001>      mov    rbp, rsp
●→ 0x5555555551bf <main+0004>      mov    rax, QWORD PTR [rip+0x2e6a]        # 0x555555558030 <stdout@GLIBC_2.2.5>
   0x5555555551c6 <main+000b>      mov    ecx, 0x0
   0x5555555551cb <main+0010>      mov    edx, 0x2
   0x5555555551d0 <main+0015>      mov    esi, 0x0
   0x5555555551d5 <main+001a>      mov    rdi, rax
   0x5555555551d8 <main+001d>      call   0x555555555060 <setvbuf@plt>
───────────────────────────────────────────────────────────────────────────────────────────────── source:baby-pwn-2.c+14 ────
      9      fgets(buffer, 128, stdin);
     10  }
     11  
     12  int main()
     13  {
 →   14      setvbuf(stdout, NULL, _IONBF, 0);
     15      printf("Welcome to the baby pwn 2 challenge!\n");
     16      vulnerable_function();
     17      printf("Goodbye!\n");
     18      return 0;
     19  }
──────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "baby-pwn-2", stopped 0x5555555551bf in main (), reason: BREAKPOINT
────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x5555555551bf → main()
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
print exit
$1 = {void (int)} 0x7ffff7dee280 <__GI_exit>
gef➤  print system
$2 = {int (const char *)} 0x7ffff7dfe8f0 <__libc_system>
gef➤  find "/bin/sh"
Argument required (expression to compute).                                                                                                             
gef➤  x/s *((char **)environ)                                                                                                                          
0x7fffffffd059: "SHELL=/bin/bash"                                                                                                                      
gef➤  print vulnerable_function
$3 = {void ()} 0x555555555169 <vulnerable_function>

```


