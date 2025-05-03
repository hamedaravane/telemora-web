'use client';

import { Select, SelectItem } from '@heroui/react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { ProductType } from '@/libs/products/types';

type ProductTypeSelectorProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
};

export function ProductTypeSelector<T extends FieldValues>({
  control,
  errors,
  name,
}: ProductTypeSelectorProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          label="Product Type"
          selectedKeys={new Set([field.value])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as ProductType;
            field.onChange(selected);
          }}
          isInvalid={!!errors?.[name]}
          errorMessage={(errors?.[name] as Error)?.message}
        >
          {Object.entries(ProductType).map(([key, value]) => (
            <SelectItem key={value} aria-label={key}>
              {value}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}
