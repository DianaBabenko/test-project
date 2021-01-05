import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../../roles/roles.guard';
import { User } from '../../users/entities/user.entity';

//Decorator composition to compose multiple decorators
//:TODO Change User to Role
export function Auth(...roles: User[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
