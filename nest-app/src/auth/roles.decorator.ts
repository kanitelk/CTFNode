import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../schema/User.schema';
import { RolesGuard } from './roles.guard';

export const ROLES_KEY = 'roles';

const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const Role = (...roles: UserRole[]) =>
  applyDecorators(UseGuards(RolesGuard), SetMetadata(ROLES_KEY, roles));
