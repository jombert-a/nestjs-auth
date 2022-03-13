import {
	IsEmail,
	IsString,
	Length,
	Matches,
} from 'class-validator';
import { Match } from '@/decorators/match.decorator';
import { passwordRegexp } from '@/regexps';

export class CreateUserDto {
	@IsString()
	@Length(3, 32)
	username: string;

	@IsEmail()
	email: string;

	@Length(8, 32)
	@IsString()
	@Matches(passwordRegexp)
	password: string;

	@Match('password', {
		message: 'Confirm password must be equal to password',
	})
	confirmPassword: string;
}
