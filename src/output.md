# Files

- File: ./context/user-context.tsx

```
'use client';

import { createContext, useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { UserRole } from '@/types/common';
import type { User } from '@/libs/users/types';
import { useQuery } from '@tanstack/react-query';

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useQuery<User | null>({
    queryKey: ['telegramUser'],
    queryFn: async () => {
      if (WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
        const tgUser = WebApp.initDataUnsafe.user;
        return {
          telegramId: tgUser.id.toString(),
          firstName: tgUser.first_name,
          lastName: tgUser.last_name,
          telegramUsername: tgUser.username,
          telegramLanguageCode: tgUser.language_code,
          isTelegramPremium: tgUser.is_premium,
          telegramPhotoUrl: tgUser.photo_url,
          phoneNumber: undefined,
          email: undefined,
          role: UserRole.BUYER,
          walletAddress: undefined,
          orders: [],
          reviews: [],
          stores: [],
          payments: [],
        } as User;
      }
      return null;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
```

- File: ./app/page.tsx

```
'use client';

import { Spinner } from '@heroui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

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

import { useContext, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { UserContext } from '@/context/user-context';
import TonConnect from '@tonconnect/sdk';

const tonConnect = new TonConnect({
  manifestUrl: 'https://your-app.com/manifest.json',
});

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    setWalletConnecting(true);
    setError(null);
    try {
      tonConnect.connect({ jsBridgeKey: 'tonkeeper' });
      if (tonConnect.account && user) {
        setUser({ ...user, walletAddress: tonConnect.account.address });
      }
    } catch (err) {
      console.error('Wallet connection failed', err);
      setError('Wallet connection failed. Please try again.');
    } finally {
      setWalletConnecting(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-4">
        <Card>
          <CardHeader>
            <Avatar src={user?.telegramPhotoUrl || '/default-profile.png'} size="lg" />
            <div className="ml-4">
              <h4>{user?.firstName}</h4>
              <span>@{user?.telegramId}</span>
            </div>
          </CardHeader>
          <CardBody>
            <div>Phone: {user?.phoneNumber || 'N/A'}</div>
            <div>Email: {user?.email || 'N/A'}</div>
            <div>Role: {user?.role}</div>
            <div>
              Wallet Address:{' '}
              {user?.walletAddress ? (
                <span className="font-mono">{user.walletAddress}</span>
              ) : (
                'Not connected'
              )}
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
          </CardBody>
          <CardFooter>
            {!user?.walletAddress ? (
              <Button onPress={handleConnectWallet} disabled={walletConnecting}>
                {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            ) : (
              <div className="text-success">Wallet Connected</div>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
```

- File: ./app/product/create/page.tsx

```
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Textarea, Select } from '@heroui/react';
import { createProducts } from '@/libs/products/products-api';
import {
  CreateProductDto,
  CreateProductAttributeDto,
  CreateProductVariantDto,
} from '@/libs/products/types';
import { ProductType } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

const initialAttribute = { attributeName: '', attributeValue: '' };
const initialVariant = { variantName: '', variantValue: '', additionalPrice: 0 };

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    productType: ProductType.PHYSICAL,
    downloadLink: '',
    stock: 0,
    attributes: [],
    variants: [],
  });
  const [attributes, setAttributes] = useState<CreateProductAttributeDto[]>([]);
  const [variants, setVariants] = useState<CreateProductVariantDto[]>([]);

  const mutation = useMutation({
    mutationFn: createProducts,
    onSuccess: (data) => {
      router.push(`/product/${data.id}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { ...initialAttribute }]);
  };

  const handleAttributeChange = (
    index: number,
    field: keyof CreateProductAttributeDto,
    value: string,
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { ...initialVariant }]);
  };

  const handleVariantChange = (
    index: number,
    field: keyof CreateProductVariantDto,
    value: string | number,
  ) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: CreateProductDto = {
      ...formData,
      attributes,
      variants,
    };
    mutation.mutate(productData);
  };

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Create a New Product</h2>
        {mutation.isError && <div className="text-danger mb-4">Failed to create product.</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={String(formData.price)}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <Select
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
          >
            {Object.values(ProductType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {formData.productType === ProductType.DIGITAL && (
            <Input
              label="Download Link"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
            />
          )}
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={String(formData.stock)}
            onChange={handleChange}
          />

          {/* Attributes Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Attributes</h3>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Name"
                  value={attr.attributeName}
                  onChange={(e) => handleAttributeChange(index, 'attributeName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Value"
                  value={attr.attributeValue}
                  onChange={(e) => handleAttributeChange(index, 'attributeValue', e.target.value)}
                  required
                />
                <Button type="button" onPress={() => handleRemoveAttribute(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddAttribute}>
              Add Attribute
            </Button>
          </div>

          {/* Variants Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Variants</h3>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Variant Name"
                  value={variant.variantName}
                  onChange={(e) => handleVariantChange(index, 'variantName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Variant Value"
                  value={variant.variantValue}
                  onChange={(e) => handleVariantChange(index, 'variantValue', e.target.value)}
                  required
                />
                <Input
                  placeholder="Additional Price"
                  type="number"
                  value={String(variant.additionalPrice)}
                  onChange={(e) =>
                    handleVariantChange(index, 'additionalPrice', Number(e.target.value))
                  }
                />
                <Button type="button" onPress={() => handleRemoveVariant(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddVariant}>
              Add Variant
            </Button>
          </div>

          <Button type="submit" fullWidth disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating Product...' : 'Create Product'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
```

- File: ./app/product/[id]/page.tsx

```
'use client';

import { useState, useContext } from 'react';
import AppLayout from '@/components/app-layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsById } from '@/libs/products/products-api';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Button,
  Input,
  Textarea,
} from '@heroui/react';
import { createReviews } from '@/libs/reviews/reviews-api';
import { UserContext } from '@/context/user-context';
import type { Product } from '@/libs/products/types';
import type { Review } from '@/libs/reviews/types';
import Image from 'next/image';

export default function ProductDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '';

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductsById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const reviewMutation = useMutation<Review, Error, { rating: number; comment: string }>({
    mutationFn: (reviewData) => createReviews(reviewData),
    onSuccess: () => {
      refetch();
      setRating(0);
      setComment('');
    },
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviewMutation.mutate({ rating, comment });
  };

  return (
    <AppLayout>
      <main className="p-4">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading product details..." />
          </div>
        )}
        {error && <div className="text-danger">Failed to load product details.</div>}
        {!isLoading && product && (
          <>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </CardHeader>
              <CardBody>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={180}
                  height={100}
                  className="w-full max-h-64 object-cover mb-4"
                />
                <p className="text-lg font-semibold">${product.price}</p>
                <p>{product.description}</p>
              </CardBody>
              <CardFooter>
                <div>
                  <span className="font-bold">Store: </span>
                  <span>{product.store?.name}</span>
                </div>
              </CardFooter>
            </Card>

            {/* Reviews Section */}
            <section className="mt-8">
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <Card key={review.id} className="mb-4">
                    <CardHeader>
                      <div className="font-bold">{`${review.buyer.firstName} ${review.buyer.lastName}`}</div>
                      <div>Rating: {review.rating}/5</div>
                    </CardHeader>
                    <CardBody>
                      <p>{review.comment}</p>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}

              {user && user.role === 'buyer' && (
                <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                  <h4 className="font-bold">Write a Review</h4>
                  <Input
                    label="Rating (0-5)"
                    type="number"
                    min="0"
                    max="5"
                    value={String(rating)}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                  />
                  <Textarea
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={reviewMutation.isPending}>
                    {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              )}
            </section>
          </>
        )}
      </main>
    </AppLayout>
  );
}
```

- File: ./app/product/[id]/edit/page.tsx

```
'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Select, Spinner, Textarea } from '@heroui/react';
import { getProductsById, updateProducts } from '@/libs/products/products-api';
import {
  CreateProductAttributeDto,
  CreateProductVariantDto,
  Product,
  UpdateProductDto,
} from '@/libs/products/types';
import { ProductType } from '@/types/common';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductsById(id as string),
    enabled: !!id,
  });

  const [formData, setFormData] = useState<UpdateProductDto>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    productType: ProductType.PHYSICAL,
    downloadLink: '',
    stock: 0,
    attributes: [],
    variants: [],
  });
  const [attributes, setAttributes] = useState<CreateProductAttributeDto[]>([]);
  const [variants, setVariants] = useState<CreateProductVariantDto[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description || '',
        imageUrl: product.imageUrl,
        productType: product.productType,
        downloadLink: product.downloadLink || '',
        stock: product.stock || 0,
        attributes: [],
        variants: [],
      });
      setAttributes(
        product.attributes.map((attr) => ({
          attributeName: attr.attributeName,
          attributeValue: attr.attributeValue,
        })),
      );
      setVariants(
        product.variants.map((variant) => ({
          variantName: variant.variantName,
          variantValue: variant.variantValue,
          additionalPrice: variant.additionalPrice || 0,
        })),
      );
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: (data: UpdateProductDto) => updateProducts(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      router.push(`/product/${id}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { attributeName: '', attributeValue: '' }]);
  };

  const handleAttributeChange = (
    index: number,
    field: keyof CreateProductAttributeDto,
    value: string,
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { variantName: '', variantValue: '', additionalPrice: 0 }]);
  };

  const handleVariantChange = (
    index: number,
    field: keyof CreateProductVariantDto,
    value: string | number,
  ) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: UpdateProductDto = {
      ...formData,
      attributes,
      variants,
    };
    mutation.mutate(updatedData);
  };

  if (isLoading) {
    return (
      <InnerLayout>
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading product details..." />
        </div>
      </InnerLayout>
    );
  }

  if (error) {
    return (
      <InnerLayout>
        <div className="text-danger">Failed to load product details.</div>
      </InnerLayout>
    );
  }

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        {mutation.isError && <div className="text-danger mb-4">Failed to update product.</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={String(formData.price)}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <Select
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
          >
            {Object.values(ProductType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {formData.productType === ProductType.DIGITAL && (
            <Input
              label="Download Link"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
            />
          )}
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={String(formData.stock)}
            onChange={handleChange}
          />

          {/* Attributes Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Attributes</h3>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Name"
                  value={attr.attributeName}
                  onChange={(e) => handleAttributeChange(index, 'attributeName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Value"
                  value={attr.attributeValue}
                  onChange={(e) => handleAttributeChange(index, 'attributeValue', e.target.value)}
                  required
                />
                <Button type="button" onPress={() => handleRemoveAttribute(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddAttribute}>
              Add Attribute
            </Button>
          </div>

          {/* Variants Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Variants</h3>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Variant Name"
                  value={variant.variantName}
                  onChange={(e) => handleVariantChange(index, 'variantName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Variant Value"
                  value={variant.variantValue}
                  onChange={(e) => handleVariantChange(index, 'variantValue', e.target.value)}
                  required
                />
                <Input
                  placeholder="Additional Price"
                  type="number"
                  value={String(variant.additionalPrice)}
                  onChange={(e) =>
                    handleVariantChange(index, 'additionalPrice', Number(e.target.value))
                  }
                />
                <Button type="button" onPress={() => handleRemoveVariant(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddVariant}>
              Add Variant
            </Button>
          </div>

          <Button type="submit" fullWidth disabled={mutation.isPending}>
            {mutation.isPending ? 'Updating Product...' : 'Update Product'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
```

- File: ./app/market/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';
import { Card, CardBody, CardHeader, Chip, Input } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import { StoreCategory } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/libs/products/products-api';

export default function Market() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const categories = Object.values(StoreCategory).sort((a, b) => a.localeCompare(b));

  return (
    <AppLayout>
      <main className="p-4">
        <Input placeholder="Search..." startContent={<SearchIcon color="gray" />} />
        <div className="py-2 h-9 overflow-x-scroll flex gap-x-1">
          {categories.map((category) => (
            <Chip key={category}>{category}</Chip>
          ))}
        </div>
        <h3 className="my-2 font-bold text-large">Products</h3>
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-danger">Failed to load products.</p>}
        {!isLoading && products && (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="max-w-max">
                <CardHeader className="text-sm">{product.name}</CardHeader>
                <CardBody>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
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
import { UserProvider } from '@/context/user-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: 'Telemart',
  description: 'Telegram mini app',
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Telemart</title>
        <Script src="https://telegram.org/js/telegram-web-app.js?56" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

- File: ./app/orders/page.tsx

```
'use client';

import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/app-layout';
import { getAllOrders } from '@/libs/orders/orders-api';
import { Card, CardHeader, CardBody, CardFooter, Button, Spinner } from '@heroui/react';
import Link from 'next/link';

export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  return (
    <AppLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading orders..." />
          </div>
        )}
        {error && <div className="text-danger mb-4">Failed to load orders.</div>}
        {!isLoading && orders && orders.length === 0 && <div>No orders found.</div>}
        {!isLoading && orders && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <h3 className="text-lg font-bold">Order #{order.id}</h3>
                  <span className="text-sm">Status: {order.status}</span>
                </CardHeader>
                <CardBody>
                  <div>
                    Items: {order.items?.length || 0}{' '}
                    {order.items && order.items.length !== 1 ? 'items' : 'item'}
                  </div>
                </CardBody>
                <CardFooter>
                  <Button as={Link} href={`/orders/${order.id}`} size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
}
```

- File: ./app/orders/[id]/page.tsx

```
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById } from '@/libs/orders/orders-api';
import type { Order } from '@/libs/orders/types';
import { Card, CardHeader, CardBody, CardFooter, Spinner, Button } from '@heroui/react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => getOrdersById(id as string),
    enabled: !!id,
  });

  return (
    <AppLayout>
      <main className="p-4">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading order details..." />
          </div>
        )}
        {error && <div className="text-danger">Failed to load order details.</div>}
        {!isLoading && order && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Order #{order.id}</h2>
              <p className="text-sm">Status: {order.status}</p>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="border p-2 rounded mb-2">
                      <p>
                        <strong>Product:</strong> {item.product.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Total Price:</strong> ${item.totalPrice}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            </CardBody>
            <CardFooter>
              <Button as={Link} href="/orders" size="sm">
                Back to Orders
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </AppLayout>
  );
}
```

- File: ./app/orders/[id]/payment/page.tsx

```
'use client';

import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById, updateOrders } from '@/libs/orders/orders-api';
import { createPayments } from '@/libs/payments/payments-api';
import { Button, Spinner } from '@heroui/react';
import { OrderStatus, PaymentStatus } from '@/types/common';
import { UserContext } from '@/context/user-context';
import TonConnect from '@tonconnect/sdk';
import { CreatePaymentDto } from '@/libs/payments/types';
import { UpdateOrderDto } from '@/libs/orders/types';

const tonConnect = new TonConnect({
  manifestUrl: 'https://your-app.com/manifest.json',
});

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrdersById(id as string),
    enabled: !!id,
  });

  const totalPrice = order ? order.items.reduce((sum, item) => sum + item.totalPrice, 0) : 0;

  const paymentMutation = useMutation({
    mutationFn: (paymentData: CreatePaymentDto) => createPayments(paymentData),
  });

  const orderUpdateMutation = useMutation({
    mutationFn: (data: { id: number; update: UpdateOrderDto }) =>
      updateOrders(data.id, data.update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });

  const handlePayment = async () => {
    if (!user || !user.walletAddress) {
      router.push('/profile');
      return;
    }
    try {
      if (!tonConnect.wallet) {
        tonConnect.connect({ jsBridgeKey: 'tonkeeper' });
      }
      const validUntil = Math.floor(Date.now() / 1000) + 60;
      const recipient =
        order?.store?.owner.walletAddress || 'EQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

      const transactionRequest = {
        validUntil,
        from: user.walletAddress,
        messages: [
          {
            address: recipient,
            amount: totalPrice.toString(),
          },
        ],
      };

      const txResponse = await tonConnect.sendTransaction(transactionRequest, {
        onRequestSent: () => {
          console.log('Transaction request sent to wallet');
        },
      });
      const paymentData = {
        orderId: order?.id.toString(),
        amount: totalPrice.toString(),
        fromWalletAddress: user.walletAddress,
        toWalletAddress: recipient,
        transactionHash: txResponse.boc,
        gasFee: '0',
        commission: '0',
      };

      const paymentRecord = await paymentMutation.mutateAsync(paymentData);
      if (paymentRecord.status === PaymentStatus.COMPLETED) {
        await orderUpdateMutation.mutateAsync({
          id: order!.id,
          update: { status: OrderStatus.CONFIRMED },
        });
      }
      router.push('/orders');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading order details..." />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) {
    return (
      <AppLayout>
        <div className="text-danger">Order not found.</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order Payment</h2>
        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Total Price:</strong> {totalPrice} TON
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <Button onPress={handlePayment}>Pay with TON</Button>
      </main>
    </AppLayout>
  );
}
```

- File: ./app/store/page.tsx

```
'use client';
import AppLayout from '@/components/app-layout';
import { useQuery } from '@tanstack/react-query';
import { getAllStores } from '@/libs/stores/stores-api';
import { Button } from '@heroui/react';
import { Link } from '@heroui/link';
import { FaPlus } from 'react-icons/fa6';
import { CreateStoreDto } from '@/libs/stores/types';

export default function Store() {
  const {
    data: stores,
    isLoading,
    error,
  } = useQuery<CreateStoreDto[]>({
    queryKey: ['stores'],
    queryFn: getAllStores,
  });

  return (
    <AppLayout>
      <main className="px-4">
        {isLoading && <p>Loading stores...</p>}
        {error && <p className="text-danger">Failed to load stores.</p>}
        {!isLoading && stores && stores.length === 0 && (
          <div className="py-4">No stores available. Create one now!</div>
        )}
        {!isLoading && stores && stores.length > 0 && (
          <div className="space-y-4">
            {stores.map((store) => (
              <div key={store.name}>{store.name}</div>
            ))}
          </div>
        )}
        <Button as={Link} fullWidth size="lg" href="/store/create">
          <FaPlus />
          <span>Create a new Store</span>
        </Button>
      </main>
    </AppLayout>
  );
}
```

- File: ./app/store/create/page.tsx

```
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Textarea } from '@heroui/react';
import { createStores } from '@/libs/stores/stores-api';
import { CreateStoreDto } from '@/libs/stores/types';
import { StoreCategory } from '@/types/common';

export default function CreateStore() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateStoreDto>({
    name: '',
    logoUrl: '',
    description: '',
    category: StoreCategory.OTHER,
    contactNumber: '',
    email: '',
    address: '',
    socialMediaLinks: {},
    reputation: 0,
    workingHours: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: e.target.value as StoreCategory });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const createdStore = await createStores(formData);
      router.push(`/store/${createdStore.id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create store.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Create a New Store</h2>
        {error && <div className="text-danger mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Store Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="w-full p-2 border rounded"
            >
              {Object.values(StoreCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Creating...' : 'Create Store'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
```

- File: ./app/store/[id]/page.tsx

```
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { Spinner, Card, Button, CardFooter, CardBody, CardHeader, Image } from '@heroui/react';
import Link from 'next/link';
import { getStoresById } from '@/libs/stores/stores-api';
import { Store } from '@/libs/stores/types';

export default function StorePage() {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getStoresById(id)
        .then((data) => {
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load store details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <AppLayout>
      <main className="p-4">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading store..." />
          </div>
        )}
        {error && <div className="text-danger">{error}</div>}
        {!loading && store && (
          <Card>
            <CardHeader>
              {store.logoUrl ? (
                <Image src={store.logoUrl} alt={store.name} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300" />
              )}
              <div className="ml-4">
                <h3 className="text-xl font-bold">{store.name}</h3>
                <p className="text-sm">{store.category}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>{store.description || 'No description provided.'}</p>
              <p className="mt-2 text-sm">
                Contact: {store.contactNumber || 'N/A'} | Email: {store.email || 'N/A'}
              </p>
              <p className="mt-2 text-sm">Address: {store.address || 'N/A'}</p>
            </CardBody>
            <CardFooter>
              <Button as={Link} href={`/store/${id}/edit`} size="sm">
                Edit Store
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </AppLayout>
  );
}
```

- File: ./hooks/use-telegram.tsx

```
'use client';

import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export function useTelegram() {
  const [initData, setInitData] = useState<typeof WebApp.initData | null>(null);

  useEffect(() => {
    if (WebApp && WebApp.initData) {
      setInitData(WebApp.initData);
    }
  }, []);

  return initData;
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

export const getStoresById = async (id: string): Promise<Store> => {
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
  telegramId: string;
  firstName: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
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
  firstName: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  walletAddress?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
  walletAddress?: string;
}
```
