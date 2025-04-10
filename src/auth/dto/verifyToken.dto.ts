import { IsNotEmpty, IsString } from "class-validator";


export class verifyTokenDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;
}