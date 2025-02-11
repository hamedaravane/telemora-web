import { UserRole } from "@/types/common";

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
}
