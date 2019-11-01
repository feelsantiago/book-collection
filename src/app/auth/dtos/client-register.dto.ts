import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class ClientRegisterDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly lang: string;
}