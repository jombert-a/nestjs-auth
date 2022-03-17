import { passwordRegexp } from '@/regexps';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Matches, IsNotEmpty } from 'class-validator';

export class loginInputDto {
	@ApiProperty({ description: 'Phone number (ru)' })
	@IsString()
	@IsPhoneNumber('RU')
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Password' })
	@IsString()
	@Matches(passwordRegexp)
	@IsNotEmpty()
	password: string;
}
