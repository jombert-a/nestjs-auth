import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateIf,
} from 'class-validator';
import { Transform } from 'stream';

export class FloorApartmentInputDTO {
	@ApiProperty({ description: 'Country' })
	@IsString()
	@IsNotEmpty()
	country: string;

	@ApiProperty({ description: 'Region' })
	@IsString()
	@IsNotEmpty()
	region: string;

	@ApiProperty({ description: 'Address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'Total area of floor' })
	@IsNumber()
	@IsNotEmpty()
	totalArea: number;

	@ApiProperty({ description: 'Monthly  fee' })
	@IsNumber()
	@IsNotEmpty()
	monthlyFee: number;

	@ApiProperty({ description: 'Floor' })
	@IsNumber()
	@IsNotEmpty()
	floor: number;

	@ApiProperty({ description: 'Number of floors' })
	@IsNumber()
	@IsNotEmpty()
	@ValidateIf((o) => o.floor <= o.numberOfFloors)
	numberOfFloors: number;

	@ApiProperty({ description: 'Is animals friendly ' })
	@IsBoolean()
	@IsNotEmpty()
	isAnimalsFriendly: boolean;

	@ApiProperty({ description: 'Is children friendly ' })
	@IsBoolean()
	@IsNotEmpty()
	isChildrenFriendly: boolean;
}
