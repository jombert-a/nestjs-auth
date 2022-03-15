import { User, UserDocument } from '@/modules/users/schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginInputDto } from './dto/login.input.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginOutputDto } from './dto/login.output.dto';
import { UsersService } from '@/modules/users/users.service'
import { userOutputDto } from '@/modules/users/dto/user.output.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	async checkPassword(
		password: string,
		candidatePassword: string,
	): Promise<void> {
		const isMatch = await bcrypt.compare(password, candidatePassword);
		if (!isMatch) {
			throw new HttpException(
				{
					status: 0,
					error: 'UNAUTHORIZED',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	createToken(user: UserDocument): loginOutputDto {		
		return {
			access_token: this.jwtService.sign(user.toJSON())
		};
	}

	async auth(loginDto: loginInputDto): Promise<loginOutputDto> {
		const candidateToLogin: UserDocument = await this.usersService.findOneByPhone(loginDto.phone);
		await this.checkPassword(loginDto.password, candidateToLogin.password);
		return this.createToken(candidateToLogin);
	}
}
