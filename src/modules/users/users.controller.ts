import { Controller, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { userOutputDto } from './dto/user.output.dto';
import { AdminRole } from '../roles/roles.service';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('JWT')
	@ApiOperation({ summary: 'Get user info' })
	@ApiResponse({ status: 200, type: userOutputDto })
	@Get()
	findOne(@Req() req: any) {
		return new userOutputDto(req.user);
	}

	@Roles(AdminRole)
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
