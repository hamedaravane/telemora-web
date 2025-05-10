import { Button, Input } from '@heroui/react';
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa6';

interface ProductVariantFieldsProps<TFieldValues extends Record<string, unknown>> {
  fields: FieldArrayWithId<TFieldValues, ArrayPath<TFieldValues>, 'id'>[];
  register: UseFormRegister<TFieldValues>;
  append: UseFieldArrayAppend<TFieldValues, ArrayPath<TFieldValues>>;
  remove: UseFieldArrayRemove;
  name: Path<TFieldValues>;
}

export function ProductVariantFields<TFieldValues extends Record<string, unknown>>({
  fields,
  register,
  append,
  remove,
  name,
}: ProductVariantFieldsProps<TFieldValues>) {
  return (
    <section>
      <h2 className="mb-2 font-semibold">Variants</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center gap-2">
          <Input
            {...register(`${name}.${index}.variantName` as Path<TFieldValues>)}
            placeholder="Name"
          />
          <Input
            {...register(`${name}.${index}.variantValue` as Path<TFieldValues>)}
            placeholder="Value"
          />
          <Input
            type="number"
            {...register(`${name}.${index}.additionalPrice` as Path<TFieldValues>, {
              valueAsNumber: true,
            })}
            placeholder="Extra Price"
          />
          <Button variant="light" size="sm" onPress={() => remove(index)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        startContent={<FaPlus />}
        onPress={() =>
          append({
            variantName: '',
            variantValue: '',
            additionalPrice: 0,
          } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>)
        }
      >
        Add Variant
      </Button>
    </section>
  );
}
