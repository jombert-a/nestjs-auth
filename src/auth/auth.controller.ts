import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginInputDto } from './dto/login.input.dto';
import { loginOutputDto } from './dto/login.output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login method' })
	@ApiResponse({ status: 200, type: loginOutputDto })
	@Post()
	login(@Body() loginDto: loginInputDto): Promise<loginOutputDto> {
		return this.authService.auth(loginDto);
	}
}
