'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getProductsById } from '@/libs/products/products-api';
import { Product } from '@/libs/products/types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Button,
  Input,
  Textarea,
  Image,
} from '@heroui/react';
import { createReviews } from '@/libs/reviews/reviews-api';
import { UserContext } from '@/context/user-context';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getProductsById(id)
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load product details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError(null);
    try {
      await createReviews({ rating, comment });
      if (id) {
        const updatedProduct = await getProductsById(id);
        setProduct(updatedProduct);
      }
      setRating(0);
      setComment('');
    } catch (err) {
      console.error(err);
      setReviewError('Failed to submit review.');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <AppLayout>
      <main className="p-4">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading product details..." />
          </div>
        )}
        {error && <div className="text-danger">{error}</div>}
        {!loading && product && (
          <>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </CardHeader>
              <CardBody>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full max-h-64 object-cover mb-4"
                />
                <p className="text-lg font-semibold">${product.price}</p>
                <p>{product.description}</p>
                <div className="mt-4">
                  <h3 className="font-bold">Attributes:</h3>
                  {product.attributes.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {product.attributes.map((attr) => (
                        <li key={attr.id}>
                          {attr.attributeName}: {attr.attributeValue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No attributes</p>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-bold">Variants:</h3>
                  {product.variants.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {product.variants.map((variant) => (
                        <li key={variant.id}>
                          {variant.variantName}: {variant.variantValue}{' '}
                          {variant.additionalPrice ? `(+${variant.additionalPrice})` : ''}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No variants</p>
                  )}
                </div>
                {product.productType === 'digital' && product.downloadLink && (
                  <div className="mt-4">
                    <a
                      href={product.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Download Link
                    </a>
                  </div>
                )}
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

              {/* Only allow buyers to write a review */}
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
                  {reviewError && <div className="text-danger">{reviewError}</div>}
                  <Button type="submit" disabled={reviewLoading}>
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
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
