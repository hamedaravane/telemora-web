# Telemora

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React Query](https://img.shields.io/badge/React%20Query-latest-ff4154)](https://tanstack.com/query/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-latest-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#LICENSE)

> A sophisticated Telegram Mini App marketplace built with modern web technologies

## 🌟 Overview

Telemora is a cutting-edge Telegram Mini App that delivers a seamless marketplace experience.
Powered by **Next.js**, **React Query**, and **TailwindCSS**, it enables users to browse products,
manage orders, create stores, and process payments using **TON Connect**.

This project serves as the frontend interface for the **Telemora API**, providing robust integration
for authentication, product management, order processing, and payment handling.

### 🔌 API Integration

This frontend interacts with the **Telemora API** for data fetching and operations. The API base URL
is set via the `NEXT_PUBLIC_API_URL` environment variable.

## 🚀 Features

- **🔐 User Authentication** via Telegram
- **🏪 Store & Product Management** for sellers
- **📦 Order Processing** and status tracking
- **💳 Payments via TON Connect**
- **⭐ Product Reviews & Ratings**
- **🔄 Real-time Data Fetching** with React Query
- **📱 Responsive UI** optimized for Telegram Mini Apps

## 🛠️ Tech Stack

- **Next.js** - React-based framework for SSR & SSG
- **React Query** - Data fetching & state management
- **TON Connect** - Blockchain payments integration
- **TailwindCSS** - Utility-first styling
- **Hero UI** - Pre-built UI components
- **TanStack Query** - Server state management
- **Axios** - HTTP requests

## ⚙️ Required Environment Variables

| Variable                             | Example Value              | Description                         |
|--------------------------------------|----------------------------|-------------------------------------|
| `NEXT_PUBLIC_API_URL`                | `https://api.telemora.com` | Base URL for API requests           |
| `NEXT_PUBLIC_TELEMORA_ADDRESS`       | `EQabc...`                 | TON wallet for marketplace treasury |
| `NEXT_PUBLIC_SMART_CONTRACT_ADDRESS` | `EQdef...`                 | TON smart contract payment address  |
| `NEXT_PUBLIC_COMMISSION_PERCENTAGE`  | `2.5`                      | Platform fee as a percentage        |

## 📁 Project Structure

```
/app         # Main application pages
/components  # Reusable UI components
/context     # Global state management (User & Query Contexts)
/hooks       # Custom React hooks
/libs        # API services & helper functions
/types       # TypeScript types & enums
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/hamedaravane/telemora-web.git
   cd telemora-web
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Development

1. Start the development server

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build

1. Create a production build

   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm start
   ```

## 📄 License

**This is NOT open source.**  
All rights to this code are reserved by Hamed Arghavan.  
This repository is shared for collaboration purposes only. Unauthorized use or reproduction is
strictly prohibited.
