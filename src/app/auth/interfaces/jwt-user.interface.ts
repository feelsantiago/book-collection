import { JwtPayload } from "./jwt-payload.interface";

export interface JwtUser extends JwtPayload {
    name: string;
}