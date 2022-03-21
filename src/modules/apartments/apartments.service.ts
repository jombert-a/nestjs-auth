import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FloorApartmentInputDTO } from './dto/floor-apartment.input.dto';
import { FloorApartment, FloorApartmentDocument } from './schemas/apartment-floor.schema';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>,
        @InjectModel(FloorApartment.name) private floorApartmentModel: Model<FloorApartmentDocument>
    ) {}

	async findMany(): Promise<ApartmentDocument[]> {
        const apartments: ApartmentDocument[] = await this.apartmentModel.find().exec();
		return apartments;
	}

    async createFloorApartment(floorDTO: FloorApartmentInputDTO): Promise<ApartmentDocument> {
        const apartment: ApartmentDocument = await new this.apartmentModel(floorDTO).save()
        return apartment;
    }
}
