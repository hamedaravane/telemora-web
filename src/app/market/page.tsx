'use client';
import AppLayout from '@/components/app-layout';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/libs/products/products-api';
import { Card, CardBody, CardHeader, Chip, Input } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import { StoreCategory } from '@/types/common';
import Image from 'next/image';

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
                  <Image
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
