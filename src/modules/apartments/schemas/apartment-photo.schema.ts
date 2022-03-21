import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose'

export type ApartmentPhotoDocument = ApartmentPhoto & Document;

@Schema()
export class ApartmentPhoto {
    @ApiProperty({ description: 'Apartment' })
	@Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Apartment' })
	apartment: MongooseSchema.Types.ObjectId;

	@ApiProperty({ description: 'Photo`s url' })
	@Prop({ required: true })
	path: string;
}