import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async checkUser(createUserDto: CreateUserDto): Promise<number[]> {
		const codes: number[] = [];

		const usernameCandidate = await this.userModel.findOne({
			username: createUserDto.username,
		});
		if (usernameCandidate) {
			codes.push(1);
		}

		const emailCandidate = await this.userModel.findOne({
			email: createUserDto.email,
		});
		if (emailCandidate) {
			codes.push(2);
		}

		const phoneCandidate = await this.userModel.findOne({
			phone: createUserDto.phone,
		});
		if (phoneCandidate) {
			codes.push(3);
		}

		return codes;
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	async remove() {
		return this.userModel.deleteMany().exec();
	}
}
