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
