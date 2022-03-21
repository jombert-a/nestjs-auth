import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
@Schema()
export class Apartment {
	@ApiProperty({ description: 'Country' })
	@Prop({ required: true })
	country: string;

	@ApiProperty({ description: 'Region' })
	@Prop({ required: true })
	region: string;

	@ApiProperty({ description: 'City' })
	@Prop({ required: true })
	city: string;

	@ApiProperty({ description: 'Address' })
	@Prop({ required: true })
	address: string;

	@ApiProperty({ description: 'Total area' })
	@Prop({ required: true })
	totalArea: number;

	@ApiProperty({ description: 'Monthly fee' })
	@Prop({ required: true })
	monthlyFee: number;

	@ApiProperty({ description: 'Is animals freandly' })
	@Prop({ required: true, default: true })
	isAnimalsFreandly: boolean;

	@ApiProperty({ description: 'Is children freandly' })
	@Prop({ required: true, default: true })
	isChildrenFreandly: boolean;
}

export type ApartmentDocument = Apartment & Document;
export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
