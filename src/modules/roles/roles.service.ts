import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { roleInputDto } from './dto/role.input.dto';
import { Role, RoleDocument } from './schems/role.schemas';

type AdminRoleType = {
	name: 'ADMIN'
}

export const AdminRole: AdminRoleType = {
	name: 'ADMIN'
}

type UserRoleType = {
	name: 'USER'
}

export const UserRole: UserRoleType = {
	name: 'USER'
}

export type RoleType = AdminRoleType | UserRoleType

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role.name) private roleModel: Model<RoleDocument>,
	) {}

	async createRole(role: roleInputDto): Promise<RoleDocument> {
		return await new this.roleModel(role).save();
	}

	async findRoleByName(roleType: RoleType): Promise<RoleDocument> {
		console.log(roleType)
		return await this.roleModel.findOne({ name: roleType.name })
	}

	async getAll() {
		return await this.roleModel.find().exec();
	}
}
