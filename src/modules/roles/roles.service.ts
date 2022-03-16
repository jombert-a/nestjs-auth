import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { roleInputDto } from './dto/role.input.dto';
import { Role, RoleDocument } from './schems/role.schemas';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role.name) private userModel: Model<RoleDocument>,
	) {}

	async createRole(role: roleInputDto): Promise<RoleDocument> {
		return await new this.userModel(role).save();
	}

	async getAll() {
		return await this.userModel.deleteMany().exec();
	}
}
