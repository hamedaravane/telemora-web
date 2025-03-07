## **Implementation Guide for Order Details Page in Next.js 14**

### **Introduction**

This document provides a standardized implementation guide for frontend developers working on the **Order Details Page**
of a mobile-only web application using **Next.js 14**. This page is **business-critical**, as it facilitates the *
*payment process** and contributes to revenue generation through **sales commissions**.

The primary goal of this page is to **encourage users to complete their payment** while providing clear information
about the order's status. The backend is fully implemented, and API endpoints are available for seamless integration.

## **General Guidelines**

- Use **Next.js 14 App Router** for optimal routing and performance.
- Ensure **mobile-first responsive design**.
- Follow accessibility best practices (**ARIA attributes, semantic HTML, proper contrast ratios**).
- Utilize **server-side rendering (SSR)** or **static site generation (SSG)** when applicable.
- Implement a **modular component-based approach**.
- Use **HeroUI components** for consistency in UI.
- **Do not use raw CSS files**; all styling should be handled through HeroUI or TailwindCSS.

## **Page Implementation Checklist**

### **1. Page Initialization**

- Ensure each page follows the defined directory structure (`src/app/orders/[id]/page.tsx`).
- Import required models and types from the existing data layer.
- Set up dynamic parameters using Next.js **dynamic routing**.

### **2. Fetching Data**

- Use **`fetch` in Server Components** for initial data fetching.
- Use **React Query** for Client Components to manage API calls efficiently.
- Implement **real-time updates** on payment status.

### **3. Loading & Skeleton States**

- Use `loading.tsx` to manage automatic loading states in the `app` directory.
- Implement **skeleton loaders** for a smoother user experience.
- Avoid blocking UI interactions while fetching data.

### **4. Error Handling**

- Implement structured error handling using `error.tsx`.
- Display **meaningful error messages** with retry options where applicable.
- Log API errors properly for debugging.

### **5. Order Data Structure**

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

### **6. Payment Flow**

- If an order **has not been paid**, display a **prominent "Pay Now" button**.
- The user is redirected to **Ton Wallet** to approve the transaction.
- The payment request is sent to the server:

```ts
export interface CreatePaymentDto {
    orderId?: string;
    amount: string;
    fromWalletAddress?: string;
    toWalletAddress?: string;
    transactionHash?: string;
    gasFee?: string;
    commission?: string;
}
```

- The server verifies the payment, updates the order, and confirms the transaction.

### **7. Order Status Tracking**

- Display **color-coded status badges** for order processing.
- If the order **is being shipped**, show:
    - **Courier service name** & **tracking number**.
    - **Estimated delivery date**.
    - A clickable **tracking link**.

### **8. UI/UX Guidelines**

- Use **HeroUI components** for status indicators, buttons, and modals.
- Implement **TailwindCSS** for custom UI elements.
- Ensure **mobile responsiveness** with a clean checkout experience.
- Provide **real-time updates** on payment and order processing.

### **9. Additional Enhancements**

- **Push Notifications:** Alert users if payment is pending for too long.
- **Progress Tracker:** Display a visual timeline of order status.
- **Auto-refreshing Status:** Fetch updated payment status dynamically.

## **Conclusion**

By following this guide, frontend developers can ensure a **seamless checkout experience**, enhancing user engagement
and revenue generation. Always refer to the latest Next.js documentation and project-specific requirements when
implementing new features.

