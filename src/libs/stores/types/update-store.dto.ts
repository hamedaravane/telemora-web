import { StoreCategory } from "@/types/common";

export interface UpdateStoreDto {
  name?: string;
  logoUrl?: string;
  description?: string;
  category?: StoreCategory;
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation?: number;
  workingHours?: string;
}
