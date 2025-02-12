# TSX Files

- File: ./libs/orders/orders-api.ts

```
import axios from 'axios';

import { CreateOrderDto } from '@/src/libs/orders/types/create-order.dto';
import { UpdateOrderDto } from '@/src/libs/orders/types/update-order.dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createOrders = async (data: CreateOrderDto) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, data);

  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);

  return response.data;
};

export const getOrdersById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`);

  return response.data;
};

export const updateOrders = async (id: string | number, data: UpdateOrderDto) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, data);

  return response.data;
};

export const deleteOrders = async (id: string | number) => {
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

- File: ./libs/payments/payments-api.ts

```
import axios from 'axios';

import { CreatePaymentDto } from '@/src/libs/payments/types/create-payment.dto';
import { UpdatePaymentDto } from '@/src/libs/payments/types/update-payment.dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createPayments = async (data: CreatePaymentDto) => {
  const response = await axios.post(`${API_BASE_URL}/payments`, data);

  return response.data;
};

export const getAllPayments = async () => {
  const response = await axios.get(`${API_BASE_URL}/payments`);

  return response.data;
};

export const getPaymentsById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};

export const updatePayments = async (id: string | number, data: UpdatePaymentDto) => {
  const response = await axios.patch(`${API_BASE_URL}/payments/${id}`, data);

  return response.data;
};

export const deletePayments = async (id: string | number) => {
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createProducts = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);

  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);

  return response.data;
};

export const getProductsById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);

  return response.data;
};

export const updateProducts = async (id: string | number, data: any) => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, data);

  return response.data;
};

export const deleteProducts = async (id: string | number) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

  return response.data;
};
```

- File: ./libs/users/users-api.ts

```
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createUsers = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/users`, data);

  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);

  return response.data;
};

export const getUsersById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);

  return response.data;
};

export const updateUsers = async (id: string | number, data: any) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, data);

  return response.data;
};

export const deleteUsers = async (id: string | number) => {
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

- File: ./libs/stores/stores-api.ts

```
import axios from 'axios';
import { CreateStoreDto } from '@/libs/stores/types/create-store.dto';
import { UpdateStoreDto } from '@/libs/stores/types/update-store.dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createStores = async (data: CreateStoreDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores`, data);

  return response.data;
};

export const getAllStores: () => Promise<CreateStoreDto[]> = async () => {
  const response = await axios.get(`${API_BASE_URL}/stores`);

  return response.data;
};

export const getStoresById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};

export const updateStores = async (id: string | number, data: UpdateStoreDto) => {
  const response = await axios.patch(`${API_BASE_URL}/stores/${id}`, data);

  return response.data;
};

export const deleteStores = async (id: string | number) => {
  const response = await axios.delete(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};
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

- File: ./libs/reviews/reviews-api.ts

```
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createReviews = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, data);

  return response.data;
};

export const getAllReviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/reviews`);

  return response.data;
};

export const getReviewsById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);

  return response.data;
};

export const updateReviews = async (id: string | number, data: any) => {
  const response = await axios.patch(`${API_BASE_URL}/reviews/${id}`, data);

  return response.data;
};

export const deleteReviews = async (id: string | number) => {
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

