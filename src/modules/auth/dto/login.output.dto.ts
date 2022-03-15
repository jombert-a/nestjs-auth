import { ApiProperty } from '@nestjs/swagger';

export class loginOutputDto {
  @ApiProperty({ description: 'Token for bearer auth' })
  access_token: string;
}