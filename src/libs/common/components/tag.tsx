'use client';

import { Button } from '@heroui/react';
import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

/* TODO: <Tag> keeps its own selected state and also receives isSelected as a prop, but the two never stay in sync
 *  If the parent re‑renders with a different isSelected, the badge can show the wrong colour
 *  Treat it as controlled (selected = isSelected) or make it fully uncontrolled and drop the prop
 */
export const Tag = ({ label, onClick, isSelected = false }: Props) => {
  return (
    <Button
      size="sm"
      color={isSelected ? 'primary' : 'secondary'}
      variant="solid"
      onPress={onClick}
      className="rounded-full"
    >
      {label}
    </Button>
  );
};

export const TagGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-1">{children}</div>
);
