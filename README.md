# Telemart - A Marketplace Frontend Built with Next.js

## Overview

Telemart is a Telegram Mini App providing a seamless marketplace experience. Built with **Next.js**, **React Query**, and **TailwindCSS**, it allows users to browse products, manage orders, create stores, and process payments using **TON Connect**.

This project is designed as the frontend for the **Telemart API**, integrating authentication, product management, order processing, and payment handling.

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

---

## Key Modules

### Authentication

- Telegram login using `@twa-dev/sdk`
- User context (`/context/user-context.tsx`)
- Profile management

### Marketplace (Stores & Products)

- List, search, and filter products (`/app/market/page.tsx`)
- Store creation & management (`/app/store/create/page.tsx`)
- Product creation & editing (`/app/product/create/page.tsx`)

### Orders & Payments

- View user orders (`/app/orders/page.tsx`)
- Order details (`/app/orders/[id]/page.tsx`)
- Payment processing via TON (`/app/orders/[id]/payment/page.tsx`)

### Reviews & Ratings

- Submit product reviews (`/app/product/[id]/page.tsx`)
- Rate products & manage reviews

---

## API Integration

This frontend interacts with the **Telemart API** for data fetching and operations.

| Feature         | Endpoint Example |
|----------------|-----------------|
| User Auth      | `/users/login` |
| Fetch Products | `/products` |
| Order Creation | `/orders` |
| Payments       | `/payments` |
| Reviews        | `/reviews` |

The API base URL is set via the `NEXT_PUBLIC_API_URL` environment variable.

---

## License

This project is licensed under the **MIT License**.

---

## **How to Contribute to the Telemart App Project on GitHub**

### **Step 1: Fork the Repository**

1. Open the [Telemart App GitHub repository](https://github.com/hamedaravane/telemart-app).
2. Click the "Fork" button in the top right corner of the page. This will create a copy of the
   repository under your GitHub account.

### **Step 2: Clone the Forked Repository**

1. Open a terminal or command prompt.
2. Run the following command to clone your forked repository to your local machine:

   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/telemart-app.git
   ```

   Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

3. Navigate to the project directory:
   ```sh
   cd telemart-app
   ```

### **Step 3: Add the Original Repository as an Upstream**

To keep your local copy updated with the latest changes from the main repository, add an upstream
remote:

```sh
git remote add upstream https://github.com/hamedaravane/telemart-app.git
```

### **Step 4: Create a New Branch**

Before making any changes, create a new branch based on the latest main branch:

```sh
git checkout main
git pull upstream main  # Ensures you have the latest code
git checkout -b feature-branch-name
```

Replace `feature-branch-name` with a meaningful name related to your changes, such as
`fix-login-bug` or `add-user-profile`.

### **Step 5: Make Your Changes**

1. Open the project in your preferred code editor.
2. Implement the necessary changes, fixes, or new features.
3. Save your changes and test them properly.

### **Step 6: Commit Your Changes**

After making and testing your changes, commit them with a clear message:

```sh
git add .
git commit -m "Brief description of the change"
```

Follow best practices for commit messages:

- Use present tense: "Add user authentication" instead of "Added user authentication."
- Keep messages concise but descriptive.

### **Step 7: Push Your Branch to GitHub**

Once your changes are committed, push your new branch to your GitHub fork:

```sh
git push origin feature-branch-name
```

### **Step 8: Create a Pull Request**

1. Go to your forked repository on GitHub.
2. You will see a prompt to create a pull request after pushing your branch. Click on it.
3. Make sure the base repository is `hamedaravane/telemart-app` and the base branch is `main`.
4. Add a clear title and description of your changes.
5. Click "Create Pull Request."

### **Step 9: Wait for Review and Respond to Feedback**

1. The repository owner (or maintainers) will review your pull request.
2. If any changes are requested, update your branch accordingly:
   ```sh
   git checkout feature-branch-name
   git add .
   git commit -m "Address review feedback"
   git push origin feature-branch-name
   ```
3. Once approved, the changes will be merged into the main repository.

### **Step 10: Keep Your Fork Updated**

After your pull request is merged, keep your fork updated with the latest changes:

```sh
git checkout main
git pull upstream main
git push origin main
```

This ensures that your fork remains up to date for future contributions.
