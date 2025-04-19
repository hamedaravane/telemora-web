import React from 'react';
import { OrderItemPreview } from '@/libs/orders/types';
import ProductPreviewCard from '@/components/products/preview-card';
import Price from '@/components/shared/price';

export default function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreview }) {
  return (
    <div className="border rounded-lg p-3 flex justify-between items-center">
      <ProductPreviewCard product={orderItem.product} />
      <div className="text-sm text-end">
        <p>Qty: {orderItem.quantity}</p>
        <p>
          Total: <Price amount={orderItem.totalPrice} />
        </p>
      </div>
    </div>
  );
}
