'use client';

import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import clsx from 'clsx';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
  colorClass?: string;
}

const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 'sm',
  showNumber = true,
  className = '',
  colorClass = 'text-orange-400',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  const starSizeClass = sizeMap[size];

  return (
    <div
      className={clsx('flex gap-1 my-1', starSizeClass, colorClass, className)}
      role="img"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} aria-hidden="true" />
      ))}
      {hasHalfStar && <FaStarHalfAlt aria-hidden="true" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} aria-hidden="true" />
      ))}
      {showNumber && <span className="ml-1 text-gray-600 text-xs">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
