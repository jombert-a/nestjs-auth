import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Res,
	Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User, UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		await this.usersService.checkUser(createUserDto);
		return await this.usersService.create(createUserDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get('all')
	findAll() {
		return this.usersService.findAll();
	}

	@ApiOperation({ summary: 'Get user info' })
	@Get()
	findOne(@Headers() headers: string) {
		return this.usersService.findOne(headers['bearer-token']);
	}

	@ApiOperation({ summary: 'Remove all users' })
	@Delete()
	remove() {
		return this.usersService.remove();
	}
}
