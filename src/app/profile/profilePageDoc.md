## **Implementation Guide for User Profile Page in Next.js 14**

### **Introduction**

This document provides a standardized implementation guide for frontend developers working on the **User Profile Page**
in a mobile-only web application using **Next.js 14**. This page allows users to **view and update their personal
information and account settings**. However, since this is a **Telegram Mini App**, some user data is retrieved directly
from Telegram and cannot be modified.

The backend is fully implemented, and API endpoints are available for retrieving and updating user data.

## **General Guidelines**

- Use **Next.js 14 App Router** for optimal routing and performance.
- Ensure **mobile-first responsive design**.
- Follow accessibility best practices (**ARIA attributes, semantic HTML, proper contrast ratios**).
- Utilize **server-side rendering (SSR)** or **static site generation (SSG)** when applicable.
- Implement a **modular component-based approach**.
- Use **HeroUI components** wherever possible.
- **Do not use raw CSS files**; styling should be handled through HeroUI or TailwindCSS.

## **Page Implementation Checklist**

### **1. Page Initialization**

- Ensure the page follows the directory structure (`app/profile/page.tsx`).
- Import required models and types from the existing data layer.
- Load user data from Telegram and the backend API.

### **2. Fetching User Data**

- Use **Server Components** to fetch user data on initial load.
- Use **React Query** for Client Components to manage user updates efficiently.
- Ensure that **immutable Telegram-provided data** is displayed but not editable.

### **3. User Data Structure**

The user data model contains the following attributes:

```ts
{
    id: number;
    telegramId: string;
    firstName: string;
    lastName ? : string;
    username ? : string;
    languageCode ? : string;
    hasTelegramPremium ? : boolean;
    photoUrl ? : string;
    phoneNumber ? : string;
    email ? : string;
    role: UserRole;
    walletAddress ? : string;
    country ? : Country;
    state ? : State;
    city ? : City;
    orders: Order[];
    reviews: Review[];
    stores: Store[];
    payments: Payment[];
    createdAt: Date;
}
```

### **4. Editable User Data**

Users can modify the following profile details:

```ts
export interface UpdateContactLocationDto {
    phoneNumber: string;
    email: string;
    countryId: number;
    stateId: number;
    cityId: number;
}

export interface UpdateLanguageDto {
    languageCode: string;
}

export interface UpdateProfileDto {
    firstName?: string;
    lastName?: string;
}
```

Each update corresponds to a separate API endpoint, and the UI must guide the user intuitively through the modification
process.

### **5. UI/UX Guidelines**

- Use **HeroUI components** for form fields, buttons, and lists.
- Implement **TailwindCSS** for styling custom UI elements.
- Maintain a **minimal and clean** design focused on usability.
- Ensure every feature is **mobile-friendly and intuitive**.
- Provide clear **error messages and success notifications** when updating profile details.

### **6. Profile Features**

- Users can edit only **specific fields**, while Telegram-managed fields remain read-only.
- The profile page should include easy access to:
    - **Terms & Conditions**
    - **FAQ (Frequently Asked Questions)**
    - **Privacy Policy**
- Display the **current app version** to inform users about updates and improvements.

### **7. Additional Enhancements**

- **Dark Mode Support**: Ensure the profile page adapts to dark mode settings.
- **Profile Picture Display**: Fetch and display the **Telegram profile picture**.
- **Logout Option**: Provide a logout button if applicable.

## **Conclusion**

By following this guide, frontend developers can ensure a **seamless and user-friendly profile management experience**
while adhering to the constraints of the Telegram Mini App. Always refer to the latest Next.js documentation and
project-specific requirements when implementing new features.