'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button, Card, Spinner } from '@heroui/react';
import { ProductType } from '@/libs/products/types';
import { useMarketData } from '@/libs/market/market-api';

export default function MarketPage() {
  const { data: marketPageData, isLoading, error, refetch } = useMarketData();

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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 p-4 shadow">
        <div className="flex items-center justify-between">
          <Link href="/profile">
            <Image src="/images/profile-icon.png" alt="Profile" width={32} height={32} />
          </Link>
          <Input placeholder="Search products..." className="flex-grow mx-4" />
          <Link href="/orders">
            <Button variant="bordered">Orders</Button>
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section>
          <h2 className="text-lg font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {marketPageData?.featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="p-2">
                  <Image src={product.imageUrl} alt={product.name} width={150} height={150} />
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs">${product.price.toFixed(2)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {Object.values(ProductType).map((category) => (
          <section key={category}>
            <h2 className="text-lg font-bold mb-4">
              {category.charAt(0).toUpperCase() + category.slice(1)} Products
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {marketPageData?.categoryProducts[category]?.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="p-2">
                    <Image src={product.imageUrl} alt={product.name} width={150} height={150} />
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold">{product.name}</h3>
                      <p className="text-xs">${product.price.toFixed(2)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-bold mb-4">Top-Rated Stores</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {marketPageData?.topRatedStores.map((store) => (
              <Link key={store.id} href={`/store/${store.id}`} className="flex-shrink-0">
                <div className="w-24 p-2 border rounded text-center">
                  <Image
                    src={store.logoUrl ?? '/images/default-store-logo.png'}
                    alt={store.name}
                    width={50}
                    height={50}
                  />
                  <p className="text-xs font-semibold mt-2">{store.name}</p>
                  <p className="text-[10px]">⭐ {store.reputation}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Recent Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {marketPageData?.recentProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="p-2 relative">
                  <Image src={product.imageUrl} alt={product.name} width={150} height={150} />
                  {product.stock !== undefined && product.stock < 5 && (
                    <div className="absolute top-0 left-0 text-xs p-1 rounded-br">Low Stock</div>
                  )}
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs">${product.price.toFixed(2)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
