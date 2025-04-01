'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@heroui/react';

import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { useStoreCreation } from '@/context/store-creation-context';
import { Tag } from '@/components/shared/tag';

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
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();
  const [input, setInput] = useState('');

  const selectedTags = useMemo(() => storeData.tags ?? [], [storeData.tags]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      updateStoreData({ tags: selectedTags.filter((t) => t !== tag) });
    } else {
      updateStoreData({ tags: [...selectedTags, tag] });
    }
  };

  const handleAddCustomTag = () => {
    const newTag = input.trim();
    if (newTag && !selectedTags.includes(newTag)) {
      updateStoreData({ tags: [...selectedTags, newTag] });
    }
    setInput('');
  };

  const handleNext = () => router.push('/stores/create/working-hours');
  const handleBack = () => router.push('/stores/create/location');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 3 of 5</div>

      <PageHeader
        title="Tags"
        subtitle="Choose tags that best describe your store. These help customers find you in the marketplace."
      />

      {/* Tag Suggestions */}
      <section className="mt-4">
        <p className="text-sm font-medium mb-2 text-gray-600">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {TAG_SUGGESTIONS.map((tag) => (
            <Tag
              label={tag}
              key={tag}
              onClick={() => handleTagToggle(tag)}
            />
          ))}
        </div>
      </section>

      {/* Add Custom Tag */}
      <section className="mt-6">
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
            Add {input.trim()}
          </Button>
        )}
      </section>

      {/* Navigation */}
      <div className="mt-8 flex gap-x-2">
        <Button variant="flat" onPress={handleBack}>
          Back
        </Button>
        <Button variant="flat" onPress={handleNext}>
          Skip
        </Button>
        <Button fullWidth onPress={handleNext} isDisabled={selectedTags.length === 0}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}
