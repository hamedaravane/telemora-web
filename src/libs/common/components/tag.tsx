'use client';

// import React, { useState } from 'react';
import React from 'react';
import { Button } from '@heroui/react';

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
  // const [selected, setSelected] = useState<boolean>(isSelected);
  return (
    // <Button
    //   size="sm"
    //   color={selected ? 'primary' : 'secondary'}
    //   variant="solid"
    //   onPress={() => {
    //     setSelected(!selected);
    //     if (onClick) {
    //       onClick();
    //     }
    //   }}
    //   className="rounded-full"
    // >
    //   {label}
    // </Button>
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
