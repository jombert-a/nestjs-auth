import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userInputDto } from './dto/user.input.dto';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { userOutputDto } from './dto/user.output.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201 })
	@Post()
	async createUser(@Body() userInputDto: userInputDto) {
		await this.usersService.checkUserExisting(userInputDto);
		await this.usersService.createUser(userInputDto);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('JWT')
	@ApiOperation({ summary: 'Get user info' })
	@ApiResponse({ status: 200, type: userOutputDto })
	@Get()
	findOne(@Req() req: any) {
		return new userOutputDto(req.user)
	}

	@Get('all')
	findAll() {
		return this.usersService.findAll();
	}

	@ApiOperation({ summary: 'Remove all users' })
	@Delete()
	remove() {
		return this.usersService.removeAllUsers();
	}
}
