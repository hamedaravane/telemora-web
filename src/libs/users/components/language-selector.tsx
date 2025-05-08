'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/page-header';
import { useUpdateLanguageMutation } from '@/libs/users/hooks';
import { UpdateLanguageFormData, updateLanguageSchema } from '@/libs/users/schemas';

const availableLanguages = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ch', label: 'Chinese' },
];

interface LanguageSelectorProps {
  telegramId: string;
  onClose?: () => void;
  defaultLanguage?: string;
}

export default function LanguageSelector({
  telegramId,
  onClose,
  defaultLanguage = 'en',
}: LanguageSelectorProps) {
  const { mutateAsync, isPending } = useUpdateLanguageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateLanguageFormData>({
    resolver: zodResolver(updateLanguageSchema),
    defaultValues: {
      languageCode: defaultLanguage,
    },
  });

  const onSubmit = async (formData: UpdateLanguageFormData) => {
    try {
      await mutateAsync({ telegramId, data: formData });
      toast.success('Language updated successfully');
      onClose?.();
    } catch {
      toast.error('Failed to update language');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader title="Select your preferred language" />

      <Controller
        name="languageCode"
        control={control}
        render={({ field }) => (
          <Select
            label="Language"
            selectedKeys={new Set([field.value])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (typeof selected === 'string') field.onChange(selected);
            }}
            isInvalid={!!errors.languageCode}
            errorMessage={errors.languageCode?.message}
          >
            {availableLanguages.map(({ value, label }) => (
              <SelectItem key={value}>{label}</SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="mt-6 flex justify-end gap-x-4">
        {onClose && (
          <Button type="button" variant="ghost" onPress={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" isDisabled={isPending} isLoading={isPending}>
          Save
        </Button>
      </div>
    </Form>
  );
}
