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
		const codesOfExistingUser = await this.usersService.checkUser(
			createUserDto,
		);
		if (codesOfExistingUser.length === 0) {
			return this.usersService.create(createUserDto);
		} else {
			return res.status(400).send({
				codes: codesOfExistingUser,
				message: 'User is already exist',
			});
		}
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete()
	remove() {
		return this.usersService.remove();
	}
}
