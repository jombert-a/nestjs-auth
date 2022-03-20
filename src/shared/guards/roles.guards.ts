
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Model } from 'mongoose';
import { RoleType } from '../../modules/roles/roles.service';
import { Role, RoleDocument } from '../../modules/roles/schems/role.schemas';
import { UserDocument } from '../../modules/users/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		@InjectModel(Role.name) private rolesModel: Model<RoleDocument>,
		private reflector: Reflector,
		private jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
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

			const user: UserDocument = this.jwtService.verify(token);
			const roleId: MongooseSchema.Types.ObjectId = user.role;
			const role: RoleDocument = await this.rolesModel.findOne({
				id: roleId,
			});

			if (!role) return false;

            // @ts-ignore
			return (roles.map((el) => el.name).includes(role.name));
		} catch {
			throw new UnauthorizedException();
		}
	}
}
