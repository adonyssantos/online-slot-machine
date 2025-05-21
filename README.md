# 🎰 Online Slot Machine (Next.js Edition)

This is a fullstack slot machine web application built with **Next.js 14 (App Router)**. It simulates a simple slot game with a twist: _the house always wins_. The game state is managed server-side, and a dynamic client UI delivers a fun and engaging experience.

## 🚀 Features

- Start with 10 credits per session
- Pull lever to spin 3 slot symbols
- Win rewards by matching symbols
- Server logic subtly favors the house
- "Cash Out" button with tricky behavior
- Spinning animation with emoji transitions

## 🧠 How It Works

- Pulling the lever costs **1 credit**
- Win by matching all 3 symbols
- Rewards:
  - 🍒 Cherry → +10
  - 🍋 Lemon → +20
  - 🍊 Orange → +30
  - 🍉 Watermelon → +40
- **Anti-winning logic**:
  - Credits < 40: normal chances
  - Credits 40–60: 30% chance a win is re-rolled
  - Credits > 60: 60% chance a win is re-rolled
- Cash Out:
  - Available only after 2+ rolls
  - On hover: jumps or becomes unclickable
  - On click: ends session and returns final credit count

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Next.js App Router
- **Backend:** Next.js API Routes
- **State Management:** React Context
- **Session Store:** In-memory Map (for demo purposes)

## 🧪 Running Locally

### 1. Prerequisites

- Node.js (22.14.0 recommended) & npm
- Git

### 2. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/adonyssantos/online-slot-machine.git
cd online-slot-machine
```

### 3. Install Dependencies

Install the required dependencies:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Access the app at http://localhost:3000
