'use client';

import { useContext, useState } from 'react';
import AppLayout from '@/components/app-layout';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductsById } from '@/libs/products/products-api';
import { createReviews } from '@/libs/reviews/reviews-api';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  Textarea,
} from '@heroui/react';
import { UserContext } from '@/context/user-context';
import type { Product } from '@/libs/products/types';
import type { Review } from '@/libs/reviews/types';

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
