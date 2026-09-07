import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, UserRole } from './roles.decorator.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no @Roles(...) specified on the endpoint or controller, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const rawRole = (request.headers['x-user-role'] as string) || '';
    const userRole = rawRole.toUpperCase() as UserRole;

    if (!userRole) {
      throw new ForbiddenException(
        'Access denied: "x-user-role" header is missing.',
      );
    }

    const hasPermission = requiredRoles.includes(userRole);
    if (!hasPermission) {
      throw new ForbiddenException(
        `Access denied: Role "${userRole}" does not have permission. Required: [${requiredRoles.join(', ')}]`,
      );
    }

    return true;
  }
}
