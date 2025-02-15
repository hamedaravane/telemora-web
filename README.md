# Telemart - Telegram Mini App

## Overview

Telemart is a Telegram Mini App that provides a seamless marketplace experience. Users can browse products, manage their orders, create stores, and handle payments through the TON blockchain. The app is built with Next.js, React, and Tailwind CSS, and integrates Telegram's WebApp API for authentication.

## Features

- **User Authentication**: Automatically fetches and manages Telegram user data.
- **Product Management**: Allows users to create, update, and delete products.
- **Marketplace**: Displays products from various stores.
- **Order Management**: Users can place, track, and manage their orders.
- **Payments**: Integrates with TON blockchain for secure transactions.
- **Store Creation**: Enables users to create and manage their own stores.
- **Reviews & Ratings**: Allows buyers to leave feedback on purchased products.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API, React Query
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Authentication**: Telegram WebApp API
- **Blockchain**: TON blockchain for payment handling

## Installation

### Prerequisites

- Node.js (>=16.x)
- Yarn or npm

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/hamedaravane/telemart-app.git
   cd telemart-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file and configure the necessary environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

### User Authentication
- Uses Telegram WebApp API to fetch user details.

### Products
- CRUD operations for managing products.
- Supports digital, physical, and service-based products.

### Orders
- Users can place orders and track status.
- Orders contain multiple items with product references.

### Payments
- Integration with TON blockchain for seamless payments.

### Reviews
- Buyers can leave ratings and comments for products.

## License

This project is licensed under the MIT License.

