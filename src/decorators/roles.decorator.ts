import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/modules/roles/roles.service';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);