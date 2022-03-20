import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	Length,
	Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { passwordRegexp } from '../../../regexps';
import { Match } from '../../../decorators/match.decorator';

export class userInputDto {
	@ApiProperty({ description: 'Email' })
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Phone number (ru)' })
	@IsPhoneNumber('RU')
	phone: string;

	@ApiProperty({ description: 'First name' })
	@IsString()
	firstName: string;

	@ApiProperty({ description: 'Last name' })
	@IsString()
	lastName: string;

	@ApiProperty({ description: 'Password' })
	@Length(8, 32)
	@IsString()
	@Matches(passwordRegexp)
	password: string;

	@ApiProperty({ description: 'Confirm password' })
	@Match('password', {
		message: 'Confirm password must be equal to password',
	})
	confirmPassword: string;
}
