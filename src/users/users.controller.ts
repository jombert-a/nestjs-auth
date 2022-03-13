import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Res() res, @Body() createUserDto: CreateUserDto) {
		await this.usersService.checkUser(createUserDto);
		return this.usersService.create(createUserDto);
	}

	@Get('all')
	findAll() {
		return this.usersService.findAll();
	}

	@Get()
	findOne(@Headers() headers: string) {
		return this.usersService.findOne(headers['bearer-token']);
	}

	@Delete()
	remove() {
		return this.usersService.remove();
	}
}
