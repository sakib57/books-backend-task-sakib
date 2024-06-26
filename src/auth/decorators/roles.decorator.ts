import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'common/constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
