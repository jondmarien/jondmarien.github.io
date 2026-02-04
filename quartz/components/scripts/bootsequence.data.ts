// Boot sequence data - extracted for cleaner code organization
// Each line has text, delay (ms from start), and type for styling

export interface BootLine {
  text: string
  delay: number
  type: "header" | "info" | "status" | "hardware" | "prompt" | "empty"
}

export const BOOT_SEQUENCE: BootLine[] = [
  // BIOS POST
  { text: "CHRONO.TECH BIOS v4.2.0", delay: 0, type: "header" },
  { text: "Copyright (C) 2024-2026 Jon Marien", delay: 80, type: "info" },
  { text: "", delay: 120, type: "empty" },
  { text: "Initializing quantum core...", delay: 160, type: "status" },
  { text: "Detecting neural interface...", delay: 200, type: "status" },
  { text: "CPU: Quantum Core @ 4.2 GHz ... OK", delay: 240, type: "hardware" },
  { text: "RAM: 32768 MB Neural Buffer ... OK", delay: 280, type: "hardware" },
  { text: "DISK: 2 TB Holographic Array ... OK", delay: 320, type: "hardware" },
  { text: "GPU: CyberGraphics 9000 ... OK", delay: 360, type: "hardware" },
  { text: "", delay: 400, type: "empty" },

  // Kernel boot
  {
    text: "[    0.000000] Linux version 6.2.0-chrono (gcc 13.1.0) #1 SMP PREEMPT",
    delay: 440,
    type: "status",
  },
  {
    text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.2.0-chrono root=/dev/nvme0n1p2",
    delay: 480,
    type: "status",
  },
  { text: "[    0.000001] BIOS-provided physical RAM map:", delay: 520, type: "status" },
  {
    text: "[    0.000001]  BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable",
    delay: 560,
    type: "status",
  },
  { text: "[    0.000002] NX (Execute Disable) protection: active", delay: 600, type: "status" },
  { text: "[    0.000003] SMBIOS 3.4 present.", delay: 640, type: "status" },
  {
    text: "[    0.000004] DMI: CHRONO.TECH CyberFrame X1/Neural-Board, BIOS 4.2.0 01/01/2026",
    delay: 680,
    type: "status",
  },
  { text: "[    0.000005] tsc: Detected 4200.000 MHz processor", delay: 720, type: "status" },
  {
    text: "[    0.000010] Calibrating delay loop (skipped), value calculated using timer frequency",
    delay: 760,
    type: "status",
  },
  { text: "[    0.000012] pid_max: default: 32768 minimum: 301", delay: 800, type: "status" },
  { text: "[    0.000015] Mount-cache hash table entries: 65536", delay: 840, type: "status" },
  {
    text: "[    0.000020] CPU: Quantum Core (family: 0x42, model: 0x7f)",
    delay: 880,
    type: "status",
  },
  { text: "[    0.000025] Performance Events: CyberCore PMU driver", delay: 920, type: "status" },
  { text: "[    0.000030] QuantumVM: secure enclave initialized", delay: 960, type: "status" },
  { text: "", delay: 1000, type: "empty" },

  // Memory and devices
  {
    text: "[    0.100000] Memory: 32768MB available (16384MB kernel code, 8192MB rwdata)",
    delay: 1040,
    type: "status",
  },
  {
    text: "[    0.100010] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=16, Nodes=1",
    delay: 1080,
    type: "status",
  },
  { text: "[    0.100020] rcu: Hierarchical SRCU implementation.", delay: 1120, type: "status" },
  {
    text: "[    0.100030] NR_IRQS: 524544, nr_irqs: 1024, preallocated irqs: 16",
    delay: 1160,
    type: "status",
  },
  { text: "[    0.100040] Console: colour dummy device 80x25", delay: 1200, type: "status" },
  { text: "[    0.100050] printk: console [tty0] enabled", delay: 1240, type: "status" },
  { text: "[    0.100060] ACPI: Core revision 20230628", delay: 1280, type: "status" },
  {
    text: "[    0.100070] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff",
    delay: 1320,
    type: "status",
  },
  { text: "[    0.100080] APIC: Switch to symmetric I/O mode setup", delay: 1360, type: "status" },
  { text: "", delay: 1400, type: "empty" },

  // PCI and ACPI
  { text: "[    0.200000] ACPI: Added _OSI(Module Device)", delay: 1440, type: "status" },
  { text: "[    0.200010] ACPI: Added _OSI(Processor Device)", delay: 1480, type: "status" },
  {
    text: "[    0.200020] ACPI: 16 ACPI AML tables successfully acquired",
    delay: 1520,
    type: "status",
  },
  {
    text: "[    0.200030] PCI: Using configuration type 1 for base access",
    delay: 1560,
    type: "status",
  },
  {
    text: "[    0.200040] PCI: ECAM [mem 0xe0000000-0xefffffff] (base 0xe0000000) for domain 0000",
    delay: 1600,
    type: "status",
  },
  {
    text: "[    0.200050] pci 0000:00:00.0: [8086:7f00] type 00 class 0x060000",
    delay: 1640,
    type: "status",
  },
  {
    text: "[    0.200060] pci 0000:01:00.0: CyberGraphics 9000 [10de:2684] at 0000:01:00.0",
    delay: 1680,
    type: "status",
  },
  {
    text: "[    0.200070] pci 0000:02:00.0: NVMe Controller Samsung 990 PRO [144d:a80b]",
    delay: 1720,
    type: "status",
  },
  {
    text: "[    0.200080] pci 0000:03:00.0: Quantum Network Interface [1337:4242]",
    delay: 1760,
    type: "status",
  },
  { text: "", delay: 1800, type: "empty" },

  // USB and input
  {
    text: "[    0.300000] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002",
    delay: 1840,
    type: "status",
  },
  {
    text: "[    0.300010] usb usb2: New USB device found, idVendor=1d6b, idProduct=0003",
    delay: 1880,
    type: "status",
  },
  { text: "[    0.300020] hub 1-0:1.0: USB hub found", delay: 1920, type: "status" },
  { text: "[    0.300030] hub 2-0:1.0: USB hub found", delay: 1960, type: "status" },
  {
    text: "[    0.300040] usb 1-1: New USB device found, Neural Interface HID",
    delay: 2000,
    type: "status",
  },
  {
    text: "[    0.300050] input: CyberDeck Neural Keyboard as /devices/pci0000:00/usb1/1-1",
    delay: 2040,
    type: "status",
  },
  {
    text: "[    0.300060] input: HoloTracker XR Mouse as /devices/pci0000:00/usb1/1-2",
    delay: 2080,
    type: "status",
  },
  { text: "", delay: 2120, type: "empty" },

  // Filesystems
  {
    text: "[    0.400000] EXT4-fs (nvme0n1p2): mounted filesystem with ordered data mode",
    delay: 2160,
    type: "status",
  },
  {
    text: "[    0.400010] VFS: Mounted root (ext4 filesystem) readonly on device 259:2",
    delay: 2200,
    type: "status",
  },
  { text: "[    0.400020] devtmpfs: mounted", delay: 2240, type: "status" },
  { text: "[    0.400030] Freeing unused kernel memory: 2048K", delay: 2280, type: "status" },
  { text: "[    0.400040] Run /sbin/init as init process", delay: 2320, type: "status" },
  { text: "", delay: 2360, type: "empty" },

  // systemd startup
  { text: "         Starting CHRONO.OS v2.4.0 (Quantum)...", delay: 2400, type: "header" },
  { text: "", delay: 2440, type: "empty" },
  { text: "[  OK  ] Created slice Slice /system/modprobe.", delay: 2480, type: "hardware" },
  { text: "[  OK  ] Created slice Slice /system/systemd-fsck.", delay: 2520, type: "hardware" },
  { text: "[  OK  ] Created slice User and Session Slice.", delay: 2560, type: "hardware" },
  {
    text: "[  OK  ] Started Dispatch Password Requests to Console.",
    delay: 2600,
    type: "hardware",
  },
  { text: "[  OK  ] Started Forward Password Requests to Wall.", delay: 2640, type: "hardware" },
  { text: "[  OK  ] Reached target Local Encrypted Volumes.", delay: 2680, type: "hardware" },
  { text: "[  OK  ] Reached target Path Units.", delay: 2720, type: "hardware" },
  { text: "[  OK  ] Reached target Remote File Systems.", delay: 2760, type: "hardware" },
  { text: "[  OK  ] Reached target Slice Units.", delay: 2800, type: "hardware" },
  { text: "[  OK  ] Reached target Swaps.", delay: 2840, type: "hardware" },
  {
    text: "[  OK  ] Listening on Device-mapper event daemon FIFOs.",
    delay: 2880,
    type: "hardware",
  },
  { text: "[  OK  ] Listening on Journal Audit Socket.", delay: 2920, type: "hardware" },
  { text: "[  OK  ] Listening on Journal Socket (/dev/log).", delay: 2960, type: "hardware" },
  { text: "[  OK  ] Listening on Journal Socket.", delay: 3000, type: "hardware" },
  { text: "[  OK  ] Listening on udev Control Socket.", delay: 3040, type: "hardware" },
  { text: "[  OK  ] Listening on udev Kernel Socket.", delay: 3080, type: "hardware" },
  { text: "", delay: 3120, type: "empty" },

  // More services
  { text: "[  OK  ] Mounted Huge Pages File System.", delay: 3160, type: "hardware" },
  { text: "[  OK  ] Mounted POSIX Message Queue File System.", delay: 3200, type: "hardware" },
  { text: "[  OK  ] Mounted Kernel Debug File System.", delay: 3240, type: "hardware" },
  { text: "[  OK  ] Mounted Kernel Trace File System.", delay: 3280, type: "hardware" },
  { text: "[  OK  ] Started Load Kernel Modules.", delay: 3320, type: "hardware" },
  {
    text: "         Starting Remount Root and Kernel File Systems...",
    delay: 3360,
    type: "status",
  },
  { text: "[  OK  ] Started Remount Root and Kernel File Systems.", delay: 3400, type: "hardware" },
  { text: "[  OK  ] Started Journal Service.", delay: 3440, type: "hardware" },
  { text: "         Starting Load/Save Random Seed...", delay: 3480, type: "status" },
  { text: "         Starting Apply Kernel Variables...", delay: 3520, type: "status" },
  { text: "         Starting Create System Users...", delay: 3560, type: "status" },
  { text: "[  OK  ] Started Load/Save Random Seed.", delay: 3600, type: "hardware" },
  { text: "[  OK  ] Started Apply Kernel Variables.", delay: 3640, type: "hardware" },
  { text: "[  OK  ] Started Create System Users.", delay: 3680, type: "hardware" },
  { text: "", delay: 3720, type: "empty" },

  // Network and services
  { text: "[  OK  ] Started udev Coldplug all Devices.", delay: 3760, type: "hardware" },
  { text: "[  OK  ] Started Rule-based Manager for Device Events.", delay: 3800, type: "hardware" },
  { text: "         Starting Network Configuration...", delay: 3840, type: "status" },
  { text: "[  OK  ] Started Network Configuration.", delay: 3880, type: "hardware" },
  { text: "         Starting Quantum Secure Network Manager...", delay: 3920, type: "status" },
  { text: "[  OK  ] Started Quantum Secure Network Manager.", delay: 3960, type: "hardware" },
  { text: "[  OK  ] Reached target Network.", delay: 4000, type: "hardware" },
  { text: "[  OK  ] Reached target Network is Online.", delay: 4040, type: "hardware" },
  { text: "", delay: 4080, type: "empty" },

  // Chrono-specific services
  {
    text: "         Starting chrono-neural.service - Neural Interface Daemon...",
    delay: 4120,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-neural.service - Neural Interface Daemon.",
    delay: 4160,
    type: "hardware",
  },
  {
    text: "         Starting chrono-holo.service - Holographic Display Service...",
    delay: 4200,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-holo.service - Holographic Display Service.",
    delay: 4240,
    type: "hardware",
  },
  {
    text: "         Starting chrono-quantum.service - Quantum Entanglement Core...",
    delay: 4280,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-quantum.service - Quantum Entanglement Core.",
    delay: 4320,
    type: "hardware",
  },
  {
    text: "         Starting chrono-cyber.service - Cyberdeck Interface Layer...",
    delay: 4360,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-cyber.service - Cyberdeck Interface Layer.",
    delay: 4400,
    type: "hardware",
  },
  {
    text: "         Starting chrono-matrix.service - Matrix Connectivity Hub...",
    delay: 4440,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-matrix.service - Matrix Connectivity Hub.",
    delay: 4480,
    type: "hardware",
  },
  {
    text: "         Starting chrono-ice.service - Intrusion Countermeasures...",
    delay: 4520,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-ice.service - Intrusion Countermeasures.",
    delay: 4560,
    type: "hardware",
  },
  { text: "", delay: 4600, type: "empty" },

  // More system services
  { text: "[  OK  ] Started D-Bus System Message Bus.", delay: 4640, type: "hardware" },
  { text: "[  OK  ] Started Login Service.", delay: 4680, type: "hardware" },
  { text: "[  OK  ] Started User Manager for UID 1000.", delay: 4720, type: "hardware" },
  { text: "[  OK  ] Started Session c1 of User chrono.", delay: 4760, type: "hardware" },
  { text: "[  OK  ] Reached target Graphical Interface.", delay: 4800, type: "hardware" },
  { text: "", delay: 4840, type: "empty" },

  // Security and encryption
  {
    text: "         Starting chrono-vault.service - Secure Data Vault...",
    delay: 4880,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-vault.service - Secure Data Vault.",
    delay: 4920,
    type: "hardware",
  },
  {
    text: "         Starting chrono-encrypt.service - Quantum Encryption Layer...",
    delay: 4960,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-encrypt.service - Quantum Encryption Layer.",
    delay: 5000,
    type: "hardware",
  },
  {
    text: "         Starting chrono-firewall.service - Neural Firewall...",
    delay: 5040,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-firewall.service - Neural Firewall.",
    delay: 5080,
    type: "hardware",
  },
  { text: "", delay: 5120, type: "empty" },

  // Web and content services
  {
    text: "         Starting chrono-web.service - Web Rendering Engine...",
    delay: 5160,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-web.service - Web Rendering Engine.",
    delay: 5200,
    type: "hardware",
  },
  {
    text: "         Starting chrono-content.service - Content Delivery Network...",
    delay: 5240,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-content.service - Content Delivery Network.",
    delay: 5280,
    type: "hardware",
  },
  {
    text: "         Starting chrono-cache.service - Neural Cache Layer...",
    delay: 5320,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-cache.service - Neural Cache Layer.",
    delay: 5360,
    type: "hardware",
  },
  {
    text: "         Starting chrono-render.service - Holographic Renderer...",
    delay: 5400,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-render.service - Holographic Renderer.",
    delay: 5440,
    type: "hardware",
  },
  { text: "", delay: 5480, type: "empty" },

  // Final initialization
  {
    text: "         Starting chrono-uplink.service - Secure Uplink Daemon...",
    delay: 5520,
    type: "status",
  },
  {
    text: "[  OK  ] Started chrono-uplink.service - Secure Uplink Daemon.",
    delay: 5560,
    type: "hardware",
  },
  { text: "[  OK  ] Reached target Multi-User System.", delay: 5600, type: "hardware" },
  { text: "[  OK  ] Reached target Chrono Startup Complete.", delay: 5640, type: "hardware" },
  { text: "", delay: 5680, type: "empty" },

  { text: "Press any key to continue...", delay: 6160, type: "prompt" },
]

export const STORAGE_KEY = "chrono-boot-seen"

// Max lines to show before clearing (simulates screen refresh)
export const MAX_VISIBLE_LINES = 25
