import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@ApiProperty({ example: '1', description: 'Username' })
	@Prop({ required: true, unique: true })
	username: string;

	@ApiProperty({ example: 'r.akhiiarov@gmail.com', description: 'Email' })
	@Prop({ required: true, unique: true })
	email: string;

	@ApiProperty({ example: '89177955755', description: 'Phone' })
	@Prop({ required: true, unique: true })
	phone: string;

	@ApiProperty({ example: '123qwe!@', description: 'Password' })
	@Prop({ required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
