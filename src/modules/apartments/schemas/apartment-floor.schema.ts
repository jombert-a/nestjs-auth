import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose'

export type FloorApartmentDocument = FloorApartment & Document;

@Schema()
export class FloorApartment {
    @ApiProperty({ description: 'Apartment`s photo' })
	@Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Apartment' })
	apartment: MongooseSchema.Types.ObjectId;


    @ApiProperty({ description: 'Floor' })
	@Prop({ required: true })
    floor: number;

    @ApiProperty({ description: 'Number of floors'})
    @Prop({ required: true })
    numberOfFloors: number;
}