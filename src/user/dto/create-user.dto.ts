import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required and cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either ADMIN, USER, or GUEST' })
  role?: UserRole;
}
