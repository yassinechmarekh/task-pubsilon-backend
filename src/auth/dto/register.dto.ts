import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";


export class RegisterDto {

    @Length(2, 50)
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}