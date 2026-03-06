# youtube-viral-clipper
AI-powered YouTube clip generator with viral moment detection... Vibe codded
 🎬 YouTube Viral Clipper

An AI-powered automation platform that monitors YouTube channels, detects viral moments, and generates vertical clips optimized for TikTok, YouTube Shorts, and Instagram Reels.

**Created by Wuike and Wuikewrite**

---

## ✨ Features

### 🤖 Automated Processing Pipeline
- **RSS Monitoring**: Automatically detects new uploads from registered YouTube channels
- **AI Transcription**: Uses Whisper.cpp for accurate speech-to-text
- **Viral Detection**: Multi-signal algorithm combining sentiment analysis, audio peaks, and engagement markers
- **Smart Clipping**: Extracts 20-60 second clips with natural sentence boundaries
- **Vertical Formatting**: Auto-converts to 1080x1920 (9:16) for social media platforms
- **Queue Management**: Background workers process videos 24 hours after upload

### 💳 Subscription Tiers
- **Free Plan**: 4 hours of video processing, 1 channel
- **Semi-Annual ($25.99)**: Unlimited processing, 10 channels, 6 months
- **Annual ($49.99)**: Unlimited processing, 20 channels, 12 months
- **Admin (Unlimited)**: Full system access for administrators

### 👑 Admin Dashboard
- Real-time user management and analytics
- Processing queue monitoring
- Subscription revenue tracking
- System health diagnostics
- Database access controls

### 🔐 Security Features
- Argon2 password hashing
- Role-based access control (RBAC)
- JWT session management
- SQL injection protection via parameterized queries
- Admin-only endpoints with secret token authentication

---## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: TanStack Query (React Query)
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: Custom auth system with Argon2
- **API Routes**: Next.js API handlers

### Video Processing
- **Download**: yt-dlp
- **Transcription**: Whisper.cpp
- **Video Editing**: FFmpeg
- **Storage**: Google Drive API (ready for integration)

---## 📋 Prerequisites

### Development
- Node.js 18+ and npm/yarn
- PostgreSQL database (or Neon account)
- Git

### Production (VPS Deployment)
- Ubuntu/Debian VPS (Hostinger recommended)
- FFmpeg installed
- yt-dlp installed
- Whisper.cpp compiled
- Cron job access

---

## 🚀 Installation

### 1. Clone the Repository 
bash
git clone https://github.com/YOUR-USERNAME/youtube-viral-clipper.git
cd youtube-viral-clipper

code


### 2. Install Dependencies
bash
npm install

code


### 3. Environment Variables

Create a `.env.local` file in the root directory:
env

Database
DATABASE_URL=postgresql://user:password@host:5432/database

Authentication
AUTH_SECRET=your-super-secret-auth-key-here
AUTH_URL=http://localhost:3000

Worker Security
WORKER_SECRET=change-this-secret-in-production

Optional: Temporary directory for processing
TEMP_DIR=/tmp/viral-clipper

code


### 4. Initialize Admin Account

1. Start the development server:
bash
npm run dev

code


2. Visit: `http://localhost:3000/admin/init`

3. Click "Initialize Admin Account"

4. Sign in with:
   - **Email**: `michaelazubuike.MA@gmail.com`
   - **Password**: `ShadowBackDoor@72`

### 5. Run the Application
bash
npm run dev

Application runs on http://localhost:3000
code


---

## 🖥️ Production Deployment (Hostinger VPS)

### Step 1: Install System Dependencies
bash

Update system
sudo apt update && sudo apt upgrade -y

Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

Install FFmpeg
sudo apt install -y ffmpeg

Install yt-dlp
sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp

Install Whisper.cpp
cd /opt
sudo git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
sudo make

Download Whisper base model
sudo bash ./models/download-ggml-model.sh base

code


### Step 2: Deploy Application
bash

Clone repository
cd /var/www
sudo git clone https://github.com/YOUR-USERNAME/youtube-viral-clipper.git
cd youtube-viral-clipper

Install dependencies
npm install

Build for production
npm run build

Install PM2 for process management
sudo npm install -g pm2

Start application
pm2 start npm --name "viral-clipper" -- start

Enable PM2 on system boot
pm2 startup
pm2 save

code


### Step 3: Configure Cron Jobs

Edit crontab:
bash
crontab -e

code


Add these lines:
bash

RSS Monitor - Runs every hour
0 * * * * curl -X GET "https://your-domain.com/api/worker/monitor" -H "x-worker-secret: YOUR_SECRET" >> /var/log/viral-clipper-monitor.log 2>&1

Video Processor - Runs every 15 minutes
*/15 * * * * curl -X POST "https://your-domain.com/api/worker/process" -H "x-worker-secret: YOUR_SECRET" >> /var/log/viral-clipper-process.log 2>&1

code


---

## 🎯 Viral Detection Algorithm

The system scores clips based on multiple signals:

### Text Analysis
- **Excitement keywords**: "wow", "amazing", "incredible" (+1.5 each)
- **Humor markers**: "haha", "funny", "hilarious" (+2.0 each)
- **Conflict indicators**: "versus", "fight", "challenge" (+1.8 each)
- **Surprise words**: "unexpected", "wait", "what" (+1.2 each)

### Structural Features
- **Punctuation intensity**: Exclamation marks (+0.8), questions (+0.5)
- **All-caps words**: Emphasis detection (+0.7 each)
- **Optimal length**: 40-100 words (+1.0 bonus)

Clips are scored 0-10 and ranked. Top 5-10 clips per video are extracted.

---

## 📁 Project Structure
youtube-viral-clipper/
├── apps/
│   └── web/
│       └── src/
│           ├── app/
│           │   ├── account/      # Auth pages
│           │   ├── admin/        # Admin dashboard
│           │   ├── api/          # Backend routes
│           │   ├── dashboard/    # User dashboard
│           │   └── pricing/      # Pricing page
│           └── components/       # React components
├── README.md
├── LICENSE
└── .gitignore

---
## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔮 Roadmap

- [ ] Google Drive integration for clip storage
- [ ] Stripe payment processing
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support

----

**Built with ❤️ by Wuike and Wuikewrite**

© 2026 YouTube Viral Clipper Created by Wuike and Wuikewrite. All rights reserved.
