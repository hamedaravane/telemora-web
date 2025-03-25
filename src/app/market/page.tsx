'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, Input, Spinner } from '@heroui/react';
import { ProductPreview, ProductType } from '@/libs/products/types';
import { useMarketData } from '@/libs/market/market-api';
import Price from '@/components/price';
import AppLayout from '@/components/app-layout';

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
    <AppLayout>
      <main className="p-4 space-y-6">
        <section>
          <Input placeholder="Search products..." className="flex-grow" />
        </section>
        <section>
          <h2 className="text-lg font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {marketPageData?.featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-bold mb-4">Top-Rated Stores</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {marketPageData?.topRatedStores.map((store) => (
              <Link key={store.id} href={`/stores/${store.id}`} className="">
                <div className="w-24 p-2 rounded text-center">
                  <Image
                    src={store.logoUrl ?? '/images/default-stores-logo.png'}
                    alt={store.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-full h-12 aspect-square object-cover"
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
}

const ProductCard: React.FC<{ product: ProductPreview }> = ({
  product,
}: {
  product: ProductPreview;
}) => {
  return (
    <Link href={`/src/app/stores/%5Bid%5D/products/${product.id}`}>
      <Card className="p-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={150}
          height={150}
          className="mx-auto rounded-md h-36 aspect-square object-cover"
        />
        <div className="mt-2">
          <h3 className="text-sm font-semibold h-12 overflow-ellipsis">{product.name}</h3>
          <Price amount={product.price}></Price>
        </div>
      </Card>
    </Link>
  );
};
