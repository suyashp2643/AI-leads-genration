# Golden City Sangamner — Lead Generation System
**Jaybhadra Builders** | AI-Powered Real Estate Lead Generation

---

## 📁 Project Structure

```
golden-city/
├── index.html          ← Main landing page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── chat.js         ← AI chatbot qualification flow
│   ├── leads.js        ← Lead scoring & dashboard
│   ├── templates.js    ← WhatsApp copy templates
│   └── main.js         ← Scroll animations & utilities
└── README.md
```

---

## 🚀 Deploy on GitHub + Vercel (Step by Step)

### STEP 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) → Sign in (or create free account)
2. Click **"New"** (green button, top left)
3. Repository name: `golden-city-sangamner`
4. Set to **Public**
5. Click **"Create repository"**

### STEP 2 — Upload Files to GitHub

**Option A — Upload via Browser (Easiest):**
1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop the entire `golden-city` folder
3. Write commit message: `Initial launch`
4. Click **"Commit changes"**

**Option B — Using Git (if you have Git installed):**
```bash
cd golden-city
git init
git add .
git commit -m "Initial launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/golden-city-sangamner.git
git push -u origin main
```

### STEP 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Find `golden-city-sangamner` → Click **"Import"**
4. Framework Preset: **"Other"** (it's plain HTML)
5. Click **"Deploy"**
6. ✅ Your site is live at: `golden-city-sangamner.vercel.app`

### STEP 4 — Custom Domain (Optional)

To use `goldencity.jaybhadrabuilders.com`:
1. In Vercel → Project → Settings → Domains
2. Add: `goldencity.jaybhadrabuilders.com`
3. In your domain registrar (GoDaddy/BigRock), add a CNAME record:
   - Name: `goldencity`
   - Value: `cname.vercel-dns.com`

---

## ✏️ How to Make Changes Later

1. Edit any file in your GitHub repo (click pencil icon)
2. Commit the change
3. ✅ Vercel auto-deploys in ~30 seconds — no manual work needed

---

## 📱 WhatsApp Business Setup

1. Download **WhatsApp Business** app on number `9130711811`
2. Go to Settings → Quick Replies
3. Add the 3 templates from the website (Hot / Warm / Cold)
4. Shortcut them as `/hot`, `/warm`, `/cold` for fast sending

---

## 📢 Google Ads Setup

**Campaign type:** Search  
**Target keywords:**
- flats in sangamner
- 2bhk sangamner
- new flats sangamner
- jaybhadra builders
- property in sangamner

**Landing page URL:** Your Vercel URL  
**Daily budget:** Start ₹300–500/day  
**Location targeting:** Sangamner + 30km radius + Nashik

---

## 🔧 Customization Guide

| What to change | Where |
|---|---|
| Property details / unit counts | `index.html` — units section |
| Colors / fonts | `css/style.css` — `:root` variables |
| Chat questions | `js/chat.js` — `CHAT_QUESTIONS` object |
| Lead scoring weights | `js/leads.js` — `calcLeadScore()` function |
| WhatsApp templates | `js/templates.js` — `WA_TEMPLATES` object |
| Phone number | Search `9130711811` in `index.html` |
| Hero background image | `css/style.css` — `.hero` background URL |

---

## 📞 Contact
Jaybhadra Builders · 132 K.V. Road, Sai Shraddha Chowk, Sangamner 422605  
📞 9130711811 · info@jaybhadrabuilders.com · jaybhadrabuilders.com
