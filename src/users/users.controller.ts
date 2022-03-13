import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
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

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Delete()
	remove() {
		return this.usersService.remove();
	}
}
