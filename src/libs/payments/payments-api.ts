import axios from 'axios';

import { CreatePaymentDto } from '@/src/libs/payments/types/create-payment.dto';
import { UpdatePaymentDto } from '@/src/libs/payments/types/update-payment.dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createPayments = async (data: CreatePaymentDto) => {
  const response = await axios.post(`${API_BASE_URL}/payments`, data);

  return response.data;
};

export const getAllPayments = async () => {
  const response = await axios.get(`${API_BASE_URL}/payments`);

  return response.data;
};

export const getPaymentsById = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};

export const updatePayments = async (id: string | number, data: UpdatePaymentDto) => {
  const response = await axios.patch(`${API_BASE_URL}/payments/${id}`, data);

  return response.data;
};

export const deletePayments = async (id: string | number) => {
  const response = await axios.delete(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};
