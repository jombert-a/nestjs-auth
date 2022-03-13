import { User, UserDocument } from '@/users/schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginWithEmailDto } from './dto/login-with-email.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
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

	createJsonWebToken(user: UserDocument): string {
		return this.jwtService.sign({
			id: user.id,
			email: user.email,
			username: user.username,
		});
	}

	async authWithEmailAndPassword(loginDto: loginWithEmailDto) {
		const candidateToLogin: UserDocument = await this.userModel.findOne({
			email: loginDto.email,
		});
		await this.checkPassword(loginDto.password, candidateToLogin.password);
		return this.createJsonWebToken(candidateToLogin);
	}
}
