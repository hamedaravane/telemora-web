'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, Progress } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/libs/common/components/app-layout';
import { PageHeader } from '@/libs/common/components/page-header';
import { Tag } from '@/libs/common/components/tag';

import { CreateStoreTagsDto, storeTagsFormSchema } from '@/libs/stores/schemas';
import toast from 'react-hot-toast';
import { useSubmitStoreTagsMutation } from '@/libs/stores/hooks';

const TAG_SUGGESTIONS = [
  'Clothing',
  'Electronics',
  'Beauty',
  'Handmade',
  'Groceries',
  'Home Decor',
  'Fitness',
  'Books',
  'Toys',
  'Pet Supplies',
  'Jewelry',
  'Digital Art',
  'Services',
];

export default function CreateStoreTags() {
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateStoreTagsDto>({
    resolver: zodResolver(storeTagsFormSchema),
    defaultValues: {
      tags: [],
    },
  });

  const selectedTags = watch('tags');
  const [input, setInput] = useState('');
  const { mutateAsync, isPending } = useSubmitStoreTagsMutation(storeId);

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setValue('tags', updated, { shouldValidate: true });
  };

  const handleAddCustomTag = () => {
    const newTag = input.trim();
    if (newTag && !selectedTags.includes(newTag)) {
      setValue('tags', [...selectedTags, newTag], { shouldValidate: true });
    }
    setInput('');
  };

  const onSubmit = async (data: CreateStoreTagsDto) => {
    try {
      await mutateAsync(data);
      toast.success('Tags saved!');
      router.push(`/stores/create/${storeId}/working-hours`);
    } catch {
      toast.error('Failed to save tags');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 3 of 5" maxValue={5} value={3} size="sm" />

        <PageHeader
          title="Tags"
          subtitle="Choose tags that describe your store. They help customers discover you!"
        />

        {/* Suggestions */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2 text-gray-600">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {TAG_SUGGESTIONS.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="mt-6">
          <Input
            label="Add Custom Tag"
            placeholder="e.g. Vintage"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomTag();
              }
            }}
          />
          {input.trim() && (
            <Button size="sm" variant="ghost" className="mt-2" onPress={handleAddCustomTag}>
              Add &#34;{input.trim()}&#34;
            </Button>
          )}
          {errors.tags && <p className="text-sm text-red-500 mt-2">{errors.tags.message}</p>}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-x-2">
          <Button variant="flat" type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button
            variant="flat"
            type="button"
            onPress={() => router.push(`/stores/${storeId}/working-hours`)}
          >
            Skip
          </Button>
          <Button
            fullWidth
            type="submit"
            color="primary"
            isDisabled={selectedTags.length === 0 || isPending}
            isLoading={isPending}
          >
            Save & Next
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
