import { JwtPayload } from "./jwt-payload.interface";

export interface JwtClient extends JwtPayload {
    tokens: Array<{
        merchant: string;
        token: string;
        creditCard: string;
    }>
}