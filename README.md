<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00d4aa&height=200&section=header&text=ReturnIt&fontSize=80&fontColor=ffffff&fontAlignY=35&desc=Lost+and+Found+Portal&descAlignY=55&descSize=22&animation=fadeIn" width="100%"/>

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Space+Grotesk&size=22&duration=3000&pause=1000&color=00D4AA&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=60&lines=Lost+Something%3F+Found+Something%3F;We+Connect+You+%F0%9F%94%8D)](https://git.io/typing-svg)

<br/>

[![Live Demo](https://img.shields.io/badge/Live_App-Open_Now-00d4aa?style=for-the-badge&labelColor=060d1f)](https://heartfelt-cajeta-4226cf.netlify.app)
&nbsp;
[![Project Page](https://img.shields.io/badge/Project_Page-View-1a2d50?style=for-the-badge&labelColor=060d1f)](https://himani-aiml.github.io/returnit-lost-and-found)
&nbsp;
[![GitHub](https://img.shields.io/badge/Star_this_repo-060d1f?style=for-the-badge&labelColor=060d1f&logo=github)](https://github.com/himani-aiml/returnit-lost-and-found)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

---

## What is ReturnIt?

> Every day in schools, hospitals, and public spaces — people lose wallets, phones, ID cards, keys — with **no digital system** to report or search for them.

**ReturnIt** fixes that. It's a web portal where anyone can:
- Report a lost or found item in under a minute
- Search and browse all reported items in real time
- Let **Google Gemini AI** find the most likely matches automatically

No app download. No account needed. Just open and use.

---

## Features

<table>
<tr>
<td>

**Report Items**

Fill a quick form — item name, category, location, date, contact. Done.

</td>
<td>

**Smart Search**

Search by keyword, filter by category or Lost/Found type. Instant results.

</td>
</tr>
<tr>
<td>

**AI Matching**

Gemini API compares your item against everything reported and returns top 3 matches with a percentage score and reason.

</td>
<td>

**Works Everywhere**

Fully mobile responsive. Opens perfectly on any phone, tablet, or laptop.

</td>
</tr>
</table>

---

## The AI Matching — How It Works

```
User clicks "Find AI Matches" on any item
            ↓
Gemini API receives the item details
+ all other reported items
            ↓
AI compares: description, category,
location, date, synonyms
            ↓
Returns Top 3 Matches
with match % and plain-English reason
```

> **Example:** A "black leather wallet" can match a "dark brown card holder" — because Gemini understands context, not just keywords.

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| **Frontend** | React + TypeScript + Vite | Fast, modern, type-safe |
| **AI Engine** | Google Gemini API | Smart item matching |
| **UI Design** | Google Stitch | AI-assisted prototyping |
| **Code Gen** | Google AI Studio | Generated full codebase |
| **Storage** | localStorage | Zero backend, instant setup |
| **Hosting** | Netlify | Live in 30 seconds |
| **CLI Tool** | Antigravity (agy) | AI coding assistant |

---

## Item Categories

`Wallet` `Phone` `Keys` `Bag` `Laptop` `ID Card` `Clothing` `Electronics` `Other`

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/himani-aiml/returnit-lost-and-found
cd returnit-lost-and-found

# Install dependencies
npm install

# Add your Gemini API key
echo "VITE_GEMINI_API_KEY=your_key_here" > .env

# Start dev server
npm run dev
```

> Get your free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

---

## Project Structure

```
returnit/
├── src/
│   ├── components/
│   │   ├── Hero.tsx          ← Home hero + search
│   │   ├── ActionCards.tsx   ← Report Lost/Found buttons
│   │   ├── StatsRow.tsx      ← Live item counters
│   │   ├── ItemCard.tsx      ← Item display cards
│   │   ├── ReportForm.tsx    ← Lost and Found forms
│   │   ├── BrowseView.tsx    ← Search and filter page
│   │   └── DetailView.tsx    ← Item detail + AI match
│   ├── App.tsx               ← Main routing
│   ├── types.ts              ← TypeScript types
│   └── mockData.ts           ← Sample data
├── index.html
└── package.json
```

---

## Live Links

| | |
|---|---|
| **Live App** | https://heartfelt-cajeta-4226cf.netlify.app |
| **Project Page** | https://himani-aiml.github.io/returnit-lost-and-found |
| **GitHub** | https://github.com/himani-aiml/returnit-lost-and-found |

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00d4aa&height=100&section=footer" width="100%"/>

**Built by Himani** · DAV Institute of Engineering and Technology · CSE

*If this helped you, drop a star on the repo!*

</div>
