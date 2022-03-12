import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	Length,
	Matches,
} from 'class-validator';
import { Match } from '@/decorators/match.decorator';

export class CreateUserDto {
	@IsString()
	@Length(3, 32)
	username: string;

	@IsEmail()
	email: string;

	@IsPhoneNumber('RU')
	phone: string;

	@Length(8, 32)
	@IsString()
	@Matches(/^(?=.*\d)(?=.*?[a-zA-Z])(?=.*?[\W]).{8,}$/)
	password: string;

	@Match("password", {
        message: "Confirm password must be equal to password"
    })
	confirmPassword: string;
}
