import { passwordRegexp } from "@/regexps"
import { IsPhoneNumber, IsString, Matches } from "class-validator"

export class loginInputDto {
    @IsString()
    @IsPhoneNumber('RU')
    phone: string

    @IsString()
    @Matches(passwordRegexp)
    password: string
}