import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginWithEmailDto } from './dto/login-with-email.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('email-standart')
	async loginWithEmail(@Body() loginDto: loginWithEmailDto) {
		return 'Login method';
	}
}
