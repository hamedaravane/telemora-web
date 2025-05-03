'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Progress, Textarea } from '@heroui/react';
import AppLayout from '@/libs/common/components/app-layout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitStoreBasicInfoMutation } from '@/libs/stores/hooks';
import { CreateStoreBasicDto, storeBasicFormSchema } from '@/libs/stores/schemas';
import toast from 'react-hot-toast';
import { hapticFeedback } from '@telegram-apps/sdk';

export default function CreateStoreBasicInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoreBasicDto>({
    resolver: zodResolver(storeBasicFormSchema),
    defaultValues: {
      name: '',
      description: '',
      contactNumber: '',
      email: '',
      walletAddress: '',
    },
  });
  const { mutateAsync, isPending } = useSubmitStoreBasicInfoMutation();
  const router = useRouter();

  const onSubmit = async (formData: CreateStoreBasicDto) => {
    try {
      const result = await mutateAsync(formData);
      console.log('Store created:', result);
      toast.success('Store created successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${result.id}/location`);
    } catch (err) {
      console.error('Create store error:', err);
      toast.error('Failed to create store');
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
          >
            {isSubmitting || isPending ? 'Creating...' : 'Next'}
          </Button>

          <Button
            type="button"
            color="default"
            disabled={isSubmitting || isPending}
            onPress={() => router.back()}
          >
            Back
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
