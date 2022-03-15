import { Controller, Get, Post, Body, Delete, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.input.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200 })
	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		await this.usersService.checkUserExisting(createUserDto);
		await this.usersService.createUser(createUserDto);
	}

	@ApiOperation({ summary: 'Get user info' })
	@Get()
	findOne(@Headers() headers: string) {
		return this.usersService.findOneByToken(headers['bearer-token']);
	}

	@Get('all')
	findAll() {
		return this.usersService.findAll()
	}

	@ApiOperation({ summary: 'Remove all users' })
	@Delete()
	remove() {
		return this.usersService.removeAllUsers();
	}
}
