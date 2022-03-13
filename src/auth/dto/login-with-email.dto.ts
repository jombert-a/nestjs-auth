import { passwordRegexp } from "@/regexps"
import { IsEmail, IsString, Matches } from "class-validator"

export class loginWithEmailDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @Matches(passwordRegexp)
    password: string
}