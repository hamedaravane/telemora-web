'use client';

import { Form, Input } from '@heroui/react';
import { FaPen } from 'react-icons/fa';

import { useUser } from '@/context/userContext';
import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';

export default function EditProfilePage() {
  const data = useUser();

  return (
    <AppLayout>
      <Form>
        <PageHeader title="Edit Profile" />

        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="First Name"
          defaultValue={data?.firstName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="Last Name"
          defaultValue={data?.lastName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="tel"
          type="tel"
          label="Phone Number"
          defaultValue={data?.phoneNumber}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="email"
          type="email"
          label="E-Mail"
          defaultValue={data?.email}
        ></Input>
      </Form>
    </AppLayout>
  );
}
