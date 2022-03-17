import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userInputDto } from './dto/user.input.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userOutputDto } from './dto/user.output.dto';
import { RolesService, UserRole } from '../roles/roles.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
		private readonly rolesService: RolesService,
	) {}

	async checkUserExisting(createUserDto: userInputDto): Promise<void> {
		const emailCandidate = await this.userModel.findOne({
			email: createUserDto.email,
		});
		if (emailCandidate) {
			throw new HttpException(
				{
					status: 0,
					error: `Email "${createUserDto.email}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		const phoneCandidate = await this.userModel.findOne({
			phone: createUserDto.phone,
		});
		if (phoneCandidate) {
			throw new HttpException(
				{
					status: 1,
					error: `Email "${createUserDto.phone}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	parseToken(token: string): UserDocument {
		return this.jwtService.verify(token, {
			secret: process.env.JWT_SECRET,
		});
	}

	async hashPassword(passwordToHash: string): Promise<string> {
		return await bcrypt.hash(passwordToHash, 7);
	}

	async createUser(createUserDto: userInputDto): Promise<void> {
		const passwordHash: string = await this.hashPassword(
			createUserDto.password,
		);
		const basicRoleId = await this.rolesService.findRoleByName(UserRole);
		const createdUser = new this.userModel({
			...createUserDto,
			password: passwordHash,
			role: basicRoleId,
		});
		await createdUser.save();
	}

	async findOneByPhone(phone: string): Promise<UserDocument> {
		return await this.userModel.findOne({ phone });
	}

	async findOneByToken(token: string): Promise<userOutputDto> {
		if (!token) {
			throw new HttpException(
				{
					error: 0,
					message: 'UNAUTHORIZED',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		const userDocument = this.parseToken(token);
		return new userOutputDto(userDocument);
	}

	async findAll() {
		return this.userModel.find().exec();
	}

	async removeAllUsers() {
		return this.userModel.deleteMany().exec();
	}
}
