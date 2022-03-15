import { UserDocument } from "../schemas/user.schema";

export class userOutputDto {
    constructor(userDocument: UserDocument) {
        this.email = userDocument.email;
        this.phone = userDocument.phone;
        this.firstName = userDocument.firstName;
        this.lastName = userDocument.lastName;
    }

    email: string;
    phone: string;
    firstName: string;
    lastName: string;
}