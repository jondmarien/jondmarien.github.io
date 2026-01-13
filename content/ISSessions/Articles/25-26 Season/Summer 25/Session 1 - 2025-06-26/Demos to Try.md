
# Demo Environment Testing: Metasploitable 2 Setup

## Key Points Summary
- **Perfect choice**: Metasploitable 2 is ideal for live demonstrations
- **Known vulnerabilities**: Multiple attack vectors for impressive parallel agent showcase
- **Quick validation**: Essential services to verify before presentation
- **Demo reliability**: Pre-tested targets ensure smooth live demonstration
- **Audience impact**: Realistic vulnerabilities create authentic penetration testing experience

## **Quick Validation Checklist for Your Demo**

### **Essential Services to Verify:**
```bash
# Quick connectivity test
nmap -sn 192.168.x.x/24  # Find your Metasploitable IP

# Verify key services are running
nmap -sV -p 21,22,23,25,53,80,139,445 [METASPLOITABLE_IP]

# Test web interface accessibility
curl http://[METASPLOITABLE_IP] 

# Verify SSH is accessible
ssh -o ConnectTimeout=5 [METASPLOITABLE_IP]
```

### **Demo-Ready Vulnerabilities:**
- **Port 21 (FTP)**: vsftpd 2.3.4 backdoor
- **Port 80 (HTTP)**: Multiple web app vulnerabilities
- **Port 139/445 (SMB)**: Samba exploits
- **Port 22 (SSH)**: Weak credentials for demonstration

🧠 Metasploitable 2 is perfect for your multi-agent demo because it has multiple simultaneous attack vectors. Your agents will discover different vulnerabilities in parallel, creating that "wow" moment when the audience sees Agent 1 finding FTP issues while Agent 2 discovers web vulnerabilities and Agent 3 identifies SMB weaknesses—all happening at once.

## **Quick Demo Flow Verification:**

**Test this sequence quickly:**
1. **Agent 1**: Should immediately find multiple open ports
2. **Agent 2**: Should identify web app vulnerabilities (DVWA, etc.)
3. **Agent 3**: Should have multiple exploitation paths available
4. **Agent 4**: Should generate comprehensive findings list

**Pro tip**: Have your Metasploitable IP ready to paste into the Warp prompt, and maybe take a quick screenshot of the services running as backup in case the live demo hits any connectivity issues.

You're going to crush this presentation! The combination of solid content and a reliable demo environment will make this incredibly compelling for your audience.