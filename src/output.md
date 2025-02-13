# TSX Files

- File: ./app/page.tsx

```
'use client';
// import { useEffect, useState } from 'react';
// import WebApp from '@twa-dev/sdk';

import { Spinner } from '@heroui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();
  /*const [userData, setUserData] = useState<unknown | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
    }
  }, []);*/
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/market');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen bg-neutral-800">
      <div className="w-24 h-3/5 mx-auto flex justify-center items-end">
        <Spinner size="sm" color="white" label="Authenticating..." />
      </div>
    </div>
  );
}
```

- File: ./app/profile/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { User } from '@/libs/users/types';

export default function Profile() {
  const user: User = {} as User;
  const version = process.env.NEXT_PUBLIC_VERSION;
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen pb-16">
        <div className="p-4">
          <Card>
            <CardHeader>
              <Avatar src={'/default-profile.png'} size="lg" />
              <div className="ml-4">
                <h4>{user?.name}</h4>
                <span>@{user?.telegramId}</span>
              </div>
            </CardHeader>
            <CardBody>
              <div>Phone: {user?.phoneNumber || 'N/A'}</div>
              <div>Email: {user?.email || 'N/A'}</div>
              <div>Address: {'N/A'}</div>
              <div>Wallet Balance: 1 TON</div>
              <div>Role: {user?.role}</div>
            </CardBody>
            <CardFooter>
              <p>version: {version}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
```

- File: ./app/market/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';
import { Card, CardBody, CardHeader, Chip, Input, Image } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import { StoreCategory } from '@/types/common';

export default function Market() {
  const categories = Object.values(StoreCategory).sort((a, b) => a.localeCompare(b));
  const sampleArray = [1, 2, 3];
  return (
    <AppLayout>
      <main className="p-4">
        <Input placeholder="Search..." startContent={<SearchIcon color="gray" />}></Input>
        <div className="py-2 h-9 overflow-y-hidden overflow-x-scroll flex gap-x-1">
          {categories.map((category) => {
            return <Chip key={category}>{category}</Chip>;
          })}
        </div>
        <h3 className="my-2 font-bold text-large">Top Sellers</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <h3 className="my-2 font-bold text-large">For You</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <h3 className="my-2 font-bold text-large">Popular Stores</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
}
```

- File: ./app/layout.tsx

```
import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Telemart',
  description: 'Telegram mini app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Telemart</title>
        <Script
          src="https://telegram.org/js/telegram-web-app.js?56"
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- File: ./app/orders/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';

export default function Orders() {
  return (
    <AppLayout>
      <main>
        <div>welcome to orders</div>
      </main>
    </AppLayout>
  );
}
```

- File: ./app/store/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';
import { useEffect, useState } from 'react';
import { getAllStores } from '@/libs/stores/stores-api';
import { Button, Link } from '@heroui/react';
import { FaPlus } from 'react-icons/fa6';
import { CreateStoreDto } from '@/libs/stores/types';

export default function Store() {
  const [stores, setStores] = useState<CreateStoreDto[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllStores()
      .then((data) => {
        setStores(data);
      })
      .catch(() => {
        console.log('nothing');
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return (
    <AppLayout>
      <main className="px-4">
        {stores ? (
          stores.map((store) => {
            return <div key={store.name}>{store.name}</div>;
          })
        ) : (
          <pre>{JSON.stringify(stores)}</pre>
        )}
        <Button as={Link} fullWidth size="lg" href="./create">
          <FaPlus />
          <span>Create a new Store</span>
        </Button>
      </main>
    </AppLayout>
  );
}
```

- File: ./app/store/[slug]/page.tsx

```
export default function StorePage() {}
```

- File: ./app/store/create/page.tsx

```
import InnerLayout from '@/components/inner-layout';

export default function CreateStore() {
  return (
    <InnerLayout>
      <div>welcome to home</div>
    </InnerLayout>
  );
}
```

- File: ./components/navbar.tsx

```
import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

const CustomNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Telemart</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
```

- File: ./components/app-layout.tsx

```
'use client';

import { FC, ReactNode } from 'react';

import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

interface LayoutProps {
  children: ReactNode;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen relative">
      <CustomNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
```

- File: ./components/backward-navbar.tsx

```
import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@heroui/react';

const BackwardNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href=".." />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default BackwardNavbar;
```

- File: ./components/inner-layout.tsx

```
'use client';

import { FC, ReactNode } from 'react';

import BottomNavigation from './bottom-navigation';
import BackwardNavbar from '@/components/backward-navbar';

interface LayoutProps {
  children: ReactNode;
}

const InnerLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen relative">
      <BackwardNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default InnerLayout;
```

- File: ./components/bottom-navigation.tsx

```
import { FaHome, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';
import { Link } from '@heroui/link';

const BottomNavigation = () => {
  return (
    <div className="w-full flex justify-evenly text-secondary fixed bottom-0 left-0 right-0 z-50 py-4">
      <Link className="flex flex-col items-center" href="/market">
        <FaHome size={18} />
        <span className="text-xs">Market</span>
      </Link>
      <Link className="flex flex-col items-center" href="/store">
        <FaStore size={18} />
        <span className="text-xs">Store</span>
      </Link>
      <Link className="flex flex-col items-center" href="/orders">
        <FaShoppingCart size={18} />
        <span className="text-xs">Orders</span>
      </Link>
      <Link className="flex flex-col items-center" href="/profile">
        <FaUser size={18} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
```

- File: ./types/common.ts

```
export enum StoreCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing & Fashion',
  GROCERY = 'Grocery & Supermarket',
  HOME_APPLIANCES = 'Home Appliances',
  FURNITURE = 'Furniture & Home Decor',
  JEWELRY = 'Jewelry & Watches',
  SPORTS = 'Sports & Fitness',
  TOYS = 'Toys & Games',
  BEAUTY = 'Beauty & Personal Care',
  PHARMACY = 'Pharmacy & Medical Supplies',
  PET_SUPPLIES = 'Pet Supplies',
  BOOKS = 'Books & Stationery',
  HARDWARE = 'Hardware & Tools',
  AUTOMOTIVE = 'Automotive & Accessories',
  RESTAURANT = 'Restaurant & Fast Food',
  CAFE = 'Cafe & Coffee Shop',
  BAKERY = 'Bakery & Pastry Shop',
  FARMERS_MARKET = 'Farmers Market & Organic Produce',
  LIQUOR_STORE = 'Liquor & Beverage Store',
  SOFTWARE = 'Software & SaaS',
  FREELANCE = 'Freelance Services',
  GRAPHIC_DESIGN = 'Graphic & Web Design',
  MARKETING_AGENCY = 'Marketing & Advertising Agency',
  IT_SERVICES = 'IT & Technical Support',
  ONLINE_COURSES = 'Online Courses & Education',
  SUBSCRIPTIONS = 'Subscription-based Services',
  LEGAL = 'Legal Services',
  FINANCIAL_SERVICES = 'Financial & Accounting Services',
  CONSULTING = 'Business & Management Consulting',
  REAL_ESTATE = 'Real Estate Services',
  HEALTHCARE = 'Healthcare & Medical Consultation',
  FITNESS_TRAINING = 'Personal Training & Coaching',
  EVENT_PLANNING = 'Event Planning & Wedding Services',
  PHOTOGRAPHY = 'Photography & Videography',
  MUSIC_PRODUCTION = 'Music Production & DJ Services',
  ART_GALLERY = 'Art Gallery & Handmade Crafts',
  GAMING = 'Gaming & eSports',
  FILM_PRODUCTION = 'Film & Video Production',
  CLEANING = 'Cleaning Services',
  HOME_REPAIR = 'Home Repair & Maintenance',
  MOVING_SERVICE = 'Moving & Relocation Services',
  BEAUTY_SALON = 'Beauty Salon & Spa',
  TUTORING = 'Tutoring & Private Lessons',
  CHILDCARE = 'Childcare & Babysitting',
  CAR_RENTAL = 'Car Rental & Taxi Services',
  MECHANIC = 'Car Repair & Mechanic Services',
  TRAVEL_AGENCY = 'Travel Agency & Tour Guides',
  COURIER = 'Courier & Delivery Services',
  MANUFACTURING = 'Manufacturing & Production',
  WHOLESALE = 'Wholesale & Bulk Supply',
  AGRICULTURE = 'Agriculture & Farming Supplies',
  CONSTRUCTION = 'Construction & Engineering Services',
  OTHER = 'Other',
}

export enum ReportReason {
  SPAM = 'Spam',
  INAPPROPRIATE = 'Inappropriate Content',
  FAKE_REVIEW = 'Fake Review',
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

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  BOTH = 'both',
}
```

- File: ./libs/stores/types/index.ts

```
import { StoreCategory } from '@/types/common';
import { User } from '@/libs/users/types';
import { Order } from '@/libs/orders/types';
import { Product } from '@/libs/products/types';

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
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation: number;
  workingHours?: string;
}

export interface CreateStoreDto {
  name: string;
  logoUrl?: string;
  description?: string;
  category: StoreCategory;
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation?: number;
  workingHours?: string;
}

export interface UpdateStoreDto {
  name?: string;
  logoUrl?: string;
  description?: string;
  category?: StoreCategory;
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation?: number;
  workingHours?: string;
}
```

- File: ./libs/stores/stores-api.ts

```
import axios from 'axios';
import { CreateStoreDto, Store, UpdateStoreDto } from '@/libs/stores/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createStores = async (data: CreateStoreDto): Promise<Store> => {
  const response = await axios.post(`${API_BASE_URL}/stores`, data);

  return response.data;
};

export const getAllStores: () => Promise<CreateStoreDto[]> = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);

  return response.data;
};

export const getStoresById = async (id: string | number): Promise<Store> => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};

export const updateStores = async (id: string | number, data: UpdateStoreDto): Promise<Store> => {
  const response = await axios.patch(`${API_BASE_URL}/stores/${id}`, data);

  return response.data;
};

export const deleteStores = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};
```

- File: ./libs/reviews/reviews-api.ts

```
import axios from 'axios';
import { CreateReviewDto, Review } from '@/libs/reviews/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createReviews = async (data: CreateReviewDto): Promise<Review> => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, data);

  return response.data;
};

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${API_BASE_URL}/reviews`);

  return response.data;
};

export const getReviewsById = async (id: string | number): Promise<Review> => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);

  return response.data;
};

export const updateReviews = async (
  id: string | number,
  data: Omit<CreateReviewDto, 'images' | 'videos'>,
): Promise<Review> => {
  const response = await axios.patch(`${API_BASE_URL}/reviews/${id}`, data);

  return response.data;
};

export const deleteReviews = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/reviews/${id}`);

  return response.data;
};
```

- File: ./libs/reviews/types/index.ts

```
import { ReportReason } from '@/types/common';
import { Product } from '@/libs/products/types';
import { User } from '@/libs/users/types';

export interface Review {
  id: number;
  buyer: User;
  product: Product;
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
  replies: ReviewReply[];
  reports: ReviewReport[];
}

export interface ReviewReply {
  id: number;
  seller: User;
  replyText: string;
}

export interface ReviewReport {
  id: number;
  reportedBy: User;
  reason: ReportReason;
  comment?: string;
}

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}

export interface CreateReviewReplyDto {
  replyText: string;
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
}
```

- File: ./libs/orders/orders-api.ts

```
import axios from 'axios';
import { CreateOrderDto, Order, UpdateOrderDto } from '@/libs/orders/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createOrders = async (data: CreateOrderDto): Promise<Order> => {
  const response = await axios.post(`${API_BASE_URL}/orders`, data);

  return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders`);

  return response.data;
};

export const getOrdersById = async (id: string | number): Promise<Order> => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`);

  return response.data;
};

export const updateOrders = async (id: string | number, data: UpdateOrderDto): Promise<Order> => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, data);

  return response.data;
};

export const deleteOrders = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/orders/${id}`);

  return response.data;
};
```

- File: ./libs/orders/types/index.ts

```
import { OrderStatus } from '@/types/common';
import { User } from '@/libs/users/types';
import { Payment } from '@/libs/payments/types';
import { Store } from '@/libs/stores/types';
import { Product } from '@/libs/products/types';

export interface Order {
  id: number;
  buyer: User;
  store: Store;
  status: OrderStatus;
  items: OrderItem[];
  shipments: OrderShipment[];
  payments: Payment[];
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface OrderShipment {
  id: number;
  trackingNumber: string;
  courierService: string;
  deliveryEstimate: Date;
  shippedAt: Date;
}

export interface CreateOrderDto {
  buyerId: number;
  items: CreateOrderItemDto[];
  status?: OrderStatus;
  shippingAddress?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}

export interface CreateOrderShipmentDto {
  trackingNumber: string;
  courierService: string;
  deliveryEstimate?: string;
}

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}
```

- File: ./libs/products/types/index.ts

```
import { ProductType } from '@/types/common';
import { Store } from '@/libs/stores/types';
import { Review } from '@/libs/reviews/types';

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
}

export interface ProductAttribute {
  id: number;
  attributeName: string;
  attributeValue: string;
}

export interface ProductVariant {
  id: number;
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  productType?: ProductType;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}

export interface CreateProductVariantDto {
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}

export interface CreateProductAttributeDto {
  attributeName: string;
  attributeValue: string;
}

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
```

- File: ./libs/products/products-api.ts

```
import axios from 'axios';
import { CreateProductDto, Product, UpdateProductDto } from '@/libs/products/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createProducts = async (data: CreateProductDto): Promise<Product> => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);

  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);

  return response.data;
};

export const getProductsById = async (id: string | number): Promise<Product> => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);

  return response.data;
};

export const updateProducts = async (
  id: string | number,
  data: UpdateProductDto,
): Promise<Product> => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, data);

  return response.data;
};

export const deleteProducts = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

  return response.data;
};
```

- File: ./libs/payments/payments-api.ts

```
import axios from 'axios';
import { CreatePaymentDto, Payment, UpdatePaymentDto } from '@/libs/payments/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createPayments = async (data: CreatePaymentDto): Promise<Payment> => {
  const response = await axios.post(`${API_BASE_URL}/payments`, data);

  return response.data;
};

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${API_BASE_URL}/payments`);

  return response.data;
};

export const getPaymentsById = async (id: string | number): Promise<Payment> => {
  const response = await axios.get(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};

export const updatePayments = async (
  id: string | number,
  data: UpdatePaymentDto,
): Promise<Payment> => {
  const response = await axios.patch(`${API_BASE_URL}/payments/${id}`, data);

  return response.data;
};

export const deletePayments = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};
```

- File: ./libs/payments/types/index.ts

```
import { PaymentStatus } from '@/types/common';
import { User } from '@/libs/users/types';
import { Order } from '@/libs/orders/types';

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

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}

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

- File: ./libs/users/users-api.ts

```
import axios from 'axios';
import { CreateUserDto, UpdateUserDto, User } from '@/libs/users/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createUsers = async (data: CreateUserDto): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/users`, data);

  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users`);

  return response.data;
};

export const getUsersById = async (id: string | number): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);

  return response.data;
};

export const updateUsers = async (id: string | number, data: UpdateUserDto): Promise<User> => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, data);

  return response.data;
};

export const deleteUsers = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);

  return response.data;
};
```

- File: ./libs/users/types/index.ts

```
import { UserRole } from '@/types/common';
import { Order } from '@/libs/orders/types';
import { Payment } from '@/libs/payments/types';
import { Store } from '@/libs/stores/types';
import { Review } from '@/libs/reviews/types';

export interface User {
  id: number;
  telegramId: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  walletAddress?: string;
  orders: Order[];
  reviews: Review[];
  stores: Store[];
  payments: Payment[];
}

export interface CreateUserDto {
  telegramId: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
}
```
