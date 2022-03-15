import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	Length,
	Matches,
} from 'class-validator';
import { Match } from '@/decorators/match.decorator';
import { passwordRegexp } from '@/regexps';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsPhoneNumber('RU')
	phone: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@Length(8, 32)
	@IsString()
	@Matches(passwordRegexp)
	password: string;

	@Match('password', {
		message: 'Confirm password must be equal to password',
	})
	confirmPassword: string;
}
