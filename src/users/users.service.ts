import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async checkUser(createUserDto: CreateUserDto): Promise<void> {
		const codes: number[] = [];

		const usernameCandidate = await this.userModel.findOne({
			username: createUserDto.username,
		});
		if (usernameCandidate) {
			throw new HttpException(
				{
					status: 0,
					error: `Username "${createUserDto.username}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		const emailCandidate = await this.userModel.findOne({
			email: createUserDto.email,
		});
		if (emailCandidate) {
			throw new HttpException(
				{
					status: 1,
					error: `Email "${createUserDto.email}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const passwordHash = await bcrypt.hash(createUserDto.password, 7);
		const createdUser = new this.userModel({
			...createUserDto,
			password: passwordHash,
		});
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	findOne(token: string): Promise<UserDocument> {
		if (!token) {
			throw new HttpException({
				error: 0,
				message:'UNAUTHORIZED'
			}, HttpStatus.UNAUTHORIZED);
		}
		return this.jwtService.verify(token, {
			secret: process.env.JWT_SECRET,
		});
	}

	async remove() {
		return this.userModel.deleteMany().exec();
	}
}
