import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
	@ApiProperty({ description: 'Role name' })
	@Prop({ required: true, unique: true })
	name: string;

	@ApiProperty({ description: 'Role description' })
	@Prop({ required: true })
	description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
