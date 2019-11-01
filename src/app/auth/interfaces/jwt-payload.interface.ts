import { SystemRoles } from "../enum/system-roles.enum";

export interface JwtPayload {
    id: string;
    email: string;
    role: SystemRoles;
}