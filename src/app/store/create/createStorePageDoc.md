## **Implementation Guide for Store Creation Flow in Next.js 14**

### **Introduction**
This document provides a standardized implementation guide for frontend developers working on the **Store Creation Flow** in a mobile-only web application using **Next.js 14**. Since store creation requires multiple inputs, the process is broken into **several steps** to enhance user experience and usability.

The backend is fully implemented, and API endpoints are available for handling each step of the store creation process.

## **General Guidelines**
- Use **Next.js 14 App Router** for optimal routing and performance.
- Ensure **mobile-first responsive design**.
- Follow accessibility best practices (**ARIA attributes, semantic HTML, proper contrast ratios**).
- Utilize **server-side rendering (SSR)** or **static site generation (SSG)** when applicable.
- Implement a **modular component-based approach**.
- Use **HeroUI components** wherever possible.
- **Do not use raw CSS files**; styling should be handled through HeroUI or TailwindCSS.

## **Page Implementation Checklist**

### **1. Flow Overview & Step Navigation**
- The flow consists of multiple steps to **simplify the user experience**.
- Users should be able to **navigate forward and backward** between steps without losing data.
- No data should be sent to the server until the final **Submit Store** action.

### **2. Step 1: Basic Information**
- The user fills in initial store details:

```ts
{
  name: string;
  description: string;
  contactNumber?: string;
  email?: string;
}
```

- Each field must be clearly labeled with guidance on expected input.
- A **“Next Step” button** advances the user to the next stage.

### **3. Step 2: Store Location (Optional but Recommended)**
- The user selects their store’s physical location:

```ts
{
  country?: number;
  state?: number;
  city?: number;
}
```

- The location selection follows a **dependent dropdown flow**:
    - **Country** selection enables **State** selection.
    - **State** selection enables **City** selection.
- UI should emphasize the benefits of providing this data.
- **Back** and **Next** buttons should be available.

### **4. Step 3: Store Category Selection**
- The user selects a **category** from predefined `StoreCategories`.
- Since the category list is extensive, selection must be **searchable and intuitive**.
- **Back** and **Next** buttons should be available.

### **5. Step 4: Store Working Hours (Optional)**
- The user sets **store opening and closing times** (if applicable):

```ts
workingHours?: Record<string, { open: string; close: string }>;
```

- Users should be informed that this **field is optional**.
- **Back** and **Next** buttons should be available.

### **6. Step 5: Store Logo Upload (Final Step)**
- The user uploads a **store logo**.
- The UI should display an **upload box or button** with clear instructions.
- After selecting an image:
    - A **modal** appears, allowing users to **crop the image to a square**.
    - The image should be **compressed and optimized** for web use.
- **Back** and **Submit Store** buttons should be available.

### **7. Important Considerations**
- No data is sent to the server until the final **Submit Store** button is pressed.
- Data is **persisted in state** throughout the flow to allow navigation between steps.
- The UI must be **minimal, intuitive, and user-friendly**.
- Users should **clearly understand each step’s purpose** and the benefits of providing their data.

### **8. Implementation Guidelines**
- Use **HeroUI components** for UI consistency.
- Implement **TailwindCSS** for additional styling if necessary.
- Maintain **semantic HTML** for accessibility.
- Keep **TypeScript code modular and maintainable**.

### **9. API Endpoints**
- **Basic Info:** `${API_BASE_URL}/stores/create/basic`
- **Location:** `${API_BASE_URL}/stores/create/location`
- **Category:** `${API_BASE_URL}/stores/create/category`
- **Working Hours:** `${API_BASE_URL}/stores/create/working_hour`
- **Logo Upload:** `${API_BASE_URL}/stores/create/logo`

## **Conclusion**
By following this guide, frontend developers can implement a **structured and user-friendly store creation flow** that simplifies onboarding for store owners. Future iterations can introduce **real-time validation and progress-saving mechanisms** to further improve the experience.

