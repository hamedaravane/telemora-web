## **Implementation Guide for Create Product Page in Next.js 14**

### **Introduction**
This document provides a standardized implementation guide for frontend developers working on the **Create Product Page** in a mobile-only web application using **Next.js 14**. This page is designed for **store owners** to add new products to their store, ensuring a seamless and efficient product creation experience.

The backend is fully implemented, and API endpoints are available for submitting product data.

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
- Ensure the page follows the directory structure (`app/create-product/page.tsx`).
- Import required models and types from the existing data layer.
- Set up dynamic form fields based on product type.

### **2. Product Data Structure**

The submitted product data follows the structure below:

```ts
export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  productType: ProductType;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}

export interface CreateProductAttributeDto {
  attributeName: string;
  attributeValue: string;
}

export interface CreateProductVariantDto {
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}
```

### **3. Required Fields**
To create a product, the user must provide:
- **Product name**
- **Price** (in TON cryptocurrency)
- **Brief description**
- **Product image**
- **Product type** (which affects additional fields)

### **4. Product Types & Dynamic Fields**
The product type significantly impacts the user’s form experience:

```ts
export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}
```

- **Physical products** require **stock management**.
- **Digital products** must include a **download link**.
- **Services** may not require stock or digital delivery options.

The UI should dynamically enable/disable form fields based on the selected product type.

### **5. Attributes & Variants**
- Users can add **attributes** (e.g., color, size) and **variants** (e.g., different sizes with different prices).
- The form should provide an intuitive interface for store owners to define product options accurately.

### **6. Form & UX Considerations**
- Ensure **clear instructions** so sellers understand how to fill out each field.
- Implement **dynamic validation** to prevent errors (e.g., missing fields, incorrect formats).
- Provide **real-time feedback** to enhance user experience.
- The form should be **intuitive and easy to use**, reducing confusion for store owners.

### **7. UI/UX Guidelines**
- Use **HeroUI components** for form fields, buttons, and modals.
- Implement **TailwindCSS** for styling custom UI elements.
- Maintain a **minimal and clean** design focused on usability.
- Ensure a fully **mobile-optimized form layout**.

### **8. Additional Enhancements**
- **Auto-save Feature:** Save form progress in case of accidental navigation.
- **Image Preview:** Display an image preview before submission.
- **Success Notification:** Show a confirmation message once the product is successfully created.

## **Conclusion**
By following this guide, frontend developers can ensure a **seamless and user-friendly product creation experience** while optimizing usability for store owners. Always refer to the latest Next.js documentation and project-specific requirements when implementing new features.

