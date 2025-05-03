'use client';

import { Card, CardBody } from '@heroui/react';
import { formatDistanceToNow } from 'date-fns';
import { ReviewPreview } from '@/libs/reviews/types';
import StarRating from '@/libs/common/components/star-rating';
import { User } from '@heroui/user';

export default function ReviewPreviewCard({ content }: { content: ReviewPreview }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
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
