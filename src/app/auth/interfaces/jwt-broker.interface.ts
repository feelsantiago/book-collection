import { JwtPayload } from "./jwt-payload.interface";

export interface JwtBroker extends JwtPayload {
    merchant: string;
    type: string;
}