# Deployment Guide - Hetzner VM

This guide covers deploying the portfolio to a Hetzner VM with Docker, Nginx, and automatic SSL certificates.

## Prerequisites

- Hetzner VM with Ubuntu 22.04+ or Debian 12+
- Domain pointing to your VM's IP address (A record)
- SSH access to the VM

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Hetzner VM                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                   Docker                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────┐  │   │
│  │  │  Nginx  │──│   App   │  │     Certbot     │  │   │
│  │  │  :80    │  │  :3000  │  │  (SSL renewal)  │  │   │
│  │  │  :443   │  │         │  │                 │  │   │
│  │  └─────────┘  └─────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Step 1: Initial Server Setup

SSH into your Hetzner VM:

```bash
ssh root@your-server-ip
```

### 1.1 Update System

```bash
apt update && apt upgrade -y
```

### 1.2 Create Deploy User

```bash
# Create user
adduser deploy
usermod -aG sudo deploy

# Setup SSH for deploy user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Switch to deploy user
su - deploy
```

### 1.3 Install Docker

```bash
# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker deploy
newgrp docker

# Verify installation
docker --version
docker compose version
```

### 1.4 Configure Firewall

```bash
sudo apt install -y ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Enable firewall
sudo ufw enable
sudo ufw status
```

### 1.5 Install Fail2ban (Optional but Recommended)

```bash
sudo apt install -y fail2ban

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Step 2: Deploy Application

### 2.1 Clone Repository

```bash
cd ~
mkdir -p apps
cd apps
git clone https://github.com/byurhannurula/byurhannurula-com.git portfolio
cd portfolio
```

### 2.2 Create Environment File

```bash
cp .env.example .env.production
nano .env.production
```

Fill in your production values:

```env
NEXT_PUBLIC_BASE_URL=https://byurhannurula.com
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
NEXT_PUBLIC_UMAMI_SRC=your-umami-src
NEXT_PUBLIC_UMAMI_ID=your-umami-id
RESEND_API_KEY=your-resend-key
```

### 2.3 Update Nginx Configuration

Edit `docker/nginx/nginx.conf` and replace `byurhannurula.com` with your domain if different.

### 2.4 Obtain SSL Certificates

```bash
# Make script executable
chmod +x docker/scripts/init-ssl.sh

# Set your domain and email
export DOMAIN=byurhannurula.com
export EMAIL=hello@byurhannurula.com

# For testing, use staging (recommended first)
export STAGING=1
./docker/scripts/init-ssl.sh

# If staging works, get real certificate
export STAGING=0
rm -rf certbot/conf/*
./docker/scripts/init-ssl.sh
```

### 2.5 Start the Application

```bash
# Pull the latest image
docker compose pull

# Start all services
docker compose up -d

# Check status
docker compose ps
docker compose logs -f
```

## Step 3: Verify Deployment

1. **Check containers are running:**
   ```bash
   docker compose ps
   ```

2. **Check application health:**
   ```bash
   curl -I https://byurhannurula.com
   ```

3. **Check SSL certificate:**
   ```bash
   curl -vI https://byurhannurula.com 2>&1 | grep -A 6 "Server certificate"
   ```

4. **Test security headers:**
   ```bash
   curl -I https://byurhannurula.com | grep -E "(X-Frame|X-Content|Strict-Transport|X-XSS)"
   ```

## Step 4: Setup Auto-Updates (Optional)

### 4.1 Create Update Script

```bash
cat > ~/apps/portfolio/update.sh << 'EOF'
#!/bin/bash
cd ~/apps/portfolio
docker compose pull
docker compose up -d --remove-orphans
docker image prune -f
EOF

chmod +x ~/apps/portfolio/update.sh
```

### 4.2 Setup Webhook for Auto-Deploy

You can use a simple webhook server or GitHub Actions with SSH deploy. Here's a basic approach using a cron job:

```bash
# Check for updates every 5 minutes
crontab -e
```

Add:
```
*/5 * * * * cd ~/apps/portfolio && docker compose pull -q && docker compose up -d --remove-orphans 2>&1 | logger -t portfolio-update
```

## Maintenance Commands

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app
docker compose logs -f nginx
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart app
```

### Update Application

```bash
cd ~/apps/portfolio
docker compose pull
docker compose up -d --remove-orphans
docker image prune -f
```

### Renew SSL Certificate

Certificates auto-renew via the certbot container. To manually renew:

```bash
docker compose exec certbot certbot renew
docker compose restart nginx
```

### Backup

```bash
# Backup environment and certificates
tar -czvf portfolio-backup-$(date +%Y%m%d).tar.gz \
  .env.production \
  certbot/conf
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs app

# Check if port is in use
sudo lsof -i :80
sudo lsof -i :443
```

### SSL certificate issues

```bash
# Check certificate status
docker compose exec certbot certbot certificates

# Force renewal
docker compose exec certbot certbot renew --force-renewal
```

### Application errors

```bash
# Enter container
docker compose exec app sh

# Check Next.js logs
docker compose logs -f app
```

### Nginx configuration errors

```bash
# Test nginx config
docker compose exec nginx nginx -t

# Reload nginx
docker compose exec nginx nginx -s reload
```

## GitHub Actions Secrets

Set these in your GitHub repository settings (Settings → Secrets and variables → Actions):

### Repository Secrets
- `UPSTASH_REDIS_REST_URL` - For CI build tests
- `UPSTASH_REDIS_REST_TOKEN` - For CI build tests

### Repository Variables
- `NEXT_PUBLIC_BASE_URL` - `https://byurhannurula.com`
- `NEXT_PUBLIC_UMAMI_SRC` - Your Umami script URL
- `NEXT_PUBLIC_UMAMI_ID` - Your Umami site ID

## Security Checklist

- [ ] SSH key authentication only (disable password auth)
- [ ] Firewall enabled (UFW)
- [ ] Fail2ban installed
- [ ] Non-root user for deployment
- [ ] SSL/TLS enabled with auto-renewal
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Regular system updates

## Performance Tips

1. **Enable swap** (if low memory VM):
   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   ```

2. **Monitor resources**:
   ```bash
   docker stats
   htop
   ```

3. **Clean up Docker**:
   ```bash
   docker system prune -af --volumes
   ```
