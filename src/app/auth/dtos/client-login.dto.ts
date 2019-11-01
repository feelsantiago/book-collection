import { IsString, IsNotEmpty } from "class-validator";

export class ClientLoginDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly merchant: string;
}