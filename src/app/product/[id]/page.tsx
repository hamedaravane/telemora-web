'use client';
/**
 * Product Details Page Component
 *
 * This file is responsible for implementing the **Product Details Page**, which is a
 * **critical page** for user conversion. Since our platform earns revenue through **sales commissions**,
 * this page must be optimized to **convince users to make a purchase** using **marketing principles**
 * and **UI/UX best practices**.
 *
 * ## Purpose
 * The goal of this page is to **persuade** users to purchase a product or service by:
 * - Providing **clear, compelling product information**.
 * - **Building trust** through store details, reviews, and transparency.
 * - Encouraging users to **add products to their order** and **proceed to checkout**.
 *
 * ## Product Data Structure
 * The server provides the following data:
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
 * ```
 *
 * ## Key Design Considerations
 * - **Compelling Visuals**
 *   - Display the **product image** prominently with zoom capabilities.
 *   - Ensure **price & key details** are instantly visible.
 *   - Provide a **clear CTA button ("Buy Now")** at the top and bottom of the page.
 *
 * - **Trust & Transparency**
 *   - Show **store information** to build credibility.
 *   - Display **user reviews** with a clear breakdown of ratings.
 *   - Highlight if the product is **approved** by the platform.
 *
 * - **Optimized Purchase Flow**
 *   - Users can **select variants** (if available).
 *   - If the **product is digital**, show the **download process** after purchase.
 *   - If the **product is physical**, show **shipping & stock information**.
 *   - Show an **"Add to Cart" button** that leads users to **checkout in the Orders Page**.
 *
 * - **Seamless Checkout Integration**
 *   - After adding a product to an order, **display a checkout button**.
 *   - Redirect users to the **Order Details Page** (`src/app/orders/[id]/page.tsx`) to finalize payment.
 *
 * ## UI/UX Guidelines
 * - Use **HeroUI** pre-built components for styling.
 * - Implement **TailwindCSS** for any custom elements.
 * - Ensure a **mobile-friendly layout** with clear call-to-actions (CTAs).
 * - Provide **real-time updates** on stock & availability.
 *
 * ## Additional Enhancements
 * - **Social Proof:** Display trending or frequently bought products.
 * - **Product Recommendations:** Show similar products to increase engagement.
 * - **Animated Transitions:** Use smooth interactions to enhance user experience.
 *
 * TODO: Implement a high-converting product details page that effectively leads users to checkout.
 */

import { Button, Spinner } from '@heroui/react';
import {useGetProductById} from "@/libs/products/products-api";
import {useParams} from "next/navigation";
import AppLayout from "@/components/app-layout";

export default function ProductDetailsPage() {
    const params = useParams();
    const { data: product, isLoading, error, refetch } = useGetProductById(+params.id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
                <p>Failed to load market data.</p>
                <Button onPress={() => refetch()}>Retry</Button>
            </div>
        );
    }

    if (product) {
        return (
            <AppLayout>
                <div className="flex flex-col gap-4 p-6">
                    <img src={product.imageUrl} alt={product.name}/>
                    <h3 className="text-3xl font-bold">{product.name}</h3>
                    <p className="">{product.description}</p>
                    <span>Price: {numberWithCommas2(product.price)}</span>
                    <span>Quantity: {product.stock}</span>
                    <Button>Add to Card</Button>
                </div>
            </AppLayout>
        )
    } else {
        return (
            <span>product not found</span>
        )
    }

}

// both of them are correct. which one of them is better?
function numberWithCommas(number:number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas2(number:number) {
    return new Intl.NumberFormat().format(number);
}


