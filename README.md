# Telemora - A Marketplace Frontend Built with Next.js

## Overview

Telemora is a Telegram Mini App providing a seamless marketplace experience. Built with **Next.js**,
**React Query**, and **TailwindCSS**, it allows users to browse products, manage orders, create
stores, and process payments using **TON Connect**.

This project is designed as the frontend for the **Telemora API**, integrating authentication,
product management, order processing, and payment handling.

---

## Features

- **User Authentication** via Telegram
- **Store & Product Management** for sellers
- **Order Processing** and status tracking
- **Payments via TON Connect**
- **Product Reviews & Ratings**
- **Real-time Data Fetching** with React Query
- **Responsive UI** optimized for Telegram Mini Apps

---

## Tech Stack

- **Next.js** - React-based framework for SSR & SSG
- **React Query** - Data fetching & state management
- **TON Connect** - Blockchain payments integration
- **TailwindCSS** - Utility-first styling
- **Hero UI** - Pre-built UI components
- **TanStack Query** - Server state management
- **Axios** - HTTP requests

---

## Project Structure

```
/app         # Main application pages
/components  # Reusable UI components
/context     # Global state management (User & Query Contexts)
/hooks       # Custom React hooks
/libs        # API services & helper functions
/types       # TypeScript types & enums
```

## API Integration

This frontend interacts with the **Telemora API** for data fetching and operations.
The API base URL is set via the `NEXT_PUBLIC_API_URL` environment variable.

---

## License

This project is licensed under the **MIT License**.
