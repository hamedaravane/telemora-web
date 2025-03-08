## **Implementation Guide for Market (Home) Page in Next.js 14**

### **Introduction**
This document provides a standardized implementation guide for frontend developers working on the **Market (Home) Page** in a mobile-only web application using **Next.js 14**. This page serves as the **entry point** for users when they open the app, providing a seamless and engaging **product & store discovery** experience.

Since **personalized recommendations and AI-driven features** are not yet implemented, this **MVP version** will focus on **basic product discovery** while maintaining a high level of user engagement and conversion potential.

The backend is fully implemented, and API endpoints are available for retrieving basic product and store data.

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
- Ensure the page follows the directory structure (`app/market/page.tsx`).
- Import required models and types from the existing data layer.
- Fetch and display **basic product & store data**.

### **2. Available Data Structure**

#### **Product Data**
```ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  store: Store;
  productType: ProductType;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  reviews: Review[];
  downloadLink?: string;
  stock?: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### **Store Data**
```ts
export interface Store {
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

### **3. MVP Page Structure**

Since **advanced recommendation features** are not yet available, the page will rely on **static but effective product discovery mechanisms**:

#### **1. Search & Navigation Bar**
- A **search input** for finding products by name.
- Quick access to **order history & user profile**.

#### **2. Featured & Approved Products**
- Display a section of **approved & top-rated products** to ensure quality control.
- Show **newly added products** (sorted by `createdAt`).

#### **3. Category-Based Product Sections**
- Group **products by product type** (`PHYSICAL`, `DIGITAL`, `SERVICE`).
- Allow users to browse products **without needing advanced filtering**.

#### **4. Top-Rated Stores**
- Show a **horizontal scrollable list** of **high-reputation stores**.
- Display **store name, logo, and reputation score**.
- Clicking on a store leads to a **store details page** listing all its products.

#### **5. Recent Products**
- Show the **most recently added products** (sorted by `createdAt`).
- If stock is available, display a **"Low Stock" alert**.

#### **6. Basic Call-to-Actions**
- Encourage users to **browse categories**.
- Highlight **limited-time deals** (if manually curated by admin).
- Provide easy access to **popular stores**.

### **4. UI/UX Guidelines**
- Use **HeroUI** pre-built components for lists, product cards, and navigation.
- Implement **TailwindCSS** for styling.
- Maintain a **scroll-friendly and mobile-optimized layout**.
- Keep the **design simple** but **engaging enough to encourage exploration**.

### **5. MVP Limitations & Future Enhancements**
- No **personalized recommendations** (future AI-based recommendations can replace static sections).
- No **dynamic trending products** (can be added once backend analytics are available).
- No **wishlist or user-preferred products** (potential feature for later versions).

## **Conclusion**
By following this guide, frontend developers can ensure a **functional and engaging Market Page** that effectively allows users to explore products and stores in a structured and intuitive manner. Future iterations can expand on AI-driven recommendations and user preferences to enhance the experience further.

