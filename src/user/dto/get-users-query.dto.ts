import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from './create-user.dto.js';

export class GetUsersQueryDto {
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either ADMIN, USER, or GUEST' })
  role?: UserRole;

  @IsOptional()
  @IsString()
  search?: string;
}
