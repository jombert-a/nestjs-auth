import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from '../schemas/user.schema';

export class userOutputDto {
	constructor(userDocument: UserDocument) {
		this.email = userDocument.email;
		this.phone = userDocument.phone;
		this.firstName = userDocument.firstName;
		this.lastName = userDocument.lastName;
	}

	@ApiProperty({ description: 'Email' })
	email: string;

	@ApiProperty({ description: 'Phone number (ru)' })
	phone: string;

	@ApiProperty({ description: 'First name' })
	firstName: string;

	@ApiProperty({ description: 'Last name' })
	lastName: string;
}
