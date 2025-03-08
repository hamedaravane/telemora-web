## **Implementation Guide for Store List Page in Next.js 14**

### **Introduction**
This document provides a standardized implementation guide for frontend developers working on the **Store List Page** in a mobile-only web application using **Next.js 14**. This page is accessible when users tap the **“Store” button** in the navigation bar and serves as the primary interface for managing store presence.

The backend is fully implemented, and API endpoints are available for retrieving store data.

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
- Ensure the page follows the directory structure (`app/stores/page.tsx`).
- Import required models and types from the existing data layer.
- Fetch store data from the backend API (`${API_BASE_URL}/stores`).

### **2. Store Data Structure**

Each store object contains the following attributes:

```ts
{
  id: number;
  name: string;
  logoUrl?: string;
  description?: string;
  category: StoreCategory;
  owner: User;
  admins: User[];
  products: Product[];
  orders: Order[];
  contactNumber?: string;
  email?: string;
  country?: Country;
  state?: State;
  city?: City;
  socialMediaLinks?: { [platform: string]: string };
  reputation: number;
  workingHours?: Record<string, { open: string; close: string }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
```

### **3. Store List Functionalities**
- **Displaying User-Owned Stores**
    - If the user owns stores, display them as a **clickable list**.
    - Each store should display **name, logo, and category** for clarity.
    - Clicking on a store navigates to its **detailed view**.

- **Handling No Stores Scenario**
    - If the user has no stores, display a **prominent “Create Store” button**.
    - Encourage users to set up their first store with a **clear CTA**.

- **Creating a New Store**
    - Regardless of whether the user owns a store, a **“New Store” button** should always be available.
    - This button should navigate users to the **Create Store Page**.

### **4. UI/UX Considerations**
- Keep the store list **minimalistic and clear**.
- Use **HeroUI components** for UI consistency.
- Ensure a **clean, user-friendly design** that simplifies navigation.
- The layout should avoid **overwhelming the user with excessive information**.
- Maintain **semantic HTML** for accessibility.

### **5. Implementation Guidelines**
- Fetch **store data from the API** asynchronously.
- Display **loading states** while fetching data.
- Implement **error handling** for API failures.
- Optimize API calls using **React Query or SWR**.
- Ensure TypeScript (`.tsx`) code is **clean and maintainable**.

## **Conclusion**
By following this guide, frontend developers can ensure an **efficient and user-friendly Store List Page** that simplifies store management while maintaining a clean and structured UI. Future iterations can introduce **enhanced analytics and store performance tracking** to improve user engagement.

