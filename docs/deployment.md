# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier is sufficient)
- Repository pushed to GitHub

### Initial Setup

1. **Push to GitHub**:
\`\`\`bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/eincode.git
git push -u origin main
\`\`\`

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: **Next.js**
     - Root Directory: `./` (default)
     - Build Command: `pnpm build` (or leave default)
     - Output Directory: `.next` (default)
     - Install Command: `pnpm install`

3. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Environment Variables

If you add environment variables later:

\`\`\`env
# .env.local (local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_URL=https://github.com/ehsanghaffar
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/ehsanghaffar
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/ehsanghaffar
\`\`\`

Add to Vercel:
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add each variable
4. Redeploy

### Custom Domain

1. **Add domain in Vercel**:
   - Project Settings → Domains
   - Add your domain (e.g., `eindev.ir`)

2. **Update DNS**:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Or A record: `@` → `76.76.21.21`

3. **Wait for SSL**:
   - Vercel automatically provisions SSL certificate
   - Usually takes 5-10 minutes

### Automatic Deployments

Every push to `main` triggers a new deployment:

\`\`\`bash
git add .
git commit -m "Update content"
git push
# Vercel automatically deploys ✨
\`\`\`

Preview deployments for branches:
\`\`\`bash
git checkout -b feature/new-page
git push origin feature/new-page
# Vercel creates preview URL
\`\`\`

## Self-Hosting (Advanced)

### Docker Deployment

1. **Create Dockerfile**:
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm
RUN npm install -g pnpm

# Build
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

2. **Update next.config.mjs**:
\`\`\`javascript
const nextConfig = {
  output: 'standalone',  // Add this for Docker
  // ... rest of config
}
\`\`\`

3. **Build and run**:
\`\`\`bash
# Build image
docker build -t eincode .

# Run container
docker run -p 3000:3000 eincode
\`\`\`

### VPS Deployment (DigitalOcean, AWS, etc.)

#### Prerequisites
- Ubuntu 22.04 server
- Domain pointing to server IP
- SSH access

#### Setup

1. **Install Node.js & pnpm**:
\`\`\`bash
# SSH into server
ssh user@your-server-ip

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Verify
node --version
pnpm --version
\`\`\`

2. **Clone repository**:
\`\`\`bash
cd /var/www
sudo git clone https://github.com/yourusername/eincode.git
cd eincode
\`\`\`

3. **Install dependencies & build**:
\`\`\`bash
pnpm install
pnpm build
\`\`\`

4. **Setup PM2 (process manager)**:
\`\`\`bash
# Install PM2
sudo npm install -g pm2

# Start app
pm2 start pnpm --name "eincode" -- start

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
\`\`\`

5. **Setup Nginx reverse proxy**:
\`\`\`bash
# Install Nginx
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/eincode
\`\`\`

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

\`\`\`bash
# Enable site
sudo ln -s /etc/nginx/sites-available/eincode /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
\`\`\`

6. **Setup SSL with Let's Encrypt**:
\`\`\`bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (already setup by certbot)
sudo certbot renew --dry-run
\`\`\`

### Updates

\`\`\`bash
# SSH into server
cd /var/www/eincode

# Pull latest
git pull origin main

# Rebuild
pnpm install
pnpm build

# Restart
pm2 restart eincode
\`\`\`

## Static Export (Not Recommended)

If you only need static site (no server features):

1. **Update next.config.mjs**:
\`\`\`javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Required for static export
  },
}
\`\`\`

2. **Build**:
\`\`\`bash
pnpm build
# Static files in `out/` directory
\`\`\`

3. **Deploy to any static host**:
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

**Note**: You lose server-side features:
- No API routes
- No ISR/revalidation
- No dynamic routing optimization
- No image optimization

## CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run lint
        run: pnpm lint
        
      - name: Build
        run: pnpm build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## Performance Optimization for Production

### 1. Enable Image Optimization
Remove `unoptimized: true` from config

### 2. Add Caching Headers (Nginx)
\`\`\`nginx
location /_next/static {
    alias /var/www/eincode/.next/static;
    expires 365d;
    add_header Cache-Control "public, immutable";
}

location /static {
    alias /var/www/eincode/public;
    expires 365d;
    add_header Cache-Control "public, immutable";
}
\`\`\`

### 3. Enable Compression (Nginx)
\`\`\`nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
\`\`\`

### 4. Add Security Headers
\`\`\`nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
\`\`\`

## Monitoring

### Vercel Analytics
Already configured via `@vercel/analytics`

### Self-Hosted Monitoring

1. **Install PM2 monitoring**:
\`\`\`bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
\`\`\`

2. **Setup Uptime Monitoring**:
   - Use [UptimeRobot](https://uptimerobot.com/) (free)
   - Or [BetterUptime](https://betteruptime.com/)

3. **Setup Error Tracking**:
   - Sentry
   - LogRocket
   - Rollbar

## Rollback Strategy

### Vercel
Click "Rollback" on previous deployment in Vercel dashboard

### Self-Hosted
\`\`\`bash
# View deployment history
pm2 list

# SSH into server
cd /var/www/eincode

# Checkout previous commit
git log --oneline  # Find commit hash
git checkout <commit-hash>

# Rebuild and restart
pnpm install
pnpm build
pm2 restart eincode
\`\`\`

## Backup Strategy

### Database (when added)
\`\`\`bash
# Automated daily backups
0 2 * * * /usr/bin/pg_dump eincode > /backups/eincode-$(date +\%Y\%m\%d).sql
\`\`\`

### Code
Always in Git - no additional backup needed

### Static Assets
\`\`\`bash
# rsync to backup server
rsync -avz /var/www/eincode/public/ backup-server:/backups/eincode-public/
\`\`\`

## Troubleshooting Deployment

### Build Fails on Vercel
\`\`\`bash
# Test build locally
pnpm build

# Check logs in Vercel dashboard
# Common issues:
# - TypeScript errors (if ignoreBuildErrors is removed)
# - Missing dependencies
# - Environment variables not set
\`\`\`

### 500 Error in Production
\`\`\`bash
# Check PM2 logs
pm2 logs eincode

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
\`\`\`

### Slow Performance
\`\`\`bash
# Check server resources
htop

# Restart app
pm2 restart eincode

# Clear Next.js cache
rm -rf .next/cache
pnpm build
pm2 restart eincode
\`\`\`

---

**Deployment Checklist**:
- [ ] All tests passing (when added)
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Backup strategy in place
