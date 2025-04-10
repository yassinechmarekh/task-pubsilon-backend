import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}