import { IsString } from "class-validator";

export class BrokerLoginDto {

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly merchant: string;
}