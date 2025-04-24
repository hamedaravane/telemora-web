'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Progress, Textarea } from '@heroui/react';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateStoreBasicInfo } from '@/libs/stores/stores-api';
import { CreateStoreBasicDto, createStoreBasicSchema } from '@/libs/stores/types';

export default function CreateStoreBasicInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoreBasicDto>({
    resolver: zodResolver(createStoreBasicSchema),
    defaultValues: {
      name: '',
      description: '',
      contactNumber: '',
      email: '',
      walletAddress: '',
    },
  });
  const { mutateAsync, isPending, error } = useCreateStoreBasicInfo();
  const router = useRouter();

  const onSubmit = async (formData: CreateStoreBasicDto) => {
    try {
      const result = await mutateAsync(formData);
      console.log('Store created:', result);
      router.push(`/stores/${result.id}/address`);
    } catch (err) {
      console.error('Create store error:', err);
      // show error toast or message
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 1 of 5" maxValue={5} aria-label="Step 1 of 5" size="sm" value={1} />
        <PageHeader
          title="Basic Information"
          subtitle="Your store's name and description will be visible to customers. Choose a name that reflects your brand."
        />
        <Input
          label="Store Name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Textarea
          label="Description"
          {...register('description')}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />
        <Input
          label="Contact Number"
          {...register('contactNumber')}
          isInvalid={!!errors.contactNumber}
          errorMessage={errors.contactNumber?.message}
        />
        <Input
          label="Email"
          {...register('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <div className="flex justify-between">
          <Button
            type="submit"
            color="primary"
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          />
          <Button
            type="button"
            color="default"
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          />
        </div>
      </Form>
    </AppLayout>
  );
}
