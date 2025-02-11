import { UserRole } from "@/types/common";

export interface CreateUserDto {
  telegramId: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
}
