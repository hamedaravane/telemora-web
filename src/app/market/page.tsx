'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button, Card, Spinner } from '@heroui/react';
import { ProductType } from '@/libs/products/types';
import { useMarketData } from '@/libs/market/market-api';
import Price from '@/components/price';

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
      <main className="p-4 space-y-6">
        <section>
          <Input placeholder="Search products..." className="flex-grow mx-4" />
        </section>
        <section>
          <h2 className="text-lg font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {marketPageData?.featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="p-2">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="mx-auto rounded-md"
                  />
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <Price amount={product.price}></Price>
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
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="mx-auto rounded-md"
                    />
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold">{product.name}</h3>
                      <Price amount={product.price}></Price>
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
              <Link key={store.id} href={`/store/${store.id}`} className="">
                <div className="w-24 p-2 rounded text-center">
                  <Image
                    src={store.logoUrl ?? '/images/default-store-logo.png'}
                    alt={store.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-full"
                  />
                  <p className="text-xs font-semibold mt-2">{store.name}</p>
                  <span className="text-[10px]">⭐ {store.reputation}</span>
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
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="mx-auto rounded-md"
                  />
                  {product.stock !== undefined && product.stock < 5 && (
                    <div className="absolute top-0 left-0 text-xs p-1 rounded-br">Low Stock</div>
                  )}
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <Price amount={product.price}></Price>
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
