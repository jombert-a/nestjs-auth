import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsPhoneNumber('RU')
	phone: string;

	@MinLength(8)
	@IsString()
	password: string;

	@MinLength(8)
	@IsString()
	confirmPassword: string;
}
