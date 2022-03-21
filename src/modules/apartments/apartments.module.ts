import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { FloorApartment, FloorApartmentSchema } from './schemas/apartment-floor.schema';
import { ApartmentPhoto, ApartmentPhotoSchema } from './schemas/apartment-photo.schema';

@Module({
	controllers: [ApartmentsController],
	providers: [ApartmentsService],
	imports: [
		MongooseModule.forFeature([
			{ name: Apartment.name, schema: ApartmentSchema },
			{ name: ApartmentPhoto.name, schema: ApartmentPhotoSchema },
			{ name: FloorApartment.name, schema: FloorApartmentSchema },
		]),
	],
})
export class ApartmentsModule {}
