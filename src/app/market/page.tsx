'use client';
import AppLayout from '@/components/app-layout';
import { Card, CardBody, CardHeader, Chip, Input, Image } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import { StoreCategory } from '@/types/common';

export default function Market() {
  const categories = Object.values(StoreCategory).sort((a, b) => a.localeCompare(b));
  const sampleArray = [1, 2, 3];
  return (
    <AppLayout>
      <main className="p-4">
        <Input placeholder="Search..." startContent={<SearchIcon color="gray" />}></Input>
        <div className="py-2 h-9 overflow-y-hidden overflow-x-scroll flex gap-x-1">
          {categories.map((category) => {
            return <Chip key={category}>{category}</Chip>;
          })}
        </div>
        <h3 className="my-2 font-bold text-large">Top Sellers</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <h3 className="my-2 font-bold text-large">For You</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <h3 className="my-2 font-bold text-large">Popular Stores</h3>
        <div className="flex gap-x-2">
          {sampleArray.map((_, index) => {
            return (
              <Card key={index} className="max-w-max">
                <CardHeader className="text-sm">Sample Name</CardHeader>
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="store"
                    width={180}
                    height={100}
                  ></Image>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
}
