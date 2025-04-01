'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';

interface Props {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Tag = ({ label, onClick, isSelected = false }: Props) => {
  const [selected, setSelected] = useState<boolean>(isSelected);
  return (
    <Button
      size="sm"
      color={selected ? 'primary' : 'secondary'}
      variant="solid"
      onPress={() => {
        setSelected(!selected);
        if (onClick) {
          onClick();
        }
      }}
      className="rounded-full"
    >
      {label}
    </Button>
  );
};

export const TagGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-1">{children}</div>
);
