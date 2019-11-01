import { IsString } from "class-validator";

export class UserRegisterDto {

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly name: string;
}