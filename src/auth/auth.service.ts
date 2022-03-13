import { User, UserDocument } from '@/users/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginWithEmailDto } from './dto/login-with-email.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async authWithEmailAndPassword(loginDto: loginWithEmailDto) {
		const candidateToLogin: User = await this.userModel.findOne({
			email: loginDto.email,
		});
		const isMatch: boolean = await bcrypt.compare(
			loginDto.password,
			candidateToLogin.password,
		);
		return isMatch;
	}
}
