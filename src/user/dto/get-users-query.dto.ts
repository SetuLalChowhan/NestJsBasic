export class GetUsersQueryDto {
  role?: 'ADMIN' | 'USER' | 'GUEST';
  search?: string;
}
