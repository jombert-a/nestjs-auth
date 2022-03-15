import { passwordRegexp } from '@/regexps';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Matches } from 'class-validator';

export class loginInputDto {
	@ApiProperty({ description: 'Phone number (ru)' })
	@IsString()
	@IsPhoneNumber('RU')
	phone: string;

	@ApiProperty({ description: 'Password' })
	@IsString()
	@Matches(passwordRegexp)
	password: string;
}
