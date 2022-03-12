import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString({
		context: {
			errorCode: 0,
		},
	})
	username: string;

	@IsEmail(
		{},
		{
			context: {
				errorCode: 1,
			},
		},
	)
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
