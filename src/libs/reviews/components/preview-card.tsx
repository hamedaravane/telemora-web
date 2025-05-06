'use client';

import { Card, CardBody } from '@heroui/react';
import { User } from '@heroui/user';
import { formatDistanceToNow } from 'date-fns';

import StarRating from '@/libs/common/components/star-rating';
import { ReviewPreview } from '@/libs/reviews/types';

export default function ReviewPreviewCard({ content }: { content: ReviewPreview }) {
  return (
    <Card>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <User
              name={`${content.buyer.username}`}
              avatarProps={{ src: content.buyer.photo?.url }}
              description={formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
            />
          </div>
          <StarRating rating={content.rating} />
        </div>
        {content.comment && <p className="text-xs leading-relaxed">{content.comment}</p>}
      </CardBody>
    </Card>
  );
}
