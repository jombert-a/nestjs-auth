import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@ApiProperty({ example: 'i.ivanov@mail.ru', description: 'Email' })
	@Prop({ required: true, unique: true })
	email: string;

	@ApiProperty({ example: '+79991112332', description: 'Phone' })
	@Prop({ required: true, unique: true })
	phone: string;

	@ApiProperty({ example: 'Ivan', description: 'First name' })
	@Prop({ required: true })
	firstName: string;

	@ApiProperty({ example: 'Ivanov', description: 'Last name' })
	@Prop({ required: true })
	lastName: string;

	@ApiProperty({ example: 'hash(123qwe!@)', description: 'Password' })
	@Prop({ required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
