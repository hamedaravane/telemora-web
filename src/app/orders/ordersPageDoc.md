## **Implementation Guide for Orders Page in Next.js 14**

### **Introduction**

This document provides a standardized implementation guide for frontend developers working on the **Orders Page** of a
mobile-only web application using **Next.js 14**. The backend is fully implemented, API endpoints are available, and
models, project structure, and directory setup (including `page.tsx` files) are already established.

This page is designed to allow users to track their purchases and manage their orders. Since our platform operates as a
**marketplace**, users may have both **buyer** and **seller** roles. However, this document focuses on the **buyer’s
perspective**, ensuring a seamless experience for tracking order status, payments, and shipments.

## **General Guidelines**

- Use **Next.js 14 App Router** for optimal routing and performance.
- Ensure a **mobile-first responsive design**.
- Follow accessibility best practices (**ARIA attributes, semantic HTML, proper contrast ratios**).
- Utilize **server-side rendering (SSR)** or **static site generation (SSG)** when applicable.
- Implement a **modular component-based approach**.
- Use **HeroUI components** wherever possible and rely on **TailwindCSS** for custom styling.
- **Do not use raw CSS files**; styling should be handled through HeroUI or TailwindCSS.

## **Page Implementation Checklist**

### **1. Page Initialization**

- Ensure each page follows the defined directory structure (`src/app/orders/page.tsx`).
- Import required models and types from the existing data layer.
- If needed, set up dynamic parameters using Next.js **dynamic routing**.

### **2. Fetching Data**

- Use **`fetch` in Server Components** for initial data fetching.
- Use **React Query** for Client Components to manage API calls efficiently.
- Implement **pagination, filtering, or infinite scrolling** when handling large datasets.

### **3. Loading & Skeleton States**

- Use `loading.tsx` to manage automatic loading states in the `app` directory.
- Implement **skeleton loaders** for a smoother user experience.
- Avoid blocking UI interactions while fetching data.

### **4. Error Handling**

- Implement structured error handling using `error.tsx`.
- Display **meaningful error messages** with retry options where applicable.
- Log API errors properly for debugging.

### **5. Labels & Text Management**

- Store static labels in a centralized file (`constants.ts`).
- Ensure text follows **UX writing guidelines**.
- Support multiple languages where applicable.

### **6. Order Data Structure**

The server provides order data in the following format:

```ts
export interface Order {
  id: number;
  buyer: User;
  store: Store;
  status: OrderStatus;
  items: OrderItem[];
  shipment: OrderShipment;
  payment: Payment;
  totalAmount: number;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface OrderShipment {
  id: number;
  trackingNumber: string;
  courierService: string;
  deliveryEstimate: Date;
  shippedAt: Date;
}

export interface Payment {
  id: string;
  paymentId: string;
  order: Order;
  user: User;
  amount: string;
  status: PaymentStatus;
  transactionHash: string;
  fromWalletAddress: string;
  toWalletAddress: string;
  gasFee: string;
  commission: string;
}
```

### **7. Page Structure & Features**

#### **Order List View**

- Display all orders in a **list format**, grouped by their **OrderStatus**.
- Show essential details: **Order ID, Store Name, Total Amount, Order Date**.
- Allow users to expand an order for **more details** (payment & shipment info).

#### **Order Status Tracking**

- Use **color-coded badges** for different statuses (e.g., "Pending" in yellow, "Shipped" in blue).
- Provide a **progress indicator** for orders moving through multiple stages.
- Display estimated resolution timelines for delayed orders.

#### **Shipment Tracking**

- Show shipment details:
    - **Courier service name**
    - **Tracking number** (clickable link if available)
    - **Estimated delivery date**
- Allow users to track their package via the courier’s website.

#### **Payment Status**

- Clearly display **payment status** (Pending, Processing, Completed, etc.).
- If payment is **Pending**, provide an option for the user to complete the transaction.
- Show transaction details such as:
    - **Transaction hash** for blockchain payments.
    - **Wallet addresses** for transparency.
    - **Commission fees** applied.

#### **Order Actions**

- Users should be able to:
    - **View full order details**.
    - **Make a payment** (if an order is unpaid).
    - **Cancel an order** (if platform rules allow it).
    - **Report an issue** with an order.

### **8. State Management**

- Prefer **local state (`useState`)** for UI-based changes.
- Use **Zustand** for global state management.
- Optimize API calls by using **SWR or React Query**.
- Avoid unnecessary re-renders by memoizing values with `useMemo` and `useCallback`.

### **9. Performance Optimization**

- Optimize images using **Next.js `<Image>`**.
- Implement **lazy loading** for images and non-critical components.
- Use **code-splitting and dynamic imports**.
- Prefetch data where applicable.

### **10. Animations & UI Interactions**

- Use **Framer Motion** for fluid animations where necessary.
- Ensure animations are **accessible** (e.g., respect reduced motion preferences).

### **11. SEO & Metadata**

- Implement Open Graph and Twitter Card metadata.
- Use **structured data (`JSON-LD`)** where applicable.

### **12. Security Best Practices**

- Sanitize and validate all user inputs.
- Implement proper **authentication and authorization** mechanisms.
- Use **secure cookies, HTTP headers, and HTTPS**.
- Follow best practices for **handling user data and API calls**.

## **Conclusion**

By following this guide, frontend developers can ensure a **consistent, maintainable, and performance-optimized**
implementation of the Orders Page in **Next.js 14**. Always refer to the latest Next.js documentation and
project-specific requirements when implementing new features.

