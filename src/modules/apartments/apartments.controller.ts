import { Body, Controller, Post } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { FloorApartmentInputDTO } from './dto/floor-apartment.input.dto';
import { FloorApartmentDocument } from './schemas/apartment-floor.schema';
import { ApartmentDocument } from './schemas/apartment.schema';

@Controller('apartments')
export class ApartmentsController {
	constructor(private readonly apartmentsService: ApartmentsService) {}

	@Post('floor')
  createFloor(@Body() floorDTO: FloorApartmentInputDTO): Promise<FloorApartmentDocument> {
    return this.apartmentsService.createFloorApartment(floorDTO)
  }
}
