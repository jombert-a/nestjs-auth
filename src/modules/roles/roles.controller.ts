import { Body, Controller, Get, Post } from '@nestjs/common';
import { roleInputDto } from './dto/role.input.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() role: roleInputDto) {
    return this.rolesService.createRole(role)
  }

  @Get()
  getAll() {
    return this.rolesService.getAll()
  }
}
