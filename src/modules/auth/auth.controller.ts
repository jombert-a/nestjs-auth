import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userInputDto } from '../users/dto/user.input.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { loginInputDto } from './dto/login.input.dto';
import { loginOutputDto } from './dto/login.output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Login by phone' })
	@ApiResponse({ status: 201, type: loginOutputDto })
	@Post('login')
	login(@Body() loginDto: loginInputDto): Promise<loginOutputDto> {
		return this.authService.auth(loginDto);
	}

	@ApiOperation({ summary: 'Registration'})
	@ApiResponse({ status: 201 })
	@Post('registration')
	registration(@Body() user: userInputDto): Promise<void> {
		return this.usersService.createUser(user)
	}

}
