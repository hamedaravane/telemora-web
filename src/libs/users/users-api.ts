import axios from 'axios';
import { CreateUserDto, UpdateUserDto, User } from '@/libs/users/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createUsers = async (data: CreateUserDto) => {
  const response = await axios.post(`${API_BASE_URL}/users`, data);

  return response.data;
};

export const getAllUsers: () => Promise<User[]> = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);

  return response.data;
};

export const getUsersById: (id: string | number) => Promise<User> = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);

  return response.data;
};

export const updateUsers: (id: string | number, data: UpdateUserDto) => Promise<User> = async (
  id: string | number,
  data: UpdateUserDto,
) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, data);

  return response.data;
};

export const deleteUsers: (id: string | number) => void = async (id: string | number) => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);

  return response.data;
};
