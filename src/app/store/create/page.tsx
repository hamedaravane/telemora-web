'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Textarea } from '@heroui/react';
import { createStores } from '@/libs/stores/stores-api';
import { CreateStoreDto } from '@/libs/stores/types';
import { StoreCategory } from '@/types/common';

export default function CreateStore() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateStoreDto>({
    name: '',
    logoUrl: '',
    description: '',
    category: StoreCategory.OTHER, // default category
    contactNumber: '',
    email: '',
    address: '',
    socialMediaLinks: {},
    reputation: 0,
    workingHours: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: e.target.value as StoreCategory });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const createdStore = await createStores(formData);
      // Redirect to the newly created store's detail page
      router.push(`/store/${createdStore.id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create store.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Create a New Store</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Store Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="w-full p-2 border rounded"
            >
              {Object.values(StoreCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Creating...' : 'Create Store'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
