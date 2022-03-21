import { ApiProperty } from '@nestjs/swagger';

export class FloorApartmentInputDTO {
	@ApiProperty({ description: 'Country' })
	country: string;

	@ApiProperty({ description: 'Region' })
	region: string;

	@ApiProperty({ description: 'Address' })
	address: string;

	@ApiProperty({ description: 'Total area of floor' })
	totalArea: number;

	@ApiProperty({ description: 'Monthly  fee' })
	monthlyFee: number;

	@ApiProperty({ description: 'Floor' })
    floor: number;

	@ApiProperty({ description: 'Number of floors' })
	numberOfFloors: number;

    @ApiProperty({ description: 'Is animals friendly '})
    isAnimalsFriendly: boolean;

    @ApiProperty({ description: 'Is children friendly '})
    isChildrenFriendly: boolean;
}
