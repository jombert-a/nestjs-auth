import { RoleType } from '@/modules/roles/roles.service';
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		try {
			const roles = this.reflector.get<RoleType[]>(
				'roles',
				context.getHandler(),
			);

			if (!roles) {
				return true;
			}

			const request = context.switchToHttp().getRequest();
			const authHeader = request.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];

			if (bearer !== 'Bearer' || !token) {
				return false;
			}

			// TODO: доделать авторизацию по роли
			// const user = this.jwtService.verify(token)

			return false;
		} catch {
			throw new UnauthorizedException();
		}
	}
}
