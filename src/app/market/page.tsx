/**
 * Market (Home) Page Component - MVP Version
 *
 * This file is responsible for implementing the **Market Page**, which serves as the **entry point**
 * for users when they open the app. Since the backend features like **personalized suggestions**
 * and **AI-driven recommendations** are not yet implemented, this MVP version will focus on
 * **basic product & store discovery** while maintaining an engaging shopping experience.
 *
 * ## Purpose
 * The **Market Page** should:
 * - Provide an **easy-to-navigate layout** for product & store discovery.
 * - **Encourage users** to explore products beyond their initial intent.
 * - **Prioritize engagement & conversion** by showcasing relevant products.
 * - **Guide users efficiently** to product pages for purchase decisions.
 *
 * ## Available Data
 * The backend currently provides **basic product and store data**:
 *
 * ```ts
 * export interface Product {
 *   id: number;
 *   name: string;
 *   price: number;
 *   description?: string;
 *   imageUrl: string;
 *   store: Store;
 *   productType: ProductType;
 *   attributes: ProductAttribute[];
 *   variants: ProductVariant[];
 *   reviews: Review[];
 *   downloadLink?: string;
 *   stock?: number;
 *   isApproved: boolean;
 *   createdAt: Date;
 *   updatedAt: Date;
 * }
 *
 * export interface Store {
 *   id: number;
 *   name: string;
 *   logoUrl?: string;
 *   description?: string;
 *   category: StoreCategory;
 *   owner: User;
 *   admins: User[];
 *   products: Product[];
 *   orders: Order[];
 *   contactNumber?: string;
 *   email?: string;
 *   country?: Country;
 *   state?: State;
 *   city?: City;
 *   socialMediaLinks?: { [platform: string]: string };
 *   reputation: number;
 *   workingHours?: Record<string, { open: string; close: string }>;
 *   createdAt: Date;
 *   updatedAt: Date;
 *   deletedAt: Date;
 * }
 * ```
 *
 * ## MVP Page Structure
 * Since **advanced recommendation features** are not available, the page will focus on
 * **static but effective product discovery mechanisms**:
 *
 * 1. **Search & Navigation Bar**
 *    - A **search input** for finding products by name.
 *    - Quick access to **order history & user profile**.
 *
 * 2. **Featured & Approved Products**
 *    - Since **AI-driven recommendations are not available**, display a section of:
 *      - **Approved & top-rated products** (to ensure quality control).
 *      - **Newly added products** (sorted by `createdAt`).
 *    - These products should be fetched using a **simple sorting strategy**.
 *
 * 3. **Category-Based Product Sections**
 *    - Group **products by product type** (`PHYSICAL`, `DIGITAL`, `SERVICE`).
 *    - Allow users to browse products **without needing advanced filtering**.
 *
 * 4. **Top-Rated Stores**
 *    - Show a **horizontal scrollable list** of **high-reputation stores**.
 *    - Display **store name, logo, and reputation score**.
 *    - Clicking on a store leads to a **store details page** listing all its products.
 *
 * 5. **Recent Products**
 *    - Show the **most recently added products** (sorted by `createdAt`).
 *    - If stock is available, display a **"Low Stock" alert**.
 *
 * 6. **Basic Call-to-Actions**
 *    - Encourage users to **browse categories**.
 *    - Highlight **limited-time deals** (if manually curated by admin).
 *    - Provide easy access to **popular stores**.
 *
 * ## UI/UX Guidelines
 * - Use **HeroUI** pre-built components for lists, product cards, and navigation.
 * - Implement **TailwindCSS** for styling (avoid raw CSS).
 * - Maintain a **scroll-friendly and mobile-optimized layout**.
 * - Keep the **design simple** but **engaging enough to encourage exploration**.
 *
 * ## MVP Limitations & Future Enhancements
 * - No **personalized recommendations** (future AI-based recommendations can replace static sections).
 * - No **dynamic trending products** (can be added once backend analytics are available).
 * - No **wishlist or user-preferred products** (potential feature for later versions).
 *
 * TODO: Implement a **basic yet engaging Market Page** that allows users to explore
 *       products & stores easily while maintaining a structured and intuitive shopping experience.
 */
